import { createContext, Dispatch, useEffect, useState } from 'react'

export const ThemeContext = createContext({
  setTheme: (theme: string) => '',
  theme: ''
})

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    console.log(window.matchMedia('(prefer-color-schema: dark)'))
    if (window.matchMedia('(color-schema: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const value: any = { theme, setTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
