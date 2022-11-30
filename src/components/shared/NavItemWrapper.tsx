import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  last?: boolean
}

const NavItemWrapper = ({ last = false, children }: Props) => {
  const isLast = last ? 'pr-0' : ''
  return (
    <div
      className={`px-[18px] ${isLast} flex items-center text-center h-fit  select-none uppercase text-base font-bold`}
    >
      <span className="hover:text-gray-text-hover dark:hover:text-gray-text-hover-dark cursor-pointer">
        {children}
      </span>
    </div>
  )
}

export default NavItemWrapper
