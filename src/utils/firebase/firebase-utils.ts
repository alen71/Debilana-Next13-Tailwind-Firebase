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
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
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

export async function likePost(id: string) {
  const postRef = doc(db, 'posts', id)
  try {
    return await runTransaction(db, async transaction => {
      const sfDoc = await transaction.get(postRef)
      if (!sfDoc.exists()) {
        throw 'Document does not exist!'
      }

      const plusOneLike = sfDoc.data().like + 1
      transaction.update(postRef, { like: plusOneLike })

      return plusOneLike
    })
  } catch (e) {
    return false
  }
}

export async function dislikePost(id: string) {
  const postRef = doc(db, 'posts', id)
  try {
    return await runTransaction(db, async transaction => {
      const sfDoc = await transaction.get(postRef)
      if (!sfDoc.exists()) {
        throw 'Document does not exist!'
      }

      const plusOneDislike = sfDoc.data().dislike + 1
      transaction.update(postRef, { dislike: plusOneDislike })

      return plusOneDislike
    })
  } catch (e) {
    return false
  }
}
