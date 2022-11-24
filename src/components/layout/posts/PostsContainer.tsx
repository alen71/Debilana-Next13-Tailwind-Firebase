import { motion } from 'framer-motion'
import React from 'react'

import { posts } from '../../data/postsdata'
import Post from './Post'

const PostsContainer = () => {
  return (
    <div className="max-w-3xl mx-auto px-5 py-7">
      <div className="flex flex-col gap-6">
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
