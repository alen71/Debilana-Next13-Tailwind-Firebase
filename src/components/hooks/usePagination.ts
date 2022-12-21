import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where
} from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { usePagination } from 'use-pagination-firestore'
import { limitPerPage } from '../../utils/const'
import { db } from '../../utils/firebase/firebase-utils'
import { IPost, PostsStatus } from '../../utils/types/posts.types'

const useTest = (scrollElement: any, sort: string, category?: string) => {
  const [postsData, setPostsData] = useState<IPost[]>([])
  const [lastEl, setLastEl] = useState<any>(null)
  const [isBottom, setIsBottom] = useState(false)

  const paginate = useCallback(async () => {
    const q = [
      where('status', '==', PostsStatus.APPROVED),
      orderBy(sort, 'desc'),
      limit(limitPerPage)
    ]

    //   if (docSnap) q.push(startAfter(docSnap))

    const res = usePagination<IPost[]>(query(collection(db, 'posts'), ...q), {
      limit: limitPerPage
    })
  }, [isBottom, category])

  // useEffect(() => {
  //   if (isBottom) paginate()
  // }, [scrollElement, isBottom, paginate])

  return postsData
}

export default useTest
