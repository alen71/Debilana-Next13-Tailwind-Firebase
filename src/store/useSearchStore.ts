import { IPost } from '@/utils/types/posts.types'
import { create } from 'zustand'

export const useSearchStore = create<{
  searchResults: IPost[] | null
  setSearchResults: (searchResults: IPost[]) => void
  clearSearch: () => void
}>(set => ({
  searchResults: null,
  setSearchResults: searchResults => set({ searchResults }),
  clearSearch: () => set({ searchResults: null })
}))
