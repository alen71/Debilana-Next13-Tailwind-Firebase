import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import LogoDebilana from '../../assets/logo.svg'

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-start w-fit h-[1.875rem] relative"
    >
      <LogoDebilana className="dark:text-primary-dark" />
    </Link>
  )
}

export default Logo
