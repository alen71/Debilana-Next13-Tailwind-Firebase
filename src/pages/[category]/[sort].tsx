import React, { useCallback, useRef } from 'react'

import { useRouter } from 'next/router'
import { NextPage } from 'next'

import Post from '../../components/layout/posts/Post'

import useGetPosts from '../../hooks/useGetPosts'
import Spinner from '../../components/shared/Spinner'
import PageLayout from '../../components/layout/PageLayout'
import { PostSort } from '@/utils/types/posts.types'

const Sort: NextPage = () => {
  const loader = useRef(null)
  const observer = useRef<any>()

  const router = useRouter()
  const { category, sort }: any = router.query

  console.log(sort)

  const { next, data, loading, error } = useGetPosts({
    sort: PostSort.NEW,
    order: sort === 'new' ? 'desc' : 'asc',
    category: category,
    mustBeCategory: true
  })

  console.log(error)

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
      <div className="h-screen custom-scrollbar flex flex-col gap-6 items-center ">
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
        {loading && <Spinner />}
        {error && <p>Error!</p>}
        <div ref={loader} />
      </div>
    </PageLayout>
  )
}

export default Sort
