import { searchRequest } from '@/utils/firebase/algolia'
import { useCallback, useState } from 'react'
import { IPost } from '@/utils/types/posts.types'

export const useSearchPost = () => {
  const [searchResults, setSearchResults] = useState<IPost[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [page, setPage] = useState(1)

  const next = useCallback(
    async (query: string) => {
      if (query.length < 2) return

      setLoading(true)
      setError(undefined)

      try {
        const res = await searchRequest(query, page)

        const formattedHits = res.hits.map(hit => {
          return {
            ...hit,
            id: hit.objectID,
            content: hit?._highlightResult?.content?.value
          }
        })

        setSearchResults(prev => [...(prev || []), ...formattedHits])
        setPage(page + 1)

        setLoading(false)
      } catch (error) {
        setError(error as string)
      }
    },
    [page]
  )

  const clearSearch = useCallback(() => {
    setSearchResults(null)
    setPage(1)
  }, [])

  return { searchResults, loading, error, next, clearSearch }
}
