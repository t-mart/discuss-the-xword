import dayjs from 'dayjs';
import range from 'lodash/range';
import { useContext } from 'preact/hooks';
import { useHistory, useParams } from "react-router-dom";

import { IndexRouteParams } from './IndexRouteParams';
import { PostsContext } from './PostsContext'


export function DateSelector() {
  const params = useParams<IndexRouteParams>();

  const month = params.month;
  const year = params.year;

  const posts = useContext(PostsContext);

  const history = useHistory();

  const availableYears = Object.keys(posts);
  const availableMonths = Object.keys(posts[year]);

  const referenceDate = dayjs().date(1) // set to the first, which every month has

  const monthOptions = range(1, 12 + 1).map((monthIdx) => (
    <option
      value={String(monthIdx)}
      disabled={!availableMonths.includes(String(monthIdx))}
    >
      {referenceDate.month(monthIdx - 1).format("MMMM")}
    </option>
  ));
  const yearOptions = availableYears.map((year) => (
    <option
      value={String(year)}
    >
      {year}
    </option>
  ));

  const handleYearChange = (e: Event) => {
    if (e.target instanceof HTMLSelectElement) {
      const newYear = e.target!.value;

      let newMonth = month;

      const monthsInNewYear = Object.keys(posts[newYear]);
      if (!monthsInNewYear.includes(newMonth)) {
        newMonth = monthsInNewYear[0];
      }

      history.push(`/posts/${newYear}/${newMonth}`)
    };
  }

  const handleMonthChange = (e: Event) => {
    if (e.target instanceof HTMLSelectElement) {
      const newMonth = e.target!.value
      history.push(`/posts/${year}/${newMonth}`)
    }
  }

  return (
    <div class="flex justify-center space-x-4">
      <select class="form-select" value={month} onChange={handleMonthChange}>
        {monthOptions}
      </select>
      <select class="form-select" value={year} onChange={handleYearChange}>
        {yearOptions}
      </select>
    </div>
  )
}
