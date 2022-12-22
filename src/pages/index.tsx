import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import Navbar from '../components/layout/navbar/Navbar'
import { getPosts } from '../utils/firebase/firebase-utils'
import { IPost, PostSort, PostsStatus } from '../utils/types/posts.types'
import useGetPosts from '../components/hooks/useGetPosts'
import Post from '../components/layout/posts/Post'

export async function getServerSideProps() {
  const posts = await getPosts(PostsStatus.APPROVED)
  return {
    props: { posts: posts }
  }
}

type Props = {
  posts: IPost[]
}

export default function Home({ posts }: Props) {
  const [sort, setSort] = useState('created_at')
  const loader = useRef<HTMLDivElement>(null)

  const { next, data, loading, error } = useGetPosts({
    sort: PostSort.NEW,
    initialData: posts
  })

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        console.log('next')
        next()
      }
    },
    [next]
  )

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    }
    console.log('set observer')
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)

    return observer.disconnect
  }, [handleObserver])

  return (
    <div className="h-screen overflow-y-scroll overflow-x-hidden flex flex-col gap-6 items-center ">
      <Navbar isAnimate sortPosts={sort} setSortPosts={setSort} />

      {data.map((post, index) => {
        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
              delay: 0.5 * index
            }}
            className={` mx-6 lg:mx-0 md:max-w-xl 2xl:max-w-3xl w-[95%] min-[768px]:min-w-[650px]`}
          >
            <Post {...post} />
          </motion.div>
        )
      })}
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  )
}

//
