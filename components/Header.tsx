import Link from 'next/link'
import ToggleTheme from './ToggleTheme'

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 border-accent-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex items-center space-x-3">
        <span className="text-5xl">🦁</span>
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight underline decoration-wavy underline-offset-8 decoration-red">
          Meout
        </h1>
      </Link>

      <div className="flex items-center space-x-3">
        <ToggleTheme />
        <a
          href="https://vercel.com/templates/next.js/twitter-bio"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            width="76"
            height="65"
            viewBox="0 0 76 65"
            fill="currentColor"
            className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>
        </a>
      </div>
    </header>
  )
}
