import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layout/navbar/Navbar'
import Post from '../../components/layout/posts/Post'
import { getPost } from '../../utils/firebase/firebase-utils'
import { IPost } from '../../utils/types/posts.types'

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState<IPost>({} as IPost)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const getSignlePost = async () => {
      if (!id) return
      const postData = await getPost(id as string)

      const post = postData.data() as IPost
      console.log(post)
      setSinglePost({ ...post, id: id as string })
    }
    getSignlePost()
  }, [id])

  return (
    <div className="h-screen pb-6 flex items-center flex-col">
      <Navbar hideSortTable />
      <div className="mx-6 mt-6 lg:mx-0 md:max-w-xl 2xl:max-w-3xl w-[95%] min-[768px]:min-w-[650px]">
        {Object.entries(singlePost).length > 0 && <Post {...singlePost} />}
      </div>
    </div>
  )
}

export default SinglePost
