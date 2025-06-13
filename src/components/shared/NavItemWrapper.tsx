import { cn } from '@/lib/utils/common'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  last?: boolean
  active?: boolean | null
}

const NavItemWrapper = ({ last, children, active }: Props) => {
  const isActive = active ? 'text-gray' : 'text-black dark:text-white'

  return (
    <div
      className={cn(
        `md:px-3 xl:px-[18px] flex items-center text-center h-fit select-none uppercase`,
        last && 'pr-0',
        isActive
      )}
    >
      <span
        className={cn(
          'hover:text-gray dark:hover:text-gray cursor-pointer',
          isActive
        )}
      >
        {children}
      </span>
    </div>
  )
}

export default NavItemWrapper
