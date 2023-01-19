import React from 'react'
import Spinner from './Spinner'

type Props = {
  isTyping: boolean
  spinner?: boolean
}

const CreatePostButton = ({ isTyping, spinner = true }: Props) => {
  const typing = isTyping
    ? 'bg-primary'
    : 'bg-primary-light pointer-events-none'

  return (
    <button
      className={`${typing} rounded-full text-white w-[113px] h-[32px] flex items-center justify-center`}
    >
      {spinner ? <Spinner postButton /> : 'Postavi'}
    </button>
  )
}

export default CreatePostButton
