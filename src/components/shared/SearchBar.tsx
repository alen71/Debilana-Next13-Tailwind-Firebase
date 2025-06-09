import React, { useState } from 'react'

import LupaSvg from '../../assets/lupa.svg'
import { cn } from '@/lib/utils/common'
import { useSearchStore } from '@/store/useSearchStore'
import { useSearchPost } from '@/hooks/useSearchPost'

type Props = {
  hide?: boolean
}

const SearchBar = ({ hide }: Props) => {
  const [isFocused, setIsFocused] = useState(false)
  const [searchText, setSearchText] = useState('')

  const clearSearch = useSearchStore(state => state.clearSearch)

  const setFocus = () => {
    setIsFocused(!isFocused)
  }

  const { getSearchResults } = useSearchPost()

  const onClearSearch = () => {
    setSearchText('')
    clearSearch()
  }

  const onSearch = () => {
    getSearchResults(searchText)
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-2">
      <div
        className={cn(
          'rounded-lg w-full sm:max-w-[400px] min-w-[300px] sm:min-w-[350px]  xl:min-w-[500px] h-8 xl:h-[38px] overflow-hidden border-[1px] flex items-center gap-[14px] pl-2 xl:pl-[14px]',
          isFocused && 'border-white',
          hide && 'hidden'
        )}
      >
        <button className="cursor-pointer">
          <LupaSvg className="scale-75 xl:scale-100" />
        </button>

        <input
          type="text"
          placeholder="Pretraži...."
          className={cn(
            `placeholder:text-gray-text-hover placeholder:text-sm xl:placeholder:text-base w-full bg-transparent outline-none`
          )}
          onFocus={setFocus}
          onBlur={setFocus}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex flex-row items-center gap-4">
        <button
          className="cursor-pointer bg-primary text-white rounded-lg px-5 py-1"
          onClick={onSearch}
        >
          Pretraži
        </button>

        <button className="cursor-pointer" onClick={onClearSearch}>
          <span className="dark:text-white">Poništi</span>
        </button>
      </div>
    </div>
  )
}

export default SearchBar
