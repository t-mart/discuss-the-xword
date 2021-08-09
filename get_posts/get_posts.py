import re
import sys
import json
from pathlib import Path
from typing import Optional

import praw
import arrow
import click
import glom

DISCUSSION_POST_TITLE_PATTERN = re.compile(r"(\d{2}/\d{2}/\d{4}) Discussion")
FIRST_KNOWN_DISCUSSION_POST_DATE = arrow.get(2020, 8, 21)


class PathParamType(click.ParamType):
    name = "integer"

    def convert(
        self,
        value: str,
        param: Optional[click.Parameter],
        ctx: Optional[click.Context],
    ) -> Path:
        return Path(value)


PATH_PARAM = PathParamType()


@click.command()
@click.option(
    "--dbpath",
    default="./posts.json",
    type=PATH_PARAM,
    help="The path to the JSON-encoded posts file.",
)
@click.option(
    "--skip-existing-url/--no-skip-existing-url",
    default=True,
    help=("Skip searching for discussion posts that already exist in the database."),
)
@click.option(
    "--username",
    required=True,
    envvar="REDDIT_USERNAME",
    help="Reddit username.",
)
@click.option(
    "--password",
    required=True,
    envvar="REDDIT_PASSWORD",
    help="Reddit password.",
)
@click.option(
    "--client-id",
    required=True,
    envvar="REDDIT_CLIENT_ID",
    help="Reddit application client id (found near title).",
)
@click.option(
    "--client-secret",
    required=True,
    envvar="REDDIT_CLIENT_SECRET",
    help="Reddit application client secret.",
)
def get_posts(
    dbpath: Path,
    skip_existing_url: bool,
    username: str,
    password: str,
    client_id: str,
    client_secret: str,
) -> None:
    """
    Search Reddit subreddit r/crossword for daily NYT crossword puzzle discussion post URLs and save
    those posts to a JSON-encoded database file.
    """
    reddit = praw.Reddit(
        user_agent="praw r/crossword discussion post scraper. Email tim@tim.direct for complaints.",
        username=username,
        password=password,
        client_id=client_id,
        client_secret=client_secret,
    )

    crossword_subreddit = reddit.subreddit("crossword")

    if dbpath.exists():
        print(f"Opening existing db file from {str(dbpath)}", file=sys.stderr)
        with dbpath.open("r") as dbfile:
            db: dict[str, dict[str, dict[str, str]]] = json.load(dbfile)
        latest_year = max(db.keys(), key=int)
        latest_month = max(db[latest_year], key=int)
        latest_day = max(db[latest_year][latest_month], key=int)
        start_date = arrow.get(
            int(latest_year), int(latest_month), int(latest_day)
        ).shift(days=+1)
    else:
        print(f"Creating new db file at {str(dbpath)}", file=sys.stderr)
        db = {}
        start_date = FIRST_KNOWN_DISCUSSION_POST_DATE

    # search up through tomorrow because NYT publishes tomorrow's crossword at 6P EST today
    tomorrow = arrow.utcnow().shift(days=+1).floor("day")

    records_added = 0

    for search_date in arrow.Arrow.range("day", start_date, tomorrow):
        ymd_path = f"{search_date.year}.{search_date.month}.{search_date.day}"

        if skip_existing_url and glom.glom(db, ymd_path, default=None) != None:
            continue

        search_query = f"NYT {search_date.format('MM/DD/YYYY')} Discussion"

        for post in crossword_subreddit.search(search_query, limit=100):
            if post.author.name != "AutoModerator":
                continue

            match = DISCUSSION_POST_TITLE_PATTERN.search(post.title)
            if match is None:
                continue

            post_date = arrow.get(match.group(1), "MM/DD/YYYY")
            if search_date != post_date:
                continue

            glom.assign(db, ymd_path, post.url, missing=dict)
            records_added += 1
            print(f'Found post for {search_date.format("YYYY-MM-DD")}', file=sys.stderr)
            break
        else:
            print(
                f'Could not find post for {search_date.format("YYYY-MM-DD")}',
                file=sys.stderr,
            )

    if records_added > 0:
        print(f"Writing db to {str(dbpath)}", file=sys.stderr)
        with dbpath.open("w") as dbfile:
            json.dump(db, dbfile, indent=2)

    print(records_added)


if __name__ == "__main__":
    get_posts()
