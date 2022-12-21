import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import Navbar from '../components/layout/navbar/Navbar'
import Post from '../components/layout/posts/Post'
import { IPost } from '../utils/types/posts.types'
import usePagination from '../components/hooks/usePagination'

const Sort: NextPage = () => {
  const [postsData, setPostsData] = useState<IPost[]>([])
  const [sort, setSort] = useState('created_at')
  const scrollEl = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { category }: any = router.query

  return (
    <div className="h-screen custom-scrollbar overflow-y-auto overflow-x-hidden flex flex-col gap-6 items-center scroll-pt-24  md:snap-proximity md:snap-y">
      <Navbar sortPosts={sort} setSortPosts={setSort} />

      {postsData.map((post, index) => {
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
            className={`snap-start mx-6 lg:mx-0 md:max-w-xl 2xl:max-w-3xl w-[95%] min-[768px]:min-w-[650px]`}
          >
            <Post {...post} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default Sort
