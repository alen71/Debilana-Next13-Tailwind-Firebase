import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  last?: boolean
  active?: boolean
}

const NavItemWrapper = ({ last, children, active }: Props) => {
  const isLast = last ? 'pr-0' : ''
  const isActive = active
    ? 'text-gray-text-hover dark:text-gray-text-hover-dark'
    : ''

  return (
    <div
      className={`md:px-3 xl:px-[18px] ${isLast} flex items-center text-center h-fit  select-none uppercase font-semibold md:font-bold`}
    >
      <span
        className={`${isActive} hover:text-gray-text-hover dark:hover:text-gray-text-hover-dark cursor-pointer`}
      >
        {children}
      </span>
    </div>
  )
}

export default NavItemWrapper
