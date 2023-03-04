import React, { ReactNode } from 'react'
import ContactUsBtn from '../shared/ContactUsBtn'
import Navbar from './navbar/Navbar'

type Props = {
  children: ReactNode
  hideSortTable?: boolean
}

const PageLayout = ({ children, hideSortTable }: Props) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <Navbar hideSortTable={hideSortTable} />
      <ContactUsBtn />
      {children}
    </div>
  )
}

export default PageLayout
