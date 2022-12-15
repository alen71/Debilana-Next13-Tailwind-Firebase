import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import Navbar from '../../components/layout/navbar/Navbar'
import Post from '../../components/layout/posts/Post'
import { getPosts, getSortedPosts } from '../../utils/firebase/firebase-utils'
import { IPost, PostsStatus } from '../../utils/types/posts.types'

const Sort: NextPage = () => {
  const [postsData, setPostsData] = useState<IPost[]>([])

  const router = useRouter()
  const { sort }: any = router.query

  useEffect(() => {
    const allPosts = async () => {
      const posts: any = await getPosts(PostsStatus.APPROVED, 'gastarbajter')

      setPostsData(posts)
    }
    allPosts()
  }, [])

  useEffect(() => {
    if (!sort) return

    let sortBy = ''

    switch (sort) {
      case 'lajkovi':
        sortBy = 'like'
        break
      case 'dislajkovi':
        sortBy = 'dislike'
        break
      case 'najnovije':
        sortBy = 'created_at'
      default:
        break
    }

    const sortedPosts = async () => {
      const sortedPosts: any = await getSortedPosts(
        PostsStatus.APPROVED,
        sortBy,
        'gastarbajter'
      )
      setPostsData(sortedPosts)
    }
    sortedPosts()
  }, [sort])

  return (
    <div className="h-screen  custom-scrollbar overflow-y-auto overflow-x-hidden flex flex-col gap-6 items-center scroll-pt-24  md:snap-proximity md:snap-y">
      <Navbar />

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
