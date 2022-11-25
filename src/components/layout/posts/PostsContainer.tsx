import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

import { posts } from '../../data/postsdata'
import SortTable from '../SortTable'
import Post from './Post'

const PostsContainer = () => {
  const [postContainerOffsetTop, setPostContainerOffsetTop] = useState(0)
  const postContainerEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPostContainerOffsetTop(postContainerEl?.current!?.offsetTop)
  }, [postContainerEl])
  console.log(postContainerOffsetTop)

  return (
    <div className="relative w-fit mx-auto">
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: '100%', opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.7, type: 'spring' }}
        className="absolute right-[-20px] top-0 w-fit h-fit"
      >
        <SortTable />
      </motion.div>
      <div
        ref={postContainerEl}
        className={`rounded-md max-w-3xl h-[calc(100vh-102px)] mt-6 relative flex flex-col gap-6 snap-proximity snap-y overflow-x-hidden overflow-y-scroll scrollbar-hide`}
      >
        {posts.map(({ content, like, dislike, created_at, id }, index) => {
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                type: 'spring',
                delay: (index + 2) / 2
              }}
              className="snap-start"
            >
              <Post
                id={id}
                content={content}
                likes={like}
                dislikes={dislike}
                date={created_at}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default PostsContainer
