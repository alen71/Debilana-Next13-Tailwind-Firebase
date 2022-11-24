import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import LogoDebilana from '../../assets/logo.svg'

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center w-[11.25rem] h-[1.875rem] relative"
    >
      <LogoDebilana className="dark:text-primary-dark scale-150" />
    </Link>
  )
}

export default Logo
