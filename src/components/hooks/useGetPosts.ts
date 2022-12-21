import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../../utils/firebase/firebase-utils'
import { IPost } from '../../utils/types/posts.types'

const useGetPosts = (postsStatus: string, category?: string) => {
  const [postsData, setPostsData] = useState<IPost[]>([])

  const getPosts = useCallback(async () => {
    try {
      const postsCol = collection(db, 'posts')
      const q = !category
        ? query(
            postsCol,
            where('status', '==', postsStatus),
            orderBy('created_at', 'desc'),
            limit(3)
          )
        : query(
            postsCol,
            where('status', '==', postsStatus),
            where('category', '==', category),
            orderBy('created_at', 'desc'),
            limit(3)
          )
      const postSnapshot = await getDocs(q)

      const posts: any = postSnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      setPostsData(posts)
      console.log(posts)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line
    getPosts()
    // eslint-disable-next-line
  }, [])

  return postsData
}

export default useGetPosts
