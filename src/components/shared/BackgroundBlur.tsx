import React from 'react'

type Props = {
  open: boolean
  toggle?: () => void
}

const BackgroundBlur = ({ open, toggle }: Props) => {
  return (
    <div
      className={`${
        open ? 'block' : 'hidden'
      } fixed top-[71px] left-0 w-screen h-screen z-20 backdrop-blur-md`}
      onClick={toggle}
    ></div>
  )
}

export default BackgroundBlur
