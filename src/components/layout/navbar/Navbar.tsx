import { motion } from 'framer-motion'
import React, { useState } from 'react'

import Logo from '../../shared/Logo'
import NavItemWrapper from '../../shared/NavItemWrapper'
import SearchBar from '../../shared/SearchBar'

import WriteExperience from '../../shared/WriteExperience'
import SortTable from '../SortTable'

type Props = {
  hideSortTable?: boolean
}

const Navbar = ({ hideSortTable = false }: Props) => {
  return (
    <motion.nav
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center px-[2px]  bg-main-gray dark:bg-gray-dark h-[71px] w-[101%] fixed top-0 z-10 border-b-2"
    >
      <div className="xl:container mx-auto flex justify-between items-center relative">
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

        <SearchBar />

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
          <div className="h-8 flex items-center justify-center divide-x divide-gray-text-hover ml-auto text-base mr-6">
            <NavItemWrapper>novo</NavItemWrapper>
            <NavItemWrapper>u trendingu</NavItemWrapper>
            <NavItemWrapper>najbolje</NavItemWrapper>
            <NavItemWrapper>postani admin</NavItemWrapper>
          </div>

          <WriteExperience />
        </motion.div>
        <SortTable hide={hideSortTable} />
      </div>
    </motion.nav>
  )
}

export default Navbar
