import React, { useCallback, useState } from 'react'

const useCopyToClipboard = (id: string) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        `https://debilana.info/single-post/${id}`
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
