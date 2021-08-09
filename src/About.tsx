export function About() {
  return (
    <div class="max-w-prose space-y-4 mx-auto">
      <p>
        Each day on the <a
          class="underline hover:text-gray-500"
          target="_blank"
          href="https://www.reddit.com/r/crossword/"
        >r/crossword/</a> subreddit,
        there's a new post that discusses <a
          class="underline hover:text-gray-500"
          target="_blank"
          href="https://www.nytimes.com/crosswords/game/daily"
        >today's New York Times crossword puzzle</a>. These posts provide a place for fellow
        solvers to praise (or criticize!) the puzzle, ask others for help, vote on puzzle difficulty, etc.
        They're a great way to conclude your solve and get feedback.
      </p>

      <p>
        If you're like me and don't (nor can't) do the NYT crossword puzzle every day, you'll go back
        days, week, months, and even years into the past to get to puzzles that match your skill level. And
        you'll still want to wind down with those discussion posts on the subreddit.
      </p>

      <p>
        Trouble is, <b>it's difficult to find those posts on Reddit when they're
        in the past</b>. Reddit sorts posts by time or popularity and doesn't let you easily navigate
        to old posts, so you may be scrolling down for quite a while. Searching can help, but you have to
        properly format search query to the date format, and even then, you're not guaranteed to find it
        because these posts haven't been made for that long.
      </p>

      <p>
        So, because that sucks, I created this website to let you easily find the discussion post
        for a particular date's puzzle (or realize that it doesn't exist).
      </p>

      <p>
        You can view the source code for this website at <a
        class="underline hover:text-gray-500"
        href="https://github.com/t-mart/discuss-the-xword"
        target="_blank">https://github.com/t-mart/discuss-the-xword</a>
      </p>
    </div>
  )
}
