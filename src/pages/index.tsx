import { useCallback, useEffect, useRef, useState } from 'react'

import Navbar from '../components/layout/navbar/Navbar'
import { getPosts } from '../utils/firebase/firebase-utils'
import { IPost, PostSort, PostsStatus } from '../utils/types/posts.types'
import useGetPosts from '../hooks/useGetPosts'
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
  const loader = useRef(null)
  const observer = useRef<any>()

  const { next, data, loading, error } = useGetPosts({
    sort: PostSort.NEW
  })

  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return
      if (observer.current) observer.current?.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          next()
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, next]
  )

  return (
    <div className="flex flex-col gap-6 items-center">
      <Navbar isAnimate />

      {data.map((post, index) => {
        return (
          <div
            key={post.id}
            ref={
              index && data.length === index + 1 ? lastElementRef : undefined
            }
          >
            <Post index={index} {...post} />
          </div>
        )
      })}
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  )
}
