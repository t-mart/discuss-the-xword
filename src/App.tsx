import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { About } from "./About";
import { Footer } from "./Footer";

import { Header } from './Header';
import { Index } from './Index';
import { buildContextValue, PostDataContext } from './PostDataContext';

export function App() {
  const postDataContextValue = buildContextValue()

  const latestMonthOneBased = String(Number(postDataContextValue.latestMonth) + 1).padStart(2, "0");

  return (
    <BrowserRouter>
      <div class="container max-w-screen-md px-4 space-y-8 my-8">
        <Header />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/posts/:year/:month">
            <PostDataContext.Provider value={postDataContextValue}>
              <Index />
            </PostDataContext.Provider>
          </Route>
          <Route path="/">
            <Redirect to={`/posts/${postDataContextValue.latestYear}/${latestMonthOneBased}`} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}