import classNames from 'classnames';

import { Post } from './Post';

interface Props {
  date?: number
  post?: Post
  isSpacer?: boolean
}

export function Day(props: Props) {
  const { post, isSpacer = false, date } = props;

  if (isSpacer) {
    return (
      <div />
    )
  }

  const additionalContentClassNames = classNames({
    'text-gray-300': post === undefined
  });

  let content = (
    <div class={`flex flex-col items-center ${additionalContentClassNames}`}>
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 stroke-current stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {/* when ready, add "hidden group-hover:block" classes */}
        <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hidden group-hover:block">
          {/* "chat" icon from https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -1.75 118 21.75"
            class="fill-current text-blue-500 h-16 w-16 transform scale-y-150"
          >
            <path d="M113.03 20H0L4.843 7.8 0-1.75h118"/>
          </svg>
          <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-bold uppercase text-white text-sm">visit</span>
        </div>
      </div>
      <span>{date}</span>
    </div>
  )

  // wrap with link if there is one one post object
  if (post) {
    content = (
      <a href={post.url} class="hover:underline group">
        {content}
      </a>
    )
  }

  return (
    <>
      {content}
    </>
  )
}
