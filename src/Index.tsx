import { useParams, useHistory, Redirect } from "react-router-dom";
import { useContext } from 'preact/hooks';

import { IndexRouteParams } from "./IndexRouteParams";
import { Month } from './Month';
import { DateSelector } from './DateSelector';
import { PostsContext } from './PostsContext';

export function Index() {
  const params = useParams<IndexRouteParams>();

  const month = params.month;
  const year = params.year;

  const posts = useContext(PostsContext);

  if (posts[year] === undefined || posts[year][month] === undefined) {
    const history = useHistory();
    return (
      <Redirect to="/" />
    )
  }

  return (
    <>
      <DateSelector />
      <Month />
    </>
  )
}
