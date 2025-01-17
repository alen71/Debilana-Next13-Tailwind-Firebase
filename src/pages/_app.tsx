import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../context/ThemeSwitch.context'
import Head from 'next/head'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase/firebase-utils'
import useUserLogIn from '../store/useUserLogIn'
import { useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }: AppProps) {
  const { setLoggedIn } = useUserLogIn()

  useEffect(() => {
    const authStateChange = async () => {
      onAuthStateChanged(auth, user => {
        if (user) {
          setLoggedIn(user)
        } else {
          setLoggedIn(null)
        }
      })
    }
    authStateChange()
  }, [setLoggedIn])

  return (
    <ThemeProvider>
      <Head>
        <title>Debilana</title>
        <meta
          name="description"
          content="Mesto gde možete da pogledate šta su demokratija, moderno školovanje i život gastarbajtera"
        />
      </Head>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_VERCEL_GTAG_ID || ''} />
    </ThemeProvider>
  )
}
