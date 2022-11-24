import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { FaBeer } from 'react-icons/fa'

import Logo from '../../shared/Logo'
import NavItemWrapper from '../../shared/NavItemWrapper'
import ThemeSwitch from '../../shared/ThemeSwitch'
import WriteExperience from '../../shared/WriteExperience'

const Navbar = () => {
  return (
    <nav className="py-5 px-[2px] flex justify-between items-center ">
      <motion.div
        initial={{ x: -500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 50,
          duration: 0.8,
          delay: 0.5
        }}
      >
        <Logo />
      </motion.div>
      <motion.div
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 50,
          duration: 0.8,
          delay: 0.5
        }}
        className="flex items-center"
      >
        <div className="h-8 flex items-center justify-center divide-x ml-auto text-base mr-6 border-r-[1px]">
          <ThemeSwitch />
          <NavItemWrapper>Video</NavItemWrapper>
          <NavItemWrapper>Post</NavItemWrapper>
          <NavItemWrapper>Sve</NavItemWrapper>
        </div>
        <WriteExperience />
      </motion.div>
    </nav>
  )
}

export default Navbar
