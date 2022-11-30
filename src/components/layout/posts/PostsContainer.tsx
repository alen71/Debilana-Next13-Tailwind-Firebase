import { motion } from 'framer-motion'
import React from 'react'

import { posts } from '../../data/postsdata'
import SortTable from '../SortTable'
import Post from './Post'

const PostsContainer = () => {
  return (
    <>
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.7, type: 'spring' }}
        className="absolute right-0 top-10 w-fit h-fit"
      >
        <SortTable />
      </motion.div>

      {posts.map(({ content, like, dislike, created_at, id }, index) => {
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
              delay: (index + 2) / 2
            }}
            className={`snap-start max-w-3xl`}
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
