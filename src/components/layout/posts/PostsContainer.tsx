import { DocumentData } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Posts } from '../../../utils/firebase/firebase-utils'

import Post from './Post'

const PostsContainer = () => {
  const [posts, setPosts] = useState<DocumentData[]>([])

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const postsList = await Posts()
        setPosts(postsList)
      } catch (err) {
        console.log(err)
      }
    }
    getAllPosts()
  }, [])

  return (
    <>
      {posts.map(({ content, like, dislike, created_at, id }, index) => {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
              delay: (index + 2) / 2
            }}
            className={`snap-start mx-6 lg:mx-0 md:max-w-xl 2xl:max-w-3xl w-[95%] min-[768px]:min-w-[768px]`}
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
    </>
  )
}

export default PostsContainer
