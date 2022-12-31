import React, { useCallback, useState } from 'react'

const useCopyToClipboard = (id: string) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        `debilana.vercel.app/single-post/${id}`
      )
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.log(err)
    }
  }, [id])

  return { copied, copyToClipboard }
}

export default useCopyToClipboard
