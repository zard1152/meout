import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { checkTheme } from '../utils'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    checkTheme()
  }, [])

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
