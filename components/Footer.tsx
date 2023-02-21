export default function Footer() {
  return (
    <footer className="bg-accent-1 sm:bg-background text-accent-6 text-center h-auto sm:h-20 w-full sm:py-2 py-4 border-t border-accent-2 mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:space-y-0">
      <div>
        Powered by{' '}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="text-foreground font-bold hover:underline transition-colors underline-offset-4 decoration-wavy duration-500 ease-in-out decoration-transparent hover:decoration-red"
        >
          OpenAI{' '}
        </a>
        and{' '}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer"
          className="text-foreground font-bold hover:underline transition-colors underline-offset-4 decoration-wavy duration-500 ease-in-out decoration-transparent hover:decoration-red"
        >
          Vercel Edge Functions
        </a>
        . Forked from{' '}
        <a
          href="https://github.com/Nutlope/twitterbio"
          target="_blank"
          rel="noreferrer"
          className="text-foreground font-bold hover:underline transition-colors underline-offset-4 decoration-wavy duration-500 ease-in-out decoration-transparent hover:decoration-red"
        >
          Nutlope/twitterbio
        </a>
        .
      </div>
      <div className="flex space-x-4 items-center">
        <a
          href="https://twitter.com/tonykeiser"
          className="text-accent-4 hover:text-accent-8 duration-500 ease-in-out transition-colors"
          aria-label="Tony Keiser on Twitter"
          target="_blank"
        >
          <svg aria-hidden="true" className="h-6 w-6" fill="currentColor">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
          </svg>
        </a>
        <a
          href="https://www.buymeacoffee.com/keisto"
          className="text-accent-4 hover:text-accent-8 duration-500 ease-in-out transition-colors"
          aria-label="Buy the developer a coffee"
          target="_blank"
        >
          <svg
            viewBox="0 0 448 512"
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
          >
            <path d="M55.2 17.7C60.6 6.8 71.7 0 83.8 0H364.2c12.1 0 23.2 6.8 28.6 17.7L416 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96S14.3 64 32 64L55.2 17.7zM74.7 453.8L48 160H400L373.3 453.8c-3 33-30.6 58.2-63.7 58.2H138.4c-33.1 0-60.7-25.2-63.7-58.2zM323.8 290.9c1.7-18.7-13.1-34.9-31.9-34.9H156c-18.8 0-33.6 16.2-31.9 34.9l8.7 96c1.5 16.5 15.3 29.1 31.9 29.1H283.2c16.6 0 30.4-12.6 31.9-29.1l8.7-96z" />
          </svg>
        </a>
        <a
          href="https://github.com/keisto/meout"
          className="text-accent-4 hover:text-accent-8 duration-500 ease-in-out transition-colors"
          aria-label="Meout on GitHub"
          target="_blank"
        >
          <svg aria-hidden="true" className="h-6 w-6" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
