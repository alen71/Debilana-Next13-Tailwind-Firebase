import React, { useState } from 'react'
import { motion } from 'framer-motion'
import HamburgerNavbar from './HamburgerNavbar'

type Props = {
  isMenuOpen: boolean
  toggle: () => void
}

const HamMenuBtn = ({ toggle, isMenuOpen }: Props) => {
  return (
    <>
      <motion.div
        initial={{ x: -500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 50,
          duration: 0.8,
          delay: 0.5
        }}
        className="flex flex-col justify-between md:hidden w-6 h-[14px] cursor-pointer"
        onClick={toggle}
      >
        <div
          className={`${
            isMenuOpen ? 'translate-y-[6px] rotate-45' : ''
          } transition-transform transform-duration-300 w-full h-[2px] bg-black dark:bg-primary-light`}
        ></div>
        <div
          className={`${
            isMenuOpen ? 'scale-x-0' : ''
          } transition-transform transform-duration-300 w-full h-[2px] bg-black dark:bg-primary-light`}
        ></div>
        <div
          className={`${
            isMenuOpen ? 'translate-y-[-6px] rotate-[-45deg]' : ''
          } transition-transform transform-duration-300 w-full h-[2px] bg-black dark:bg-primary-light`}
        ></div>
      </motion.div>
      <HamburgerNavbar open={isMenuOpen} toggle={toggle} />
    </>
  )
}

export default HamMenuBtn
