import React from 'react'

import CommentSvg from '../../../assets/commnet.svg'
import ShareSvg from '../../../assets/share.svg'
import LikeSvg from '../../../assets/like.svg'
import LikeFillSvg from '../../../assets/like-fill.svg'
import DislikeSvg from '../../../assets/dislike.svg'
import DislikeFillSvg from '../../../assets/dislike-fill.svg'

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
    <div className="text-sm sm:text-base bg-main-gray dark:bg-gray-dark text-light-gray-text dark:text-main-gray rounded-md overflow-hidden cursor-pointer">
      <div className="px-8 py-5">
        <div className="flex justify-between pb-2">
          <p>{`#${id}`}</p>
          <p className="capitalize ">{dateFormat}</p>
        </div>
        <p className="text-black font-medium dark:text-primary-dark text-sm sm:text-lg">
          {content}
        </p>
      </div>
      <div className="w-full grid grid-cols-4 divide-x border-t-[1px] text-black dark:text-white ">
        <p className="flex items-center justify-center py-[10px] gap-2 text-center hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover">
          <LikeSvg className="scale-[0.7] sm:scale-[1]" />
          <span>{dislikes}</span>
        </p>
        <p className="flex items-center justify-center py-[10px] gap-2 text-center hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover">
          <DislikeSvg className="scale-[0.7] sm:scale-[1] translate-y-[2px]" />
          <span>{likes}</span>
        </p>
        <div className="flex items-center justify-center gap-4 py-[10px] hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover">
          <CommentSvg className="scale-[1.4] sm:scale-[1.8]" />
          <span>34</span>
        </div>
        <div className="py-[10px] grid place-items-center hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover">
          <ShareSvg className="scale-[1.4] sm:scale-[1.8]" />
        </div>
      </div>
    </div>
  )
}

export default Post
