import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'

type Props = {
  setUploadFileNow: Dispatch<SetStateAction<{ URL: string; type: string }>>
}

const useRenderTestFile = ({ setUploadFileNow }: Props) => {
  const renderTestFile = useCallback(
    async (e: any) => {
      const file = e.target.files[0]

      let url = null

      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
      }

      setUploadFileNow({ URL: url, type: file.type })
    },
    [setUploadFileNow]
  )

  return { renderTestFile }
}

export default useRenderTestFile
