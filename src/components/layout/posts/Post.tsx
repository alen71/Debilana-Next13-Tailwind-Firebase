import React, { useState } from 'react'

import ShareSvg from '../../../assets/share.svg'
import LikeSvg from '../../../assets/like.svg'
import LikeFillSvg from '../../../assets/like-fill.svg'
import DislikeSvg from '../../../assets/dislike.svg'
import DislikeFillSvg from '../../../assets/dislike-fill.svg'
import { IPost } from '../../../utils/types/posts.types'
import {
  approvePost,
  deletePost,
  dislikePost,
  likePost
} from '../../../utils/firebase/firebase-utils'
import ApproveOrDelPopup from './ApproveOrDelPopup'
import VideoEmbed from './VideoEmbed'

const Post = ({
  content,
  like,
  dislike,
  created_at,
  id,
  category,
  videoURL,
  admin
}: IPost) => {
  const [managed, setManaged] = useState(false)
  const [openDelPopup, setOpenDelPopup] = useState(false)
  const [openApprovePopup, setOpenApprovePopup] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setDisliked] = useState(false)
  const [postLikes, setPostLikes] = useState(like)
  const [postDislikes, setPostDislikes] = useState(dislike)

  // console.log(videoURL)

  const dateFormat = new Intl.DateTimeFormat('sr-Latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(created_at))

  const postDelete = async () => {
    const isDeleted = await deletePost(id)
    setManaged(isDeleted)
  }

  const postApprove = async () => {
    const isApproved = await approvePost(id)
    setManaged(isApproved)
  }

  const postLike = async () => {
    const { like, dislike }: any = await likePost(id, isDisliked)

    if (typeof like !== 'number') return
    setPostLikes(like)
    setPostDislikes(dislike)
    setIsLiked(true)
    setDisliked(false)
  }

  const postDislike = async () => {
    const { like, dislike }: any = await dislikePost(id, isLiked)

    if (typeof dislike !== 'number') return

    setPostDislikes(dislike)
    setPostLikes(like)
    setDisliked(true)
    setIsLiked(false)
  }

  return (
    <div
      className={`${
        managed ? 'translate-x-[-500%] absolute w-full mb-0' : ''
      } ${
        admin ? 'mb-6' : ''
      } transition-transform duration-300 text-sm sm:text-base bg-main-gray dark:bg-gray-dark text-light-gray-text dark:text-main-gray rounded-md overflow-hidden cursor-pointer`}
    >
      <div className="px-8 py-5">
        <div className="flex justify-between pb-2">
          <p>{category}</p>
          <p className="capitalize ">{dateFormat}</p>
        </div>
        <p className="text-black font-medium dark:text-primary-dark text-sm sm:text-lg">
          {content}
        </p>
        {videoURL.length > 0 && <VideoEmbed url={videoURL} />}
      </div>
      <div className="w-full grid grid-cols-4 divide-x border-t-[1px] text-black dark:text-white ">
        {!admin ? (
          <>
            <p
              className={`${
                isLiked ? 'pointer-events-none' : ''
              } flex items-center justify-center md:py-[10px] py-[6px] gap-2 text-center hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover`}
              onClick={postLike}
            >
              {isLiked ? (
                <LikeFillSvg className="scale-[0.7] sm:scale-[1]" />
              ) : (
                <LikeSvg className="scale-[0.7] sm:scale-[1]" />
              )}
              <span>{postLikes}</span>
            </p>
            <p
              className={`${
                isDisliked ? 'pointer-events-none' : ''
              } flex items-center justify-center md:py-[10px] py-[6px] gap-2 text-center hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover`}
              onClick={postDislike}
            >
              {isDisliked ? (
                <DislikeFillSvg className="scale-[0.7] sm:scale-[1] translate-y-[2px]" />
              ) : (
                <DislikeSvg className="scale-[0.7] sm:scale-[1] translate-y-[2px]" />
              )}
              <span>{postDislikes}</span>
            </p>
            <div className="md:py-[10px] py-[6px] grid place-items-center col-start-3 col-end-5 hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover">
              <ShareSvg className="scale-[1.4] sm:scale-[1.8]" />
            </div>
          </>
        ) : (
          <>
            <span className="col-start-1 col-end-3 text-center ">
              <button
                className="w-full uppercase font-semibold hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover text-green md:py-[10px] py-[6px]"
                onClick={() => setOpenApprovePopup(true)}
              >
                Odobri
              </button>
            </span>
            <span className="col-start-3 col-end-5 text-center ">
              <button
                className="w-full uppercase font-semibold hover:bg-primary-light-hover  dark:hover:bg-gray-dark-hover text-red md:py-[10px] py-[6px]"
                onClick={() => setOpenDelPopup(true)}
              >
                Odbij
              </button>
            </span>
          </>
        )}
      </div>
      <ApproveOrDelPopup
        open={openApprovePopup}
        purpose="Odobriti"
        toggle={() => setOpenApprovePopup(false)}
        action={postApprove}
      />
      <ApproveOrDelPopup
        open={openDelPopup}
        purpose="Odbiti"
        toggle={() => setOpenDelPopup(false)}
        action={postDelete}
      />
    </div>
  )
}

export default Post
