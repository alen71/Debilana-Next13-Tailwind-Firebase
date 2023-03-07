import { useCallback, useEffect, useRef, useState } from 'react'

import Navbar from '../components/layout/navbar/Navbar'
import { getPosts } from '../utils/firebase/firebase-utils'
import { IPost, PostSort, PostsStatus } from '../utils/types/posts.types'
import useGetPosts from '../hooks/useGetPosts'
import Post from '../components/layout/posts/Post'
import Spinner from '../components/shared/Spinner'
import PageLayout from '../components/layout/PageLayout'

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
    <PageLayout>
      {data.map((post, index) => {
        return (
          <div
            key={post.id}
            ref={
              index && data.length === index + 1 ? lastElementRef : undefined
            }
            className={`mx-6 lg:mx-0 md:max-w-xl 2xl:max-w-3xl w-[95%] min-[768px]:min-w-[650px]`}
          >
            <Post index={index} {...post} />
          </div>
        )
      })}
      <div>{loading && <Spinner />}</div>
      {error && <p>Error!</p>}
      <div ref={loader} />
    </PageLayout>
  )
}
