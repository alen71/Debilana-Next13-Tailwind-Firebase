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
import useUserLogIn from '../../../store/useUserLogIn'
import { userSignOut } from '../../../utils/firebase/firebase-utils'

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

  return (
    <nav
      className="flex items-center px-6 lg:px-4 xl:px-0  bg-white dark:bg-black min-h-[71px] w-full z-50 
      shadow-md dark:border-b-[1px] dark:shadow-none dark:border-gray sticky top-0"
    >
      <div className="xl:container w-full mx-auto flex justify-between items-center relative">
        <div className="px-3 xl:px-[18px] mx-auto lg:mx-0">
          <Logo />
        </div>

        <div className="hidden lg:block mx-auto">
          <SearchBar hide={hideSearch} />
        </div>

        <HamMenuBtn isMenuOpen={isMenuOpen} toggle={toggleMenu} />

        {/* <div className={`${isNavHidden} flex items-center lg:ml-auto`}>
          <div className="h-8 hidden lg:flex items-center justify-center divide-x divide-gray dark:divide-gray text-xs xl:text-sm mr-3 xl:mr-6">
            <NavItemWrapper
              active={
                !asPath.includes('/debilana') &&
                !asPath.includes('/gastarbajteri') &&
                !asPath.includes('/demokratija') &&
                !asPath.includes('/admin-page') &&
                !asPath.includes('/audio')
              }
            >
              <Link href="/">Sve</Link>
            </NavItemWrapper>
            <NavItemWrapper active={asPath.includes('/debilana')}>
              <Link href="/debilana/new">Debilana</Link>
            </NavItemWrapper>
            <NavItemWrapper active={asPath.includes('/gastarbajteri')}>
              <Link href="/gastarbajteri/new">Gastarbajteri</Link>
            </NavItemWrapper>
            <NavItemWrapper active={asPath.includes('/demokratija')}>
              <Link href="/demokratija/new">demokratija</Link>
            </NavItemWrapper>
            <NavItemWrapper active={asPath.includes('/audio')}>
              <Link href="/audio">audio</Link>
            </NavItemWrapper>
            <NavItemWrapper active={asPath.includes('/admin-page')}>
              <Link href="/admin-page">admin stranica</Link>
            </NavItemWrapper>
            {loggedIn && !asPath.includes('admin-page') && (
              <NavItemWrapper>
                <div onClick={() => userSignOut()}>log out</div>
              </NavItemWrapper>
            )}
          </div>

          </div> */}
        <div className="hidden lg:block">
          <SortTable hide={hideSortTable} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
