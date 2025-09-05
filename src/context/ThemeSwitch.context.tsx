import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext({
  setTheme: (theme: string) => '',
  theme: ''
})

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    if (window.matchMedia('(color-schema: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }

    localStorage?.getItem('theme') === 'dark'
      ? setTheme('dark')
      : setTheme('light')
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.removeItem('theme')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('theme')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  const value: any = { theme, setTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
