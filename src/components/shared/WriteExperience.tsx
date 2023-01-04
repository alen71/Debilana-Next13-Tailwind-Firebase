import Link from 'next/link'
import React from 'react'

import Pencil from '../../assets/pencil.svg'

const WriteExperience = () => {
  return (
    <Link href="/create-post">
      <div className="flex items-center text-sm xl:text-base gap-3 lg:py-[6px] lg:pl-4 lg:pr-2 cursor-pointer rounded-lg bg-primary hover:bg-primary-light">
        <span className="hidden lg:inline-flex text-white">Napravi objavu</span>
        <div className="w-5 h-5 flex justify-center items-center text-white">
          <Pencil />
        </div>
      </div>
    </Link>
  )
}

export default WriteExperience
