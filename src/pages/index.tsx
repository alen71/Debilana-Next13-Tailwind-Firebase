import { use, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import Navbar from '../components/layout/navbar/Navbar'
import { db, getPosts } from '../utils/firebase/firebase-utils'
import { IPost, PostsStatus } from '../utils/types/posts.types'
import Post from '../components/layout/posts/Post'
import usePost from '../components/hooks/usePost'
import { collection, limit, orderBy, query, where } from 'firebase/firestore'
import { limitPerPage } from '../utils/const'
import { usePagination } from 'use-pagination-firestore'

export async function getServerSideProps() {
  const posts = await getPosts(PostsStatus.APPROVED)
  return {
    props: { posts }
  }
}

type Props = {
  posts: IPost[]
  lastEl: any
}

export default function Home({ posts }: Props) {
  const [sort, setSort] = useState('created_at')
  const [postsData, setPostsData] = useState<IPost[]>([])
  const scrollEl = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   setPostsData([...postsData, ...res.items])
  // }, [res])

  // console.log(res)

  // useEffect(() => {
  //   scrollEl?.current?.addEventListener('scroll', (e: any) => {
  //     if (e.target.scrollTop + 500 > e.target.lastChild.offsetTop) res.getNext()
  //   })
  // }, [])

  return (
    <div
      ref={scrollEl}
      className="h-screen overflow-y-scroll overflow-x-hidden flex flex-col gap-6 items-center "
    >
      <Navbar isAnimate sortPosts={sort} setSortPosts={setSort} />

      {postsData.map((post, index) => {
        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
              delay: (index + 2) / 2
            }}
            className={` mx-6 lg:mx-0 md:max-w-xl 2xl:max-w-3xl w-[95%] min-[768px]:min-w-[650px]`}
          >
            <Post {...post} />
          </motion.div>
        )
      })}
    </div>
  )
}

//
