import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  last?: boolean
}

const NavItemWrapper = ({ last = false, children }: Props) => {
  const isLast = last ? 'pr-0' : ''
  return (
    <div className={`px-8 ${isLast} flex items-center text-center h-full`}>
      {children}
    </div>
  )
}

export default NavItemWrapper
