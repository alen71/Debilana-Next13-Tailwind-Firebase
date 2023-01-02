import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../context/ThemeSwitch.context'
import Head from 'next/head'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase/firebase-utils'
import useUserLogIn from '../store/useUserLogIn'
import { useEffect } from 'react'

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
  }, [])

  return (
    <ThemeProvider>
      <Head>
        <title>Debilana</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
