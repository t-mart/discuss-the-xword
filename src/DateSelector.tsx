import dayjs from 'dayjs';
import range from 'lodash/range';
import { useContext } from 'preact/hooks';
import { useHistory, useParams } from "react-router-dom";

import { IndexRouteParams } from './IndexRouteParams';
import { PostDataContext } from './PostDataContext'


export function DateSelector() {
  const params = useParams<IndexRouteParams>();

  const monthStr = params.month;  // one-based indexing, will be zero padded to two digits
  const monthNum = Number(monthStr) - 1 // zero-based indexing
  const yearStr = params.year;
  const yearNum = Number(yearStr);

  const { postsGroupedByYearMonth } = useContext(PostDataContext);

  const history = useHistory();

  const availableMonths = Object.keys(postsGroupedByYearMonth[yearNum]);
  const availableYears = Object.keys(postsGroupedByYearMonth);

  const referenceDate = dayjs().date(1) // set to the first, which every month has

  const monthOptions = range(12).map((monthIdx) => (
    <option
      value={String(monthIdx)}
      disabled={!availableMonths.includes(String(monthIdx))}
    >
      {referenceDate.month(monthIdx).format("MMMM")}
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
      const newYearStr = e.target!.value;
      const newYearNum = Number(newYearStr);

      let newMonthStr = monthStr;

      const monthIdxsInYear = Object.keys(postsGroupedByYearMonth[newYearNum]).map(Number);
      if (!monthIdxsInYear.includes(monthNum)) {
        newMonthStr = String(monthIdxsInYear[0] + 1).padStart(2, "0");
      }

      history.push(`/posts/${newYearStr}/${newMonthStr}`)
    };
  }

  const handleMonthChange = (e: Event) => {
    if (e.target instanceof HTMLSelectElement) {
      const newMonthStr = String(Number(e.target!.value) + 1).padStart(2, "0");
      history.push(`/posts/${yearStr}/${newMonthStr}`)
    }
  }

  return (
    <div class="flex justify-center space-x-4">
      <select class="form-select" value={String(monthNum)} onChange={handleMonthChange}>
        {monthOptions}
      </select>
      <select class="form-select" value={yearStr} onChange={handleYearChange}>
        {yearOptions}
      </select>
    </div>
  )
}
