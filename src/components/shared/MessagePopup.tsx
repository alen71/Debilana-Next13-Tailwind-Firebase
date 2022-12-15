import { useRouter } from 'next/router'
import React from 'react'

import BackgroundBlur from './BackgroundBlur'
import SuccessIcon from '../../assets/success-icon.svg'
import ErrorIcon from '../../assets/error-icon.svg'

type Props = {
  message: string
  isOpen: boolean
  messageType: boolean
  closeMessage: () => void
}

const MessagePopup = ({
  message,
  isOpen,
  messageType,
  closeMessage
}: Props) => {
  const router = useRouter()

  return (
    <>
      <BackgroundBlur open={isOpen} toggle={closeMessage} />
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } w-80 h-96 bg-white dark:bg-gray-dark flex justify-center items-center flex-col gap-5 rounded-md fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-40 shadow-[0_0_20px_10px] shadow-main-gray`}
      >
        <div
          className={`${
            messageType ? 'border-green' : 'border-red'
          } border-4 w-14 h-14 rounded-full flex items-center justify-center`}
        >
          {messageType ? <SuccessIcon /> : <ErrorIcon />}
        </div>
        <p className="font-semibold text-lg md:text-xl">{message}</p>
        {messageType ? (
          <div className="flex flex-col justify-center gap-3">
            <p>Vratite se na početnu stranu.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-green mx-auto px-6 py-1 rounded-full text-gray-dark"
            >
              Početna strana
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-3">
            <p>Molimo vas pokušajte ponovo.</p>
            <button
              onClick={closeMessage}
              className="bg-red mx-auto px-6 py-1 rounded-full text-gray-dark"
            >
              Pokušajte ponovo
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default MessagePopup
