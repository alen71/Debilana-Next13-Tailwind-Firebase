import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  Firestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBIZa7NDEA2RDovYJYYY7q5U543Qg7Eowo',
  authDomain: 'debilana-e9580.firebaseapp.com',
  projectId: 'debilana-e9580',
  storageBucket: 'debilana-e9580.appspot.com',
  messagingSenderId: '200927340297',
  appId: '1:200927340297:web:4fea9872615687cf0f95d8'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

async function getPosts(db: Firestore) {
  const postsCol = collection(db, 'posts')
  const postSnapshot = await getDocs(postsCol)
  const posts = postSnapshot.docs.map(doc => doc.data())
  return posts
}

export const Posts = () => getPosts(db)
