import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

import LogoDebilana from '../../assets/logo.svg'
import { ThemeContext } from '../../context/themeSwitch.context'

const Logo = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <Link
      href="/"
      className="flex items-center justify-center w-[11.25rem] h-[1.875rem] relative"
    >
      <LogoDebilana className="dark:text-primary-dark scale-125" />
    </Link>
  )
}

export default Logo
