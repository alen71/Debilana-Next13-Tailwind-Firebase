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
  startAt
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref
} from 'firebase/storage'

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
export const imageListRef = ref(storage, 'images/')
export const videoListRef = ref(storage, 'video/')

export async function getPosts(
  statusCondition: string,
  category?: string,
  startFrom = 0
) {
  if (startFrom === 0) {
    const postsCol = collection(db, 'posts')
    const q = !category
      ? query(
          postsCol,
          where('status', '==', statusCondition),
          orderBy('created_at', 'desc'),
          limit(2)
        )
      : query(
          postsCol,
          where('status', '==', statusCondition),
          where('category', '==', category),
          orderBy('created_at', 'desc'),
          limit(2)
        )
    const postSnapshot = await getDocs(q)

    const posts = postSnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    return posts
  } else {
    console.log(startFrom)

    const first = query(
      collection(db, 'posts'),
      orderBy('created_at', 'desc'),
      limit(startFrom)
    )
    const documentSnapshots = await getDocs(first)

    console.log(documentSnapshots.docs)

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]
    console.log('last', lastVisible.data())

    const postsCol = collection(db, 'posts')
    const q = !category
      ? query(
          postsCol,
          orderBy('created_at', 'desc'),
          where('status', '==', statusCondition),
          startAfter(lastVisible),
          limit(2)
        )
      : query(
          postsCol,
          where('status', '==', statusCondition),
          where('category', '==', category),
          orderBy('created_at', 'desc'),
          startAfter(lastVisible),
          limit(2)
        )
    const postSnapshot = await getDocs(q)

    const posts = postSnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    return posts
  }
}

export async function getPost(id: string) {
  const postsRef = doc(db, 'posts', id)

  return postsRef
}

export async function getSortedPosts(
  statusCondition: string,
  sort: string,
  category?: string
) {
  console.log(sort)
  const postsCol = collection(db, 'posts')
  const q = category
    ? query(
        postsCol,
        where('status', '==', statusCondition),
        where('category', '==', category),
        limit(7),
        orderBy(sort, 'desc')
      )
    : query(
        postsCol,
        where('status', '==', statusCondition),
        limit(7),
        orderBy(sort, 'desc')
      )
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

export async function deletePost(
  id: string,
  fileName: string,
  fileType: string
) {
  if (fileName.length > 0) {
    const targetRef = fileType.startsWith('image')
      ? ref(storage, `images/${fileName}`)
      : ref(storage, `video/${fileName}`)

    deleteObject(targetRef)
  }

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

      const dislikesNum = sfDoc.data().dislike
      const plusOneLike: number = sfDoc.data().like + 1
      const minusOneDislike: number = isDisliked ? dislikesNum - 1 : dislikesNum

      transaction.update(postRef, {
        like: plusOneLike,
        dislike: minusOneDislike
      })

      return {
        like: plusOneLike,
        dislike: minusOneDislike
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

      const likesNum = sfDoc.data().like
      const plusOneDislike: number = sfDoc.data().dislike + 1
      const minusOneLike: number = isLiked ? likesNum - 1 : likesNum

      transaction.update(postRef, {
        dislike: plusOneDislike,
        like: minusOneLike
      })

      return {
        dislike: plusOneDislike,
        like: minusOneLike
      }
    })
  } catch (e) {
    return false
  }
}

export async function getFile(fileName: string, fileType: string) {
  if (fileName.length === 0 || fileType.length === 0) return

  const listRef = fileType.startsWith('image') ? imageListRef : videoListRef

  const filesList = await listAll(listRef)

  if (!filesList) return

  const targetItem = filesList.items.filter((file: any) => {
    return file._location.path.includes(fileName)
  })

  return await getDownloadURL(targetItem[0])
}
