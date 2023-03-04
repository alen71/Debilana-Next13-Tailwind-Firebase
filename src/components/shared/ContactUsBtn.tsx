import React from 'react'

import MessageIcon from '../../assets/message-icon.svg'

const ContactUsBtn = () => {
  return (
    <a
      href="mailto:debilana.info@gmail.com"
      rel="nofollow"
      className=" w-16 h-16 fixed bottom-6 right-6 rounded-full hidden lg:flex items-center justify-center bg-primary cursor-pointer"
    >
      <MessageIcon />
    </a>
  )
}

export default ContactUsBtn
