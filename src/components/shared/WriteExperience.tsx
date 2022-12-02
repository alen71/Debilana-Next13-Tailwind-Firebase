import Link from 'next/link'
import React from 'react'

import Pencil from '../../assets/pencil.svg'

const WriteExperience = () => {
  return (
    <Link href="/create-post">
      <div className="flex items-center text-sm xl:text-base gap-3 md:py-[4px] md:pl-4 md:pr-[4px] cursor-pointer rounded-lg md:border-2 border-black hover:text-primary-light hover:bg-black dark:border-primary-light dark:hover:bg-primary-light dark:hover:text-gray-dark ">
        <span className="hidden md:inline-flex font-bold">Napravi objavu</span>
        <div className="w-7 h-7 flex justify-center items-center rounded-md border-2 color">
          <Pencil />
        </div>
      </div>
    </Link>
  )
}

export default WriteExperience
