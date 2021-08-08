import dayjs from 'dayjs';
import range from 'lodash/range'
import keyBy from 'lodash/keyBy'
import { useContext } from 'preact/hooks';
import { useParams } from "react-router-dom";

import { DayHeadings } from './DayHeadings';
import { Day } from './Day';
import { DayOffsetter } from './DayOffsetter';
import { PostDataContext } from './PostDataContext'
import { IndexRouteParams } from './IndexRouteParams';

export function Month() {
  const params = useParams<IndexRouteParams>();

  const monthStr = params.month;  // one-based indexing, will be zero padded to two digits
  const monthNum = Number(monthStr) - 1 // zero-based indexing
  const yearStr = params.year;
  const yearNum = Number(yearStr);

  const { postsGroupedByYearMonth } = useContext(PostDataContext);
  const posts = postsGroupedByYearMonth[yearNum][monthNum];

  const postsByDay = keyBy(posts, (post) => post.puzzleDate.date())

  const yearMonth = dayjs.utc().year(yearNum).month(monthNum);

  const firstOfMonth = yearMonth.date(1);

  const dayOffsetter = (
    <DayOffsetter span={firstOfMonth.day()} />
  );

  const days = range(1, yearMonth.daysInMonth() + 1).map((date) => (
    <Day post={postsByDay[date]} date={date}/>
  ));

  return (
    <div class="grid grid-cols-7 gap-4 justify-items-center my-4">
      <DayHeadings />
      {dayOffsetter}
      {days}
    </div>
  )
}
