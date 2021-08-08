import { Link } from 'react-router-dom'

import LogoPath from './logo.svg'

export function Header() {
  return (
    <header>
      <nav class="flex justify-between items-center">
        <Link to="/">
          <div class="flex space-x-2 text-xl font-bold hover:underline items-center">
            <img src={LogoPath} class="h-8 w-8" />
            <h1>Discuss The XWord</h1>
          </div>
        </Link>
        <ul class="flex text-xl space-x-2 font-semibold items-center">
          <li class="hover:underline">
            <Link to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header >
  )
}
