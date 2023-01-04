import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  last?: boolean
  active?: boolean | null
}

const NavItemWrapper = ({ last, children, active }: Props) => {
  const isLast = last ? 'pr-0' : ''
  const isActive = active ? 'text-gray' : 'text-black dark:text-white'

  return (
    <div
      className={`md:px-3 xl:px-[18px] ${isLast} flex items-center text-center h-fit select-none uppercase`}
    >
      <span
        className={`${isActive} hover:text-gray dark:hover:text-gray cursor-pointer`}
      >
        {children}
      </span>
    </div>
  )
}

export default NavItemWrapper
