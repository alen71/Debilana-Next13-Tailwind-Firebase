import React from 'react'

type Props = {
  isTyping: boolean
}

const CreatePostButton = ({ isTyping }: Props) => {
  const typing = isTyping
    ? 'bg-primary'
    : 'bg-primary-light pointer-events-none'

  return (
    <button className={`${typing} px-8 py-1 rounded-full text-white`}>
      Postavi
    </button>
  )
}

export default CreatePostButton
