import React from 'react'

import LikeSvg from '../../assets/like.svg'
import DislikeSvg from '../../assets/dislike.svg'
import CommentSvg from '../../assets/commnet.svg'
import ThemeSwitch from '../shared/ThemeSwitch'

const tabs = [
  { text: 'najnovije' },
  { icon: <LikeSvg />, text: 'lajkovi' },
  { icon: <DislikeSvg />, text: 'dislajkovi' }
]

type Props = {
  hide?: boolean
}

const SortTable = ({ hide }: Props) => {
  const isHide = hide ? 'hidden' : ''

  return (
    <div className="text-center lg:text-left lg:absolute text-base lg:left-3 xl:left-14 lg:top-20 w-full xl:w-[15rem] lg:w-40 text-black dark:text-white py-4 rounded-md">
      <div className={`${isHide} mb-2 text-base uppercase pl-3`}>Sortiraj</div>
      <div className={`${isHide} grid grid-rows-3 mt-2 mb-12 lg:mb-20`}>
        {tabs.map(({ icon, text }) => (
          <div
            key={text}
            className="last:border-b-[1px] border-t-[1px] cursor-pointer"
          >
            <div className="flex items-center justify-center lg:justify-start pl-3 gap-3  lg:hover:text-gray-text-hover lg:dark:hover:text-gray-text-hover-dark hover:bg-primary-light-hover dark:hover:bg-gray-dark lg:hover:bg-transparent lg:dark:hover:bg-transparent">
              {icon}
              <p className="py-2 uppercase text-center font-semibold">{text}</p>
            </div>
          </div>
        ))}
      </div>
      <ThemeSwitch />
    </div>
  )
}

export default SortTable
