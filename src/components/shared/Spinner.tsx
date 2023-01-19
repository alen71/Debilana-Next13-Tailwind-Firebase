import React from 'react'

type SpinnerProps = {
  postButton?: boolean
}

const Spinner = ({ postButton }: SpinnerProps) => {
  return (
    <div
      className={`${
        postButton
          ? 'w-5 h-5 border-white border-t-gray-dark'
          : 'w-8 h-8 border-gray border-t-primary dark:border-white dark:border-t-primary'
      }  rounded-full border-2 animate-spin`}
    ></div>
  )
}

export default Spinner
