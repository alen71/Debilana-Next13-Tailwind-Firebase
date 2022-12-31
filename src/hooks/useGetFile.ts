import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useCallback, useEffect, useState } from 'react'
import { storage } from '../utils/firebase/firebase-utils'

const useGetFile = (
  fileName: string,
  fileType: string,
  videoURL: string,
  id: string,
  asPath: string
) => {
  const [url, setUrl] = useState<string>('')
  const [embedVideo, setEmbedVideo] = useState(false)

  const getFile = useCallback(async () => {
    videoURL.length > 0 && setEmbedVideo(true)

    if (fileName.length === 0 || fileType.length === 0) return

    const imageListRef = ref(storage, `images/${id}`)
    const videoListRef = ref(storage, `video/${id}`)

    const listRef = fileType.startsWith('image') ? imageListRef : videoListRef
    console.log(listRef)
    const filesList = await listAll(listRef)

    if (!filesList) return

    const fileUrl = await getDownloadURL(filesList.items[0])

    setUrl(fileUrl)
  }, [fileName, fileType, videoURL, id])

  useEffect(() => {
    getFile()
  }, [])

  return { url }
}

export default useGetFile
