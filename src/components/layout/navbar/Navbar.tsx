import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'

import HamMenuBtn from './HamMenuBtn'
import Logo from '../../shared/Logo'
import NavItemWrapper from '../../shared/NavItemWrapper'
import SearchBar from '../../shared/SearchBar'
import WriteExperience from '../../shared/WriteExperience'
import SortTable from '../SortTable'

type Props = {
  hideSortTable?: boolean
  hideSearch?: boolean
  hideNav?: boolean
}

const Navbar = ({ hideSortTable, hideSearch, hideNav }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const idNavHidden = hideNav ? 'hidden' : ''

  return (
    <motion.nav
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center px-6 md:px-4 xl:px-0  bg-main-gray dark:bg-gray-dark h-[71px] w-[101%] fixed top-0 z-10 border-b-2"
    >
      <div className="xl:container w-full mx-auto flex justify-between items-center relative">
        <HamMenuBtn isMenuOpen={isMenuOpen} toggle={toggleMenu} />

        <div className="px-3 xl:px-[18px] mx-auto md:mx-0">
          <Logo />
        </div>

        <div className="hidden lg:block mx-auto">
          <SearchBar hide={hideSearch} />
        </div>

        <div className={`${idNavHidden} flex items-center ml-auto`}>
          <div className="h-8 hidden md:flex items-center justify-center divide-x divide-gray-text-hover  text-sm xl:text-base mr-3 xl:mr-6">
            <NavItemWrapper>
              <Link href="#">novo</Link>
            </NavItemWrapper>
            <NavItemWrapper>
              <Link href="#">u trendingu</Link>
            </NavItemWrapper>
            <NavItemWrapper>
              <Link href="#">najbolje</Link>
            </NavItemWrapper>
            <NavItemWrapper>
              <Link href="/postani-admin">postani admin</Link>
            </NavItemWrapper>
          </div>

          <WriteExperience />
        </div>
        <div className="hidden lg:block">
          <SortTable hide={hideSortTable} />
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
