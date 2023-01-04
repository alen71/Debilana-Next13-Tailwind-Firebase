import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useUserLogIn from '../../../store/useUserLogIn'
import { userSignOut } from '../../../utils/firebase/firebase-utils'
import BackgroundBlur from '../../shared/BackgroundBlur'
import SortTable from '../SortTable'

type Props = {
  open: boolean
  toggle: () => void
}

const hamburgerLinks = [
  {
    href: '/',
    name: 'New'
  },
  {
    href: 'debilana/new',
    name: 'Debilana'
  },
  {
    href: 'gastarbajter/new',
    name: 'Gastarbajter'
  },
  {
    href: '/admin-page',
    name: 'Admin stranica'
  }
]

const HamburgerNavbar = ({ open, toggle }: Props) => {
  const { asPath } = useRouter()
  const { loggedIn } = useUserLogIn()

  return (
    <>
      <BackgroundBlur open={open} toggle={toggle} />
      <div
        className={`${
          open ? 'translate-x-0' : 'translate-x-[-100%]'
        } w-full min-[450px]:w-[450px] transition-transform translate-duration-1000 min-h-screen z-40 fixed top-[71px] left-0  bg-white dark:bg-black py-5 block lg:hidden shadow-container-shadow dark:shadow-none dark:border-r-[1px] dark:border-gray`}
      >
        <div className="w-full flex flex-col items-center">
          {/* <div className="px-4 w-full flex justify-center">
            <SearchBar />
          </div> */}
          <div className="w-full border-y-[1px] divide-y-[1px] divide-gray dark:text-white text-center uppercase text-base mt-10 mb-4">
            {hamburgerLinks.map(({ href, name }) => (
              <Link
                key={name}
                href={href}
                className={`${
                  asPath.includes(`/${name.toLowerCase()}`)
                    ? 'text-primary dark:text-primary'
                    : 'text-black dark:text-white'
                } cursor-pointer block py-2  hover:text-primary hover:dark:text-primary`}
                onClick={toggle}
              >
                {name}
              </Link>
            ))}
            {loggedIn && (
              <div
                className="cursor-pointer block py-2 hover:bg-gray-bg dark:hover:bg-gray-dark"
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
