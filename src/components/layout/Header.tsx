import { motion } from 'framer-motion'
import React from 'react'
import Navbar from './navbar/Navbar'

const Header = () => {
  return (
    <motion.header
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className=" bg-main-gray dark:bg-gray-dark"
    >
      <div className="px-8 xl:container mx-auto">
        <Navbar />
      </div>
    </motion.header>
  )
}

export default Header
