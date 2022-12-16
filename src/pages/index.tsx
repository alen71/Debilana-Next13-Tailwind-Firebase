import { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import Navbar from '../components/layout/navbar/Navbar'
import { getPosts } from '../utils/firebase/firebase-utils'
import { IPost, PostsStatus } from '../utils/types/posts.types'
import Post from '../components/layout/posts/Post'

export async function getServerSideProps() {
  const posts = await getPosts(PostsStatus.APPROVED)
  return {
    props: { posts }
  }
}

type Props = {
  posts: IPost[]
}

export default function Home({ posts }: Props) {
  const [postsData, setPostsData] = useState<IPost[]>(posts)

  return (
    <div className="h-screen custom-scrollbar overflow-y-auto overflow-x-hidden flex flex-col gap-6 items-center scroll-pt-24  md:snap-proximity md:snap-y">
      <Navbar isAnimate />

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
