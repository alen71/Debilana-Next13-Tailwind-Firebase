import { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs } from 'firebase/firestore'

import Navbar from '../components/layout/navbar/Navbar'
import { db, getPosts } from '../utils/firebase/firebase-utils'
import { IPost, PostsStatus } from '../utils/types/posts.types'
import Post from '../components/layout/posts/Post'
import { ReactNode } from 'react'

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
  const [pagesNum, setPagesNum] = useState<number[]>([])
  const [curPage, setCurPage] = useState(1)

  useEffect(() => {
    const postArr = async () => {
      const postCollection = collection(db, 'posts')
      const { docs } = await getDocs(postCollection)

      let pagesArr = []

      for (let i = 0; i < Math.ceil(docs.length / 2); i++) {
        pagesArr.push(i + 1)
      }
      setPagesNum(pagesArr)
    }
    postArr()
  }, [])

  useEffect(() => {
    const test = curPage * 2 - 2
    const allPosts = async () => {
      const posts: any = await getPosts(PostsStatus.APPROVED, undefined, test)

      console.log(posts)
      setPostsData(posts)
    }
    allPosts()
  }, [curPage])

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
            <Post {...post} curPage={curPage} />
          </motion.div>
        )
      })}

      <div className="w-[95%] min-[768px]:max-w-[650px] px-4 bg-main-gray dark:bg-gray-dark ">
        <div className="flex justify-between items-center w-full">
          <button>{`<`}</button>
          <button>{`>`}</button>
        </div>
        <div className="flex">
          {pagesNum.map(num => {
            return (
              <div
                key={num}
                onClick={(e: any) => setCurPage(+e.target.textContent)}
                className={`${
                  curPage === num && 'bg-gray-text-hover-dark'
                } px-4 py-2`}
              >
                {num}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
