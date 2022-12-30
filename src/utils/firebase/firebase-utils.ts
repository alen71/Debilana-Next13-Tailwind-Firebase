import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  Firestore,
  limit,
  orderBy,
  where,
  deleteDoc,
  runTransaction,
  startAfter,
  startAt,
  getCountFromServer
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref
} from 'firebase/storage'
import { limitPerPage } from '../const'
import { PostSort, PostsStatus } from '../types/posts.types'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_VERCEL_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_VERCEL_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_VERCEL_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_VERCEL_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_VERCEL_APP_ID
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)

export async function getPosts(
  statusCondition: string,
  sort = PostSort.NEW,
  category?: string
) {
  const postsCol = collection(db, 'posts')
  const q = !category
    ? query(
        postsCol,
        where('status', '==', statusCondition),
        orderBy(sort, 'desc'),
        limit(limitPerPage)
      )
    : query(
        postsCol,
        where('status', '==', statusCondition),
        where('category', '==', category),
        orderBy(sort, 'desc'),
        limit(limitPerPage)
      )
  const postSnapshot = await getDocs(q)

  const posts = postSnapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id }
  })

  return posts
}

export async function getPost(id: string) {
  const postsRef = doc(db, 'posts', id)

  return postsRef
}

export async function adminSignIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      return userCredential.user
    })
    .catch(error => {
      return error
    })
}

export async function adminSignOut() {
  return await signOut(auth)
    .then(res => true)
    .catch(err => false)
}
