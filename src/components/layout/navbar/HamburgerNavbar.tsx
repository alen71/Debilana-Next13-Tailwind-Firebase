import Link from 'next/link'
import React from 'react'
import SearchBar from '../../shared/SearchBar'
import SortTable from '../SortTable'

type Props = {
  open: boolean
  toggle: () => void
}

const HamburgerNavbar = ({ open, toggle }: Props) => {
  return (
    <>
      <div
        className={`${
          open ? 'block' : 'hidden'
        } fixed top-[71px] left-0 w-screen h-screen z-20 backdrop-blur-md`}
        onClick={toggle}
      ></div>
      <div
        className={`${
          open ? 'translate-x-0' : 'translate-x-[-100%]'
        } w-full min-[450px]:w-[450px] transition-transform translate-duration-1000 min-h-screen z-40 fixed top-[71px] left-0  bg-main-gray dark:bg-black py-5`}
      >
        <div className="w-full flex flex-col items-center">
          <div className="px-4 w-full flex justify-center">
            <SearchBar />
          </div>
          <div className="w-full border-y-[1px] divide-y-[1px] dark:text-white text-center uppercase font-semibold text-base mt-10 mb-4">
            <Link
              href="/postani-admin"
              className="cursor-pointer block py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark"
            >
              Postani admin
            </Link>
            <Link
              href="#"
              className="cursor-pointer block py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark"
            >
              U trendingu
            </Link>
            <Link
              href="#"
              className="cursor-pointer block py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark"
            >
              novo
            </Link>
            <Link
              href="#"
              className="cursor-pointer block py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark"
            >
              Najbolje
            </Link>
          </div>

          <SortTable />
        </div>
      </div>
    </>
  )
}

export default HamburgerNavbar