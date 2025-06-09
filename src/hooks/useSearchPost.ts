import { searchRequest } from '@/utils/firebase/algolia'
import { useSearchStore } from '@/store/useSearchStore'
import { useCallback } from 'react'

export const useSearchPost = () => {
  const setSearchResults = useSearchStore(state => state.setSearchResults)

  const getSearchResults = useCallback(
    async (query: string) => {
      const res = await searchRequest(query)

      console.log('res', res)

      const formattedHits = res.hits.map(hit => {
        return {
          ...hit,
          content: hit?._highlightResult?.content?.value
        }
      })

      console.log(formattedHits)

      setSearchResults(formattedHits)
    },
    [setSearchResults]
  )

  return { getSearchResults }
}
