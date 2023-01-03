import { doc, runTransaction } from 'firebase/firestore'
import React, { useCallback, useState } from 'react'
import { db } from '../utils/firebase/firebase-utils'

const useInteraction = (id: string, like: number, dislike: number) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [likesNum, setLikesNum] = useState(like)
  const [dislikesNum, setDislikesNum] = useState(dislike)

  const likePost = useCallback(async () => {
    const postRef = doc(db, 'posts', id)
    try {
      return await runTransaction(db, async transaction => {
        const sfDoc = await transaction.get(postRef)
        if (!sfDoc.exists()) {
          throw 'Document does not exist!'
        }

        const dislikesNum = sfDoc.data().dislike
        const plusOneLike: number = sfDoc.data().like + 1
        const minusOneLike: number = sfDoc.data().like - 1
        const minusOneDislike: number = isDisliked
          ? dislikesNum - 1
          : dislikesNum

        if (isLiked) {
          transaction.update(postRef, {
            like: minusOneLike
          })
          setIsLiked(false)
          setLikesNum(minusOneLike)
        } else {
          transaction.update(postRef, {
            like: plusOneLike,
            dislike: minusOneDislike
          })
          setIsLiked(true)
          setIsDisliked(false)
          setLikesNum(plusOneLike)
          setDislikesNum(minusOneDislike)
        }
      })
    } catch (e) {
      return false
    }
  }, [isDisliked, id, isLiked])

  const dislikePost = useCallback(async () => {
    const postRef = doc(db, 'posts', id)

    try {
      return await runTransaction(db, async transaction => {
        const sfDoc = await transaction.get(postRef)
        if (!sfDoc.exists()) {
          throw 'Document does not exist!'
        }

        const likesNum = sfDoc.data().like
        const plusOneDislike: number = sfDoc.data().dislike + 1
        const minusOneDislike: number = sfDoc.data().dislike - 1
        const minusOneLike: number = isLiked ? likesNum - 1 : likesNum

        if (isDisliked) {
          transaction.update(postRef, {
            dislike: minusOneDislike
          })
          setIsDisliked(false)
          setDislikesNum(minusOneDislike)
        } else {
          transaction.update(postRef, {
            dislike: plusOneDislike,
            like: minusOneLike
          })
          setIsLiked(false)
          setIsDisliked(true)
          setLikesNum(minusOneLike)
          setDislikesNum(plusOneDislike)
        }
      })
    } catch (e) {
      return false
    }
  }, [isLiked, id, isDisliked])

  return { likesNum, dislikesNum, isLiked, isDisliked, dislikePost, likePost }
}

export default useInteraction
