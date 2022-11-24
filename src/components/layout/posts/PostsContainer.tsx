import { motion } from 'framer-motion'
import React from 'react'

import { posts } from '../../data/postsdata'
import Post from './Post'

const PostsContainer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, type: 'spring', stiffness: 40 }}
      className="max-w-3xl mx-auto px-5 py-7"
    >
      <div className="flex flex-col gap-6">
        {posts.map(({ content, like, dislike, created_at, id }) => {
          return (
            <Post
              key={id}
              id={id}
              content={content}
              likes={like}
              dislikes={dislike}
              date={created_at}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

export default PostsContainer
