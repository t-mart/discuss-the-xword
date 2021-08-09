# get_posts.py

Scrapes r/crosswords for discussion posts and saves them to a database file.

Unfortunately, this code is in a different language than the rest of the project. Javascript does
not have as good a library as Python's praw.

## Getting dependencies

In a virtual environment...

```shell
$ pip install pip-tools
$ pip-compile get_posts/requirements.in
$ pip-compile get_posts/requirements-dev.in # if needing to develop
$ pip-sync get_posts/requirements-dev.txt get_posts/requirements.txt
```

## Running

```shell
python get_posts.py
```