import React, { useState } from 'react'

import ThemeSwitch from '../shared/ThemeSwitch'
import ArrowUpSvg from '@/assets/arrowup.svg'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { cn } from '@/lib/utils/common'
import SearchSvg from '@/assets/magnifying-glass.svg'

type Props = {
  hide?: boolean
  toggle?: () => void
}

const SortTable = ({ hide, toggle }: Props) => {
  const [tabs, setTabs] = useState([
    { icon: <ArrowUpSvg />, text: 'najnovije', link: 'new' },
    {
      icon: <ArrowUpSvg className="rotate-180" />,
      text: 'najstarije',
      link: 'old'
    }
  ])
  const router = useRouter()
  const asPath = router.asPath

  return (
    <div className="text-center lg:text-left lg:absolute text-base lg:left-3 xl:left-14 lg:top-20 w-full xl:w-[15rem] lg:w-40 text-black dark:text-white py-1 rounded-md">
      <div className={cn('mb-2 text-sm capitalize lg:pl-3', hide && 'hidden')}>
        Sortiraj
      </div>
      <div className={cn('grid grid-rows-3 mt-2', hide && 'hidden')}>
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
                  (link === 'old' || link === 'new')) ||
                (!router.asPath.includes('old') &&
                  !router.asPath.includes('new') &&
                  link === 'old')
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

      {!asPath.includes('search') && (
        <Link
          href="/search"
          className="flex items-center justify-center py-2 gap-2 my-10 border-primary border-2 rounded-full"
        >
          <SearchSvg />
          <p className="">Pretraži</p>
        </Link>
      )}

      <ThemeSwitch />
    </div>
  )
}

export default SortTable
