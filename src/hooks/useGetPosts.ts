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
  sort?: PostSort
  category?: PostCategory
  initialData?: IPost[]
}

const useGetPosts = ({
  sort = PostSort.NEW,
  category,
  initialData
}: Params) => {
  const [data, setData] = useState<IPost[]>(initialData ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const cursor = useRef<DocumentSnapshot>()
  const isEnd = useRef(false)

  const next = useCallback(async () => {
    if (isEnd.current) return
    try {
      setLoading(true)
      setError(undefined)
      const constrains = [
        where('status', '==', PostsStatus.APPROVED),
        orderBy(sort, 'desc'),
        limit(limitPerPage)
      ]

      if (category) constrains.push(where('category', '==', category))
      if (cursor.current) constrains.push(startAfter(cursor.current))

      const colRef = collection(db, 'posts')
      const q = query(colRef, ...constrains)

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
  }, [sort, category, cursor])

  const setCursor = useCallback(async () => {
    if (data.length > 0) {
      const lastDoc = await getDoc(doc(db, 'posts', data[data.length - 1].id))
      cursor.current = lastDoc
    } else {
      const posts = await getPosts(PostsStatus.APPROVED, sort, category)
      // if (!posts) return
      const lastDoc = await getDoc(doc(db, 'posts', posts[posts.length - 1].id))
      cursor.current = lastDoc
    }
  }, [data, category, sort])

  useEffect(() => {
    if (!cursor.current) {
      setCursor()
    }
  }, [cursor, setCursor])

  useEffect(() => {
    next()
  }, [cursor, category, initialData, next])

  return { next, data, cursor, loading, error }
}

export default useGetPosts
