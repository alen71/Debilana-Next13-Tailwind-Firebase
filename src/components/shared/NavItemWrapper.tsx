import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  last?: boolean
}

const NavItemWrapper = ({ last = false, children }: Props) => {
  const isLast = last ? 'pr-0' : ''
  return (
    <div
      className={`px-8 ${isLast} flex items-center text-center h-full hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover select-none`}
    >
      {children}
    </div>
  )
}

export default NavItemWrapper
