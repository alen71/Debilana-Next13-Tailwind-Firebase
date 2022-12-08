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
  runTransaction
} from 'firebase/firestore'
import { getDatabase, ref, set, update } from 'firebase/database'

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

export async function getPosts(statusCondition: string) {
  const postsCol = collection(db, 'posts')
  const q = query(postsCol, where('status', '==', statusCondition), limit(10))
  const postSnapshot = await getDocs(q)
  const posts = postSnapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id }
  })
  return posts
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

export async function deletePost(id: string) {
  return await deleteDoc(doc(db, 'posts', id))
    .then(res => true)
    .catch(err => false)
}

export async function approvePost(id: string) {
  const postRef = doc(db, 'posts', id)
  try {
    return await runTransaction(db, async transaction => {
      const sfDoc = await transaction.get(postRef)
      if (!sfDoc.exists()) {
        throw 'Document does not exist!'
      }

      transaction.update(postRef, { status: 'approved' })

      return true
    })
  } catch (e) {
    return false
  }
}

export async function likePost(id: string, isDisliked: boolean) {
  const postRef = doc(db, 'posts', id)
  try {
    return await runTransaction(db, async transaction => {
      const sfDoc = await transaction.get(postRef)
      if (!sfDoc.exists()) {
        throw 'Document does not exist!'
      }

      const plusOneLike: number = sfDoc.data().like + 1
      const minusOneDislike: number = sfDoc.data().dislike
      transaction.update(postRef, {
        like: plusOneLike,
        dislike: minusOneDislike
      })

      return {
        like: plusOneLike,
        dislike: isDisliked ? minusOneDislike - 1 : minusOneDislike
      }
    })
  } catch (e) {
    return false
  }
}

export async function dislikePost(id: string, isLiked: boolean) {
  const postRef = doc(db, 'posts', id)
  try {
    return await runTransaction(db, async transaction => {
      const sfDoc = await transaction.get(postRef)
      if (!sfDoc.exists()) {
        throw 'Document does not exist!'
      }

      const plusOneDislike: number = sfDoc.data().dislike + 1
      const minusOneLike: number = sfDoc.data().like
      transaction.update(postRef, {
        dislike: plusOneDislike,
        like: minusOneLike
      })

      return {
        dislike: plusOneDislike,
        like: isLiked ? minusOneLike - 1 : minusOneLike
      }
    })
  } catch (e) {
    return false
  }
}
