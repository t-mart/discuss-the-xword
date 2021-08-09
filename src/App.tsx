import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import maxBy from "lodash/maxBy";

import { About } from "./About";
import { Footer } from "./Footer";
import { Header } from './Header';
import { Index } from './Index';
import { PostsContext } from './PostsContext';
import { Posts } from './Posts';

import postData from "./data/posts.json";

export function App() {

  const posts: Posts = postData;

  const latestYear = maxBy(Object.keys(posts), Number)!
  const latestMonth = maxBy(Object.keys(posts[latestYear]), Number)!

  return (
    <BrowserRouter>
      <div class="container max-w-screen-md px-4 space-y-8 my-8">
        <Header />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/posts/:year/:month">
            <PostsContext.Provider value={posts}>
              <Index />
            </PostsContext.Provider>
          </Route>
          <Route path="/">
            <Redirect to={`/posts/${latestYear}/${latestMonth}`} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}