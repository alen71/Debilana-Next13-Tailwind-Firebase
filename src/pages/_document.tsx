import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>Debilana</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="bg-gray-bg dark:bg-black dark:text-main-gray font-sans font-medium">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
