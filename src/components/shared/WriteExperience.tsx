import React from 'react'

import Pencil from '../../assets/pencil.svg'

const WriteExperience = () => {
  return (
    <div className="flex items-center gap-3 py-1 px-3 cursor-pointer rounded-md border-2 border-black hover:text-primary-light hover:bg-black dark:border-primary-light dark:hover:bg-primary-light dark:hover:text-gray-dark">
      <span className="hidden md:inline-flex">Podeli iskustvo</span>
      <Pencil />
    </div>
  )
}

export default WriteExperience