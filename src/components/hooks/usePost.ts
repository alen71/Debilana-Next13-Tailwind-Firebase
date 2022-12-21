import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { usePagination } from 'use-pagination-firestore'
import { limitPerPage } from '../../utils/const'
import { db } from '../../utils/firebase/firebase-utils'
import { IPost, PostsStatus } from '../../utils/types/posts.types'

const usePost = (sort: string, category?: string) => {
  const [posts, setPosts] = useState<IPost[]>()

  //   let docSnap = null
  //   if (posts) {
  //     docSnap = await getDoc(doc(db, 'posts', posts[posts.length - 1].id))
  //   }

  const q = [where('status', '==', PostsStatus.APPROVED), orderBy(sort, 'desc')]

  if (category) q.push(where('category', '==', category))
  //   if (docSnap) q.push(startAfter(docSnap))

  q.push(limit(limitPerPage))

  const test = usePagination<IPost[]>(query(collection(db, 'posts'), ...q), {
    limit: limitPerPage
  })

  console.log(test)

  const getPost = useCallback(async () => {
    const postsCol = collection(db, 'posts')

    const postSnapshot = await getDocs(query(postsCol, ...q))

    const postsData: IPost[] = postSnapshot.docs.map(doc => {
      const data = doc.data() as IPost
      return { ...data, id: doc.id }
    })

    setPosts(state => (state ? [...state, ...postsData] : postsData))
  }, [sort, category, posts])

  useEffect(() => {
    getPost()
  }, [])

  return { posts }
}

export default usePost
