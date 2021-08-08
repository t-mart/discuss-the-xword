import mapValues from 'lodash/mapValues';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { createContext } from 'preact';

import postData from "./posts.json";
import { Post } from "./Post";

dayjs.extend(utc);


interface PostData {
  postsGroupedByYearMonth: Record<number, Record<number, Post[]>>
  latestYear: string
  latestMonth: string
}

const defaultContextValue = {
  postsGroupedByYearMonth: {},
  latestMonth: "",
  latestYear: ""
}

export const PostDataContext = createContext<PostData>(defaultContextValue);

export const buildContextValue: () => PostData = () => {
  // put the puzzle date in each object
  const posts = toPairs(postData).map(([key, value]) => ({ puzzleDate: dayjs.utc(key), ...value }));

  // group by year. e.g postsGroupedByYear[2020] = [...]
  const postsGroupedByYear = groupBy(posts, (value) => value.puzzleDate.year())

  // then by year, then month.  e.g postsGroupedByYear[2020][0] = [...]
  const postsGroupedByYearMonth = mapValues(postsGroupedByYear, (yearGroup) => groupBy(yearGroup, (value) => value.puzzleDate.month()))

  const latestYear = Object.keys(postsGroupedByYearMonth).reduce((prev, curr) => Number(prev) > Number(curr) ? prev : curr);
  const latestMonth = Object.keys(postsGroupedByYearMonth[latestYear]).reduce((prev, curr) => Number(prev) > Number(curr) ? prev : curr)

  return {
    postsGroupedByYearMonth,
    latestMonth,
    latestYear
  }
}