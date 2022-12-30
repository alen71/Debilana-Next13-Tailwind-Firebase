import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'

import HamMenuBtn from './HamMenuBtn'
import Logo from '../../shared/Logo'
import NavItemWrapper from '../../shared/NavItemWrapper'
import SearchBar from '../../shared/SearchBar'
import WriteExperience from '../../shared/WriteExperience'
import SortTable from '../SortTable'
import { useRouter } from 'next/router'

type Props = {
  hideSortTable?: boolean
  hideSearch?: boolean
  hideNav?: boolean
  isAnimate?: boolean
}

const Navbar = ({ hideSortTable, hideSearch, hideNav, isAnimate }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const idNavHidden = hideNav ? 'hidden' : ''

  const navAnimation = isAnimate
    ? {
        initial: { y: '-100%' },
        animate: { y: 0 },
        transition: { duration: 0.5 }
      }
    : ''

  const { asPath } = useRouter()

  return (
    <motion.nav
      {...navAnimation}
      className="flex items-center px-6 lg:px-4 xl:px-0  bg-main-gray dark:bg-gray-dark min-h-[71px] w-full z-10 border-b-2 sticky top-0"
    >
      <div className="xl:container w-full mx-auto flex justify-between items-center relative">
        <HamMenuBtn isMenuOpen={isMenuOpen} toggle={toggleMenu} />

        <div className="px-3 xl:px-[18px] mx-auto lg:mx-0">
          <Logo />
        </div>

        {/* <div className="hidden lg:block mx-auto">
          <SearchBar hide={hideSearch} />
        </div> */}

        <div className={`${idNavHidden} flex items-center lg:ml-auto`}>
          <div className="h-8 hidden lg:flex items-center justify-center divide-x divide-gray-text-hover  text-xs xl:text-sm mr-3 xl:mr-6">
            <NavItemWrapper
              active={
                !asPath.includes('/debilana') &&
                !asPath.includes('/gastarbajter') &&
                !asPath.includes('/admin-login')
              }
            >
              <Link href="/debilana">Sve</Link>
            </NavItemWrapper>
            <NavItemWrapper active={asPath.includes('/debilana')}>
              <Link href="/debilana/new">Debilana</Link>
            </NavItemWrapper>
            <NavItemWrapper active={asPath.includes('/gastarbajter')}>
              <Link href="/gastarbajter/new">Gastarbajter</Link>
            </NavItemWrapper>
            <NavItemWrapper active={asPath.includes('/admin-login')}>
              <Link href="/admin-login">login za admina</Link>
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
