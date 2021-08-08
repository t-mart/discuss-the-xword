import dayjs from 'dayjs';

export interface Post {
  title: string
  author: string
  url: string
  created: string
  puzzleDate: dayjs.Dayjs;
}
