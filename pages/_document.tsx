import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#333333" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="Find your next outing in seconds."
          />
          <meta property="og:site_name" content="meout.app" />
          <meta
            property="og:description"
            content="Find your next outing in seconds."
          />
          <meta property="og:title" content="Meout - Meal Outing Finder" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Meout - Meal Outing Finder" />
          <meta
            name="twitter:description"
            content="Find your next outing in seconds."
          />
          <meta property="og:image" content="https://meout.app/og-image.png" />
          <meta name="twitter:image" content="https://meout.app/og-image.png" />
        </Head>
        <body className="m-0 font-sans antialiased bg-background text-foreground">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
