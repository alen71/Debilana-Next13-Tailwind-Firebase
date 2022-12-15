import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

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
  getFile,
  likePost
} from '../../../utils/firebase/firebase-utils'
import ApproveOrDelPopup from './ApproveOrDelPopup'
import Image from 'next/image'

const Post = ({
  content,
  like,
  dislike,
  created_at,
  id,
  category,
  videoURL,
  admin,
  fileName,
  fileType
}: IPost) => {
  const [managed, setManaged] = useState(false)
  const [openDelPopup, setOpenDelPopup] = useState(false)
  const [openApprovePopup, setOpenApprovePopup] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [embedVideo, setEmbedVideo] = useState(false)
  const [url, setUrl] = useState<string>('')

  const dateFormat = new Intl.DateTimeFormat('sr-Latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(created_at))

  const postDelete = async () => {
    const isDeleted: any = await deletePost(id)
    setManaged(isDeleted)
  }

  const postApprove = async () => {
    const isApproved = await approvePost(id)
    setManaged(isApproved)
  }

  const postLike = async () => {
    const { like, dislike }: any = await likePost(id, isDisliked)

    if (typeof like !== 'number') return

    setIsLiked(true)
    setIsDisliked(false)
  }

  const postDislike = async () => {
    const { like, dislike }: any = await dislikePost(id, isLiked)

    if (typeof dislike !== 'number') return

    setIsDisliked(true)
    setIsLiked(false)
  }

  useEffect(() => {
    videoURL.length > 0 && setEmbedVideo(true)

    if (fileName.length === 0) return

    const getUrl = async () => {
      const url: any = await getFile(fileName, fileType)
      setUrl(url)
      console.log(url)
    }
    getUrl()
  }, [])

  return (
    <div
      className={`${
        managed ? 'translate-x-[-500%] absolute w-full mb-0' : ''
      } ${
        admin ? 'mb-6' : ''
      } transition-transform duration-300 text-sm sm:text-base bg-main-gray dark:bg-gray-dark text-light-gray-text dark:text-main-gray rounded-md overflow-hidden cursor-pointer`}
    >
      <div className="pt-2">
        <div className="flex justify-between pb-2 px-8 border-b-[1px] mb-4 text-xs md:text-sm">
          <p>{category}</p>
          <p className="capitalize ">{dateFormat}</p>
        </div>
        <p className="text-black font-medium dark:text-primary-dark text-sm sm:text-lg px-8">
          {content}
        </p>

        {embedVideo && (
          <div className="mt-4">
            <ReactPlayer url={videoURL} controls={true} width="100%" />
          </div>
        )}

        <div className="relative w-full mt-4">
          {fileName.length > 0 && fileType.includes('image') && (
            <Image
              src={url}
              width={800}
              height={300}
              alt={fileName}
              style={{ objectFit: 'cover' }}
              quality={90}
            />
          )}

          {fileName.length > 0 && fileType.includes('video') && (
            <video src={url} controls></video>
          )}
        </div>
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
              <span>{isLiked ? like + 1 : like}</span>
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
              <span>{isDisliked ? dislike + 1 : dislike}</span>
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
