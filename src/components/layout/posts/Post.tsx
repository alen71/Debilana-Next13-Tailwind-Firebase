import React from 'react'

import CommentSvg from '../../../assets/commnet.svg'
import ShareSvg from '../../../assets/share.svg'

type Props = {
  content: string
  likes: number
  dislikes: number
  date: string
  id: number
}

const Post = ({ content, likes, dislikes, date, id }: Props) => {
  const dateFormat = new Intl.DateTimeFormat('sr-Latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))

  return (
    <div className="bg-main-gray dark:bg-gray-dark text-light-gray-text dark:text-main-gray rounded-md overflow-hidden cursor-pointer">
      <div className="px-8 py-3">
        <div className="flex justify-between pb-2">
          <p>{`#${id}`}</p>
          <p className="capitalize ">{dateFormat}</p>
        </div>
        <div>
          <p className="text-black font-medium dark:text-primary-dark text-xl">
            {content}
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 place-items-center pb-3">
        <p>{likes}</p>
        <p>{dislikes}</p>
        <p>34</p>
        <p>Podeli</p>
      </div>
      <div className="w-full grid grid-cols-4 divide-x border-t-[1px] ">
        <p className="py-2 text-center hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover">
          Odobravam
        </p>
        <p className="py-2 text-center hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover">
          Osuđujem
        </p>
        <div className="py-2 grid place-items-center hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover">
          <CommentSvg className="scale-[1.8]" />
        </div>
        <div className="py-2 grid place-items-center hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover">
          <ShareSvg className="scale-[1.8]" />
        </div>
      </div>
    </div>
  )
}

export default Post
