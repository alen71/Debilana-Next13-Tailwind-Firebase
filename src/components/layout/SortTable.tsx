import React from 'react'

import LikeSvg from '../../assets/like.svg'
import DislikeSvg from '../../assets/dislike.svg'
import CommentSvg from '../../assets/commnet.svg'
import ThemeSwitch from '../shared/ThemeSwitch'

const tabs = [
  { icon: <LikeSvg />, text: 'lajkova' },
  { icon: <DislikeSvg />, text: 'dislajkova' },
  { icon: <CommentSvg className="scale-[1.7]" />, text: 'komentara' }
]

type Props = {
  hide?: boolean
}

const SortTable = ({ hide }: Props) => {
  const isHide = hide ? 'hidden' : ''

  return (
    <div
      className={`${isHide} absolute text-base left-8 top-20 w-[15rem] text-black dark:text-white py-4 rounded-md`}
    >
      <div className="mb-2 text-base">Sortiraj po broju:</div>
      <div className="grid grid-rows-3 mt-2 ">
        {tabs.map(({ icon, text }) => (
          <div
            key={text}
            className="last:border-b-[1px] border-t-[1px] cursor-pointer"
          >
            <div className="flex items-center pl-3 gap-3  hover:text-gray-text-hover dark:hover:text-gray-text-hover-dark">
              {icon}
              <p className="py-2  uppercase text-center">{text}</p>
            </div>
          </div>
        ))}
      </div>
      <ThemeSwitch />
    </div>
  )
}

export default SortTable
