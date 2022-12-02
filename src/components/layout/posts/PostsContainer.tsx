import { motion } from 'framer-motion'
import React from 'react'

import { posts } from '../../data/postsdata'
import SortTable from '../SortTable'
import Post from './Post'

const PostsContainer = () => {
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
            className={`snap-start mx-6 lg:mx-0 md:max-w-xl 2xl:max-w-3xl`}
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
