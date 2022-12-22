import React, { Dispatch, SetStateAction, useState } from 'react'

import LikeSvg from '../../assets/like.svg'
import DislikeSvg from '../../assets/dislike.svg'
import ThemeSwitch from '../shared/ThemeSwitch'
import ArrowUpSvg from '../../assets/arrowup.svg'
import { PostSort } from '../../utils/types/posts.types'

type Props = {
  hide?: boolean
  sort?: string
  toggle?: () => void
}

const SortTable = ({ hide, sort, toggle }: Props) => {
  const [tabs, setTabs] = useState([
    { icon: <ArrowUpSvg />, text: 'najnovije', sortBy: PostSort.NEW },
    { icon: <LikeSvg />, text: 'lajkovi', sortBy: PostSort.LIKE },
    { icon: <DislikeSvg />, text: 'dislajkovi', sortBy: PostSort.DISLIKE }
  ])

  const isHide = hide ? 'hidden' : ''

  return (
    <div className="text-center lg:text-left lg:absolute text-base lg:left-3 xl:left-14 lg:top-20 w-full xl:w-[15rem] lg:w-40 text-black dark:text-white py-1 rounded-md">
      <div className={`${isHide} mb-2 text-base uppercase pl-3`}>Sortiraj</div>
      <div className={`${isHide} grid grid-rows-3 mt-2 mb-12 lg:mb-20`}>
        {tabs.map(({ icon, text, sortBy }) => (
          <div
            key={text}
            className="last:border-b-[1px] border-t-[1px] cursor-pointer"
            onClick={toggle}
          >
            <div
              className={`${
                sort === sortBy
                  ? 'lg:text-gray-text-hover lg:dark:text-gray-text-hover-dark'
                  : ''
              } flex items-center justify-center lg:justify-start pl-3 gap-3  lg:hover:text-gray-text-hover lg:dark:hover:text-gray-text-hover-dark hover:bg-primary-light-hover dark:hover:bg-gray-dark lg:hover:bg-transparent lg:dark:hover:bg-transparent`}
            >
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
