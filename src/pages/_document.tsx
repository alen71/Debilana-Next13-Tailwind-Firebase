import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="bg-white dark:bg-black dark:text-gray font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
