import { createContext } from 'preact';

import { Posts } from './Posts';

export const PostsContext = createContext<Posts>({});
