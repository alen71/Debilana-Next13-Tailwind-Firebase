import React, { Dispatch, SetStateAction, useState } from 'react'

import LikeSvg from '../../assets/like.svg'
import DislikeSvg from '../../assets/dislike.svg'
import ThemeSwitch from '../shared/ThemeSwitch'
import ArrowUpSvg from '../../assets/arrowup.svg'
import { useRouter } from 'next/router'

type Props = {
  hide?: boolean
  toggle?: () => void
}

const SortTable = ({ hide, toggle }: Props) => {
  const [tabs, setTabs] = useState([
    { icon: <ArrowUpSvg />, text: 'najnovije', link: 'new' },
    { icon: <LikeSvg />, text: 'lajkovi', link: 'like' },
    { icon: <DislikeSvg />, text: 'dislajkovi', link: 'dislike' }
  ])
  const router = useRouter()

  const isHide = hide ? 'hidden' : ''

  return (
    <div className="text-center lg:text-left lg:absolute text-base lg:left-3 xl:left-14 lg:top-20 w-full xl:w-[15rem] lg:w-40 text-black dark:text-white py-1 rounded-md">
      <div className={`${isHide} mb-2 text-sm capitalize lg:pl-3`}>
        Sortiraj
      </div>
      <div className={`${isHide} grid grid-rows-3 mt-2 mb-12 lg:mb-20`}>
        {tabs.map(({ icon, text, link }) => (
          <div
            key={text}
            className="last:border-b-[1px] border-t-[1px] border-gray cursor-pointer"
            onClick={() => {
              toggle && toggle()
              if (router.asPath.includes('debilana')) {
                router.push(`/debilana/${link}`)
              } else if (router.asPath.includes('gastarbajter')) {
                router.push(`/gastarbajter/${link}`)
              } else if (router.asPath.includes('demokratija')) {
                router.push(`/demokratija/${link}`)
              } else {
                router.push(`/${link}`)
              }
            }}
          >
            <div
              className={`${
                (router.asPath.includes(link) &&
                  (link === 'dislike' || link === 'new')) ||
                (!router.asPath.includes('dislike') &&
                  router.asPath.includes('like') &&
                  link === 'like')
                  ? 'lg:dark:text-gray lg:text-gray'
                  : ''
              } flex items-center justify-center lg:justify-start lg:pl-3 gap-3 text-black dark:text-white hover:text-gray dark:hover:text-gray`}
            >
              {icon}
              <p className="py-2 uppercase text-center">{text}</p>
            </div>
          </div>
        ))}
      </div>
      <ThemeSwitch />
    </div>
  )
}

export default SortTable
