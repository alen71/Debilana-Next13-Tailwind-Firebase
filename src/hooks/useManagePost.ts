import { error } from 'console'
import { deleteDoc, doc, runTransaction } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React, { useCallback, useState } from 'react'
import { db, storage } from '../utils/firebase/firebase-utils'

const useManagePost = (id: string, fileName: string, fileType: string) => {
  const [managed, setManaged] = useState(false)

  const deletePost = useCallback(async () => {
    try {
      if (fileName.length > 0) {
        const targetRef = fileType.startsWith('image')
          ? ref(storage, `images/${fileName}`)
          : ref(storage, `video/${fileName}`)

        deleteObject(targetRef)
      }

      const isDeleted = await deleteDoc(doc(db, 'posts', id))
        .then(res => true)
        .catch(err => false)

      if (isDeleted) throw new Error('Post nije obrisan!')

      setManaged(true)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const approvePost = useCallback(async () => {
    const postRef = doc(db, 'posts', id)
    try {
      return await runTransaction(db, async transaction => {
        const sfDoc = await transaction.get(postRef)
        if (!sfDoc.exists()) {
          throw 'Document does not exist!'
        }

        transaction.update(postRef, { status: 'approved' })

        setManaged(true)
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  return { managed, deletePost, approvePost }
}

export default useManagePost
