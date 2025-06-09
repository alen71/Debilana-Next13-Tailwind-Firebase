import { searchRequest } from '@/utils/firebase/algolia'
import { useSearchStore } from '@/store/useSearchStore'
import { useCallback } from 'react'

export const useSearchPost = () => {
  const setSearchResults = useSearchStore(state => state.setSearchResults)

  const getSearchResults = useCallback(
    async (query: string) => {
      const res = await searchRequest(query)
      setSearchResults(res.hits)
    },
    [setSearchResults]
  )

  return { getSearchResults }
}
