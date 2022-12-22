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
  const cursor = useRef<DocumentSnapshot>()

  const getPost = useCallback(async () => {
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
    cursor.current = postSnapshot.docs[postSnapshot.docs.length - 1]

    const postsData = postSnapshot.docs.map(doc => {
      const data = doc.data() as IPost
      return { ...data, id: doc.id }
    })

    setData(state => {
      console.log(state, postsData)
      return [...state, ...postsData]
    })
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

  return { getPost, data, cursor }
}

export default useGetPosts
