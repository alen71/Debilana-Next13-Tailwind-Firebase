import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import Navbar from '../../components/layout/navbar/Navbar'
import Post from '../../components/layout/posts/Post'
import { IPost, PostCategory, PostSort } from '../../utils/types/posts.types'
import useGetPosts from '../../hooks/useGetPosts'

const Sort: NextPage = () => {
  const loader = useRef(null)
  const observer = useRef<any>()

  const { next, data, loading, error } = useGetPosts({
    sort: PostSort.DISLIKE,
    category: PostCategory.DEMOKRATIJA
  })
  console.log(data)

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
    <div className="h-screen custom-scrollbar overflow-y-auto overflow-x-hidden flex flex-col gap-6 items-center scroll-pt-24  md:snap-proximity md:snap-y">
      <Navbar />

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
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  )
}

export default Sort
