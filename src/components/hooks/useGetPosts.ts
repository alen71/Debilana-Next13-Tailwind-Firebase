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
import { limitPerPage } from '../../utils/const'
import { db } from '../../utils/firebase/firebase-utils'
import {
  IPost,
  PostCategory,
  PostSort,
  PostsStatus
} from '../../utils/types/posts.types'

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
      console.log('current cursor', cursor.current?.data())

      const colRef = collection(db, 'posts')
      const q = query(colRef, ...constrains)

      const postSnapshot = await getDocs(q)

      const postsData = postSnapshot.docs.map(doc => {
        const data = doc.data() as IPost
        return { ...data, id: doc.id }
      })

      console.log('new data', postsData)

      if (postsData.length) {
        cursor.current = postSnapshot.docs[postSnapshot.docs.length - 1]
        setData(state => {
          //   console.log([...state, ...postsData])
          //   console.log([...new Set([...state, ...postsData].map(i => i.id))])
          return [...state, ...postsData]
        })
      } else {
        // nema vise itema
        isEnd.current = true
      }
    } catch (error: any) {
      setError(error?.message || 'Error occurred')
    } finally {
      setLoading(false)
    }
  }, [sort, category, cursor])

  const setCursor = useCallback(async () => {
    const lastDoc = await getDoc(doc(db, 'posts', data[data.length - 1].id))
    cursor.current = lastDoc
  }, [data])

  useEffect(() => {
    if (!cursor.current) {
      setCursor()
    }
  }, [cursor, setCursor])

  return { next, data, cursor, loading, error }
}

export default useGetPosts
