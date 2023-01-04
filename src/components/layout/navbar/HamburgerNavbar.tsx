import Link from 'next/link'
import React from 'react'
import useUserLogIn from '../../../store/useUserLogIn'
import { userSignOut } from '../../../utils/firebase/firebase-utils'
import BackgroundBlur from '../../shared/BackgroundBlur'
import SortTable from '../SortTable'

type Props = {
  open: boolean
  toggle: () => void
}

const HamburgerNavbar = ({ open, toggle }: Props) => {
  const { loggedIn } = useUserLogIn()

  return (
    <>
      <BackgroundBlur open={open} toggle={toggle} />
      <div
        className={`${
          open ? 'translate-x-0' : 'translate-x-[-100%]'
        } w-full min-[450px]:w-[450px] transition-transform translate-duration-1000 min-h-screen z-40 fixed top-[71px] left-0  bg-main-gray dark:bg-gray-dark py-5 block lg:hidden`}
      >
        <div className="w-full flex flex-col items-center">
          {/* <div className="px-4 w-full flex justify-center">
            <SearchBar />
          </div> */}
          <div className="w-full border-y-[1px] divide-y-[1px] dark:text-white text-center uppercase font-semibold text-base mt-10 mb-4">
            <Link
              href="/"
              className="cursor-pointer block py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark"
              onClick={toggle}
            >
              new
            </Link>
            <Link
              href="/debilana/new"
              className="cursor-pointer block py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark"
              onClick={toggle}
            >
              debilana
            </Link>
            <Link
              href="/gastarbajter/new"
              className="cursor-pointer block py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark"
              onClick={toggle}
            >
              gastarbajter
            </Link>
            <Link
              href="/admin-page"
              className="cursor-pointer block py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark"
              onClick={toggle}
            >
              admin stranica
            </Link>
            {loggedIn && (
              <div
                className="cursor-pointer block py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark"
                onClick={() => {
                  toggle()
                  userSignOut()
                }}
              >
                Log out
              </div>
            )}
          </div>

          <SortTable toggle={toggle} />
        </div>
      </div>
    </>
  )
}

export default HamburgerNavbar
