import React from 'react'

import MessageIcon from '../../assets/message-icon.svg'

const ContactUsBtn = () => {
  return (
    <a
      href="mailto:debilana.info@gmail.com"
      rel="nofollow"
      className=" w-14 h-14 fixed bottom-6 right-6 rounded-full hidden lg:flex items-center justify-center bg-primary cursor-pointer"
    >
      <div className="scale-90">
        <MessageIcon />
      </div>
    </a>
  )
}

export default ContactUsBtn
