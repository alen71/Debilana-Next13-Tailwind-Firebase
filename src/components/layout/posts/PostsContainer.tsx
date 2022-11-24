import { motion } from 'framer-motion'
import React, { useState } from 'react'

import { posts } from '../../data/postsdata'
import SortTable from '../../SortTable'
import Post from './Post'

const PostsContainer = () => {
  // const sortWidth = isSortOpen ? 'w-'

  return (
    <div className="max-w-3xl mx-auto px-5 my-6 relative">
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
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: '100%', opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.7, type: 'spring' }}
        className="absolute right-0 top-0 w-fit h-fit"
      >
        <SortTable />
      </motion.div>
    </div>
  )
}

export default PostsContainer
