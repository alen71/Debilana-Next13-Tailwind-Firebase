import React from 'react'
import HamburgerNavbar from './HamburgerNavbar'

type Props = {
  isMenuOpen: boolean
  toggle: () => void
}

const HamMenuBtn = ({ toggle, isMenuOpen }: Props) => {
  return (
    <>
      <div
        className="flex flex-col justify-between lg:hidden w-6 h-[14px] cursor-pointer"
        onClick={toggle}
      >
        <div
          className={`${
            isMenuOpen ? 'translate-y-[6px] rotate-45' : ''
          } transition-transform transform-duration-300 w-full h-[2px] bg-primary`}
        ></div>
        <div
          className={`${
            isMenuOpen ? 'scale-x-0' : ''
          } transition-transform transform-duration-300 w-full h-[2px] bg-primary`}
        ></div>
        <div
          className={`${
            isMenuOpen ? 'translate-y-[-6px] rotate-[-45deg]' : ''
          } transition-transform transform-duration-300 w-full h-[2px] bg-primary`}
        ></div>
      </div>
      <HamburgerNavbar open={isMenuOpen} toggle={toggle} />
    </>
  )
}

export default HamMenuBtn
