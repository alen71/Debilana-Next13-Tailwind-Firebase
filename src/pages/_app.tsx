import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../context/ThemeSwitch.context'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      {/* <Head>
        <title>Debilana</title>
      </Head> */}
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
