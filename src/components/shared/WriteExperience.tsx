import Link from 'next/link'
import React from 'react'

import Pencil from '../../assets/pencil.svg'

const WriteExperience = () => {
  return (
    <Link href="/create-post">
      <div className="group flex items-center text-sm xl:text-base gap-3 lg:py-[6px] lg:pl-4 lg:pr-2 cursor-pointer rounded-lg lg:bg-primary lg:hover:bg-primary-light">
        <span className="hidden lg:inline-flex text-white">Napravi objavu</span>
        <div className="w-5 h-5 flex justify-center items-center lg:group-hover:animate-wiggle text-primary hover:text-primary-light lg:text-white lg:hover:text-white scale-100 sm:scale-110 lg:scale-100">
          <Pencil />
        </div>
      </div>
    </Link>
  )
}

export default WriteExperience
