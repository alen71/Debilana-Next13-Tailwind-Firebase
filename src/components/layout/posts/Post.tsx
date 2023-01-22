import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { motion } from 'framer-motion'

import CopySvg from '../../../assets/copy.svg'
import ErrorSvg from '../../../assets/error-icon.svg'
import LikeSvg from '../../../assets/like.svg'
import LikeFillSvg from '../../../assets/like-fill.svg'
import DislikeSvg from '../../../assets/dislike.svg'
import DislikeFillSvg from '../../../assets/dislike-fill.svg'
import { IPost } from '../../../utils/types/posts.types'
import ApproveOrDelPopup from './ApproveOrDelPopup'
import useInteraction from '../../../hooks/useInteraction'
import useGetFile from '../../../hooks/useGetFile'
import useManagePost from '../../../hooks/useManagePost'
import useUserLogIn from '../../../store/useUserLogIn'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'

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
  index,
  fileType,
  link
}: IPost) => {
  const [openDelPopup, setOpenDelPopup] = useState(false)
  const [openApprovePopup, setOpenApprovePopup] = useState(false)

  const { copied, copyToClipboard } = useCopyToClipboard(id)
  const { loggedIn } = useUserLogIn()

  const dateFormat = new Intl.DateTimeFormat('sr-Latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(created_at))

  const router = useRouter()
  const asPath = router.asPath

  useEffect(() => {
    setOpenDelPopup(false)
    setOpenApprovePopup(false)
  }, [asPath])

  const { managed, deletePost, approvePost } = useManagePost(
    id,
    fileName,
    fileType
  )

  const { likesNum, dislikesNum, isLiked, isDisliked, dislikePost, likePost } =
    useInteraction(id, like, dislike)

  const { url, embedVideo, setEmbedVideo } = useGetFile(
    fileName,
    fileType,
    videoURL,
    id,
    asPath
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          type: 'spring'
          // delay: index && 0.3 * index
        }}
      >
        <div
          datatype={id}
          className={`${
            managed ? 'translate-x-[-500%] absolute w-full mb-0' : ''
          } ${
            admin ? 'mb-6' : ''
          } transition-transform duration-500 text-sm sm:text-base bg-white dark:bg-black dark:shadow-none
      shadow-container-shadow text-gray dark:border-[1px] dark:border-gray  rounded-md cursor-pointer`}
        >
          <div className="pt-3 sm:pt-4">
            <div className="flex justify-between items-center pb-3 sm:pb-4 px-4 md:px-8 text-xs md:text-sm">
              <a
                className="flex justify-between items-center w-full"
                href={`/single-post/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                <p>{category}</p>
                <p className={`capitalize ${loggedIn ? 'mx-auto' : ''}`}>
                  {dateFormat}
                </p>
              </a>
              {loggedIn && !asPath.includes('admin-page') && (
                <div
                  className="text-red scale-[0.8] hover:scale-90 duration-200"
                  onClick={(e: any) => {
                    e.stopPropagation()
                    setOpenDelPopup(true)
                  }}
                >
                  <ErrorSvg />
                </div>
              )}
            </div>
            <a href={`/single-post/${id}`} target="_blank" rel="noreferrer">
              <p className="text-black dark:text-white text-base md:text-lg px-4 md:px-8">
                {content}
                <br />
              </p>
            </a>
            {link && link.length > 0 && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline text-base md:text-lg px-3 md:px-8"
              >
                Audio link.
              </a>
            )}

            {embedVideo && (
              <div className="mt-4">
                <ReactPlayer url={videoURL} controls={true} width="100%" />
              </div>
            )}

            <div className="relative w-full mt-4">
              {fileName.length > 0 && fileType.startsWith('image') && (
                <a href={`/single-post/${id}`} target="_blank" rel="noreferrer">
                  <Image
                    src={url}
                    width={800}
                    height={300}
                    alt={fileName}
                    style={{ objectFit: 'cover' }}
                  />
                </a>
              )}

              {fileName.length > 0 && fileType.startsWith('video') && (
                <video
                  src={url}
                  controls
                  className="h-60 lg:h-[365px] w-full bg-black dark:bg-gray-text-hover"
                ></video>
              )}
            </div>
          </div>
          <div className="w-full grid grid-cols-4 divide-x border-t-[1px] border-gray text-gray  ">
            {!admin ? (
              <>
                <p
                  className={`group flex items-center justify-center md:py-[10px] py-[6px] gap-2 text-center hover:bg-gray-bg dark:hover:bg-gray-dark`}
                  onClick={likePost}
                >
                  {isLiked ? (
                    <LikeFillSvg className="text-primary group-hover:animate-pulse scale-[0.7] sm:scale-[1]" />
                  ) : (
                    <LikeSvg className="scale-[0.7] sm:scale-[1]" />
                  )}
                  <span>{likesNum}</span>
                </p>
                <p
                  className={`group flex items-center justify-center md:py-[10px] py-[6px] gap-2 text-center hover:bg-gray-bg dark:hover:bg-gray-dark`}
                  onClick={dislikePost}
                >
                  {isDisliked ? (
                    <DislikeFillSvg className="text-primary group-hover:animate-pulse scale-[0.7] sm:scale-[1] translate-y-[2px]" />
                  ) : (
                    <DislikeSvg className="scale-[0.7] sm:scale-[1] translate-y-[2px]" />
                  )}
                  <span>{dislikesNum}</span>
                </p>
                <div
                  className="md:py-[10px] py-[6px] relative grid place-items-center col-start-3 col-end-5 hover:bg-gray-bg dark:hover:bg-gray-dark"
                  onClick={copyToClipboard}
                >
                  <CopySvg
                    className={`${
                      copied ? 'opacity-0' : 'opacity-100'
                    } scale-[1.4] sm:scale-[1.8] duration-300`}
                  />
                  <p
                    className={`${
                      copied ? 'opacity-100' : 'opacity-0'
                    } duration-300 font-semibold absolute md:text-xl`}
                  >
                    Copied to clipboard!
                  </p>
                </div>
              </>
            ) : (
              <>
                <span className="col-start-1 col-end-3 text-center ">
                  <button
                    className="w-full uppercase font-semibold hover:bg-gray-bg dark:hover:bg-gray-dark text-green md:py-[10px] py-[6px]"
                    onClick={() => setOpenApprovePopup(true)}
                  >
                    Odobri
                  </button>
                </span>
                <span className="col-start-3 col-end-5 text-center ">
                  <button
                    className="w-full uppercase font-semibold hover:bg-gray-bg  dark:hover:bg-gray-dark text-red md:py-[10px] py-[6px]"
                    onClick={() => setOpenDelPopup(true)}
                  >
                    Odbij
                  </button>
                </span>
              </>
            )}
          </div>
        </div>
      </motion.div>
      <ApproveOrDelPopup
        open={openApprovePopup}
        purpose="Odobriti"
        toggle={() => setOpenApprovePopup(false)}
        action={approvePost}
      />
      <ApproveOrDelPopup
        open={openDelPopup}
        purpose="Obrisati"
        toggle={() => setOpenDelPopup(false)}
        action={deletePost}
      />
    </>
  )
}

export default Post
