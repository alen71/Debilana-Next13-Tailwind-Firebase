import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { FaBeer } from 'react-icons/fa'

import Logo from '../../shared/Logo'
import ThemeSwitch from '../../shared/ThemeSwitch'
import WriteExperience from '../../shared/WriteExperience'

const Navbar = () => {
  return (
    <nav className="py-7 flex justify-between items-center sticky top-0">
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
        className="flex items-center justify-items-center gap-5"
      >
        <ThemeSwitch />
        <div>search</div>
        <div>sort</div>
        <WriteExperience />
      </motion.div>
    </nav>
  )
}

export default Navbar
