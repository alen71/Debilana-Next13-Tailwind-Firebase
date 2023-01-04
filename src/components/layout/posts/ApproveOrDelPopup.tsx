import React, { useState } from 'react'
import BackgroundBlur from '../../shared/BackgroundBlur'

type Props = {
  open: boolean
  purpose: string
  toggle: () => void
  action: () => void
}

const ApproveOrDelPopup = ({ open, toggle, purpose, action }: Props) => {
  const doAction = () => {
    toggle()
    action()
  }

  return (
    <>
      <BackgroundBlur open={open} toggle={toggle} />
      <div
        className={`${
          open ? 'block' : 'hidden'
        } bg-white dark:bg-black fixed max-w-lg p-6 rounded-md top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-50 shadow-container-shadow dark:shadow-none dark:border-[1px] dark:border-grays`}
      >
        <p className="text-black dark:text-white mb-6 text-center md:text-lg text-sm font-semibold">
          Jeste li sigurni da želite {purpose} obrisati ovaj post?
        </p>
        <div className="flex gap-3 justify-center ">
          <button
            className="px-8 py-1 w-fit rounded-full text-black bg-green"
            onClick={doAction}
          >
            Da
          </button>
          <button
            className="px-8 py-1 w-fit rounded-full text-black bg-red"
            onClick={toggle}
          >
            Ne
          </button>
        </div>
      </div>
    </>
  )
}

export default ApproveOrDelPopup
