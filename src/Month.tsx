import dayjs from 'dayjs';
import range from 'lodash/range'
import { useContext } from 'preact/hooks';
import { useParams } from "react-router-dom";

import { DayHeadings } from './DayHeadings';
import { Day } from './Day';
import { DayOffsetter } from './DayOffsetter';
import { PostsContext } from './PostsContext'
import { IndexRouteParams } from './IndexRouteParams';

export function Month() {
  const params = useParams<IndexRouteParams>();

  const monthStr = params.month;  // one-based indexing, will be zero padded to two digits
  const monthNum = Number(monthStr) // zero-based indexing
  const yearStr = params.year;
  const yearNum = Number(yearStr);

  const postsForMonth = useContext(PostsContext)[yearNum][monthNum];

  const yearMonth = dayjs().year(yearNum).month(monthNum - 1);

  const firstOfMonth = yearMonth.date(1);

  const dayOffsetter = (
    <DayOffsetter span={firstOfMonth.day()} />
  );

  const days = range(1, yearMonth.daysInMonth() + 1).map((date) => (
    <Day url={postsForMonth[date]} date={date}/>
  ));

  return (
    <div class="grid grid-cols-7 gap-4 justify-items-center my-4">
      <DayHeadings />
      {dayOffsetter}
      {days}
    </div>
  )
}
