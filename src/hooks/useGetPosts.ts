import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore'
import { useCallback, useState, useEffect, useRef } from 'react'
import { limitPerPage } from '../utils/const'
import { db, getPosts } from '../utils/firebase/firebase-utils'
import {
  IPost,
  PostCategory,
  PostSort,
  PostsStatus
} from '../utils/types/posts.types'

type Params = {
  sort: PostSort
  category?: PostCategory
  mustBeCategory?: boolean
}

const useGetPosts = ({
  sort = PostSort.NEW,
  category,
  mustBeCategory
}: Params) => {
  const [data, setData] = useState<IPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const cursor = useRef<DocumentSnapshot>()
  const isEnd = useRef(false)

  const next = useCallback(async () => {
    if (mustBeCategory && !category) return

    if (isEnd.current) return
    try {
      setLoading(true)
      setError(undefined)

      const colRef = collection(db, 'posts')

      const lastEl = []

      if (cursor.current) lastEl.push(startAfter(cursor.current) as any)

      let q = !category
        ? query(
            colRef,
            where('status', '==', PostsStatus.APPROVED),
            orderBy(sort, 'desc'),
            limit(limitPerPage),
            ...lastEl
          )
        : query(
            colRef,
            where('status', '==', PostsStatus.APPROVED),
            where('category', '==', category),
            orderBy(sort, 'desc'),
            limit(limitPerPage),
            ...lastEl
          )

      const postSnapshot = await getDocs(q)

      const postsData = postSnapshot.docs.map(doc => {
        const data = doc.data() as IPost
        return { ...data, id: doc.id }
      })

      if (postsData.length) {
        cursor.current = postSnapshot.docs[postSnapshot.docs.length - 1]
        setData(state => {
          return [...state, ...postsData]
        })
      } else {
        isEnd.current = true
      }
    } catch (error: any) {
      setError(error?.message || 'Error occurred')
    } finally {
      setLoading(false)
    }
  }, [sort, category, mustBeCategory])

  const setCursor = useCallback(async () => {
    if (mustBeCategory && !category) return

    const posts = await getPosts(PostsStatus.APPROVED, sort, category)
    if (posts.length === 0) return
    const lastDoc = await getDoc(doc(db, 'posts', posts[posts.length - 1].id))
    cursor.current = lastDoc
  }, [category, sort, mustBeCategory])

  useEffect(() => {
    if (mustBeCategory && !category) return
    if (!cursor.current) {
      setCursor()
    }
  }, [cursor, setCursor, mustBeCategory, category])

  useEffect(() => {
    if (mustBeCategory && !category) return

    setData([])
    isEnd.current = false
    cursor.current = undefined
    next()
  }, [cursor, category, sort, next, mustBeCategory])

  return { next, data, cursor, loading, error }
}

export default useGetPosts
