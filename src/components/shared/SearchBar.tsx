import React, { useState } from 'react'

import LupaSvg from '../../assets/lupa.svg'
import { cn } from '@/lib/utils/common'

type Props = {
  hide?: boolean
  onSearch: (searchText: string) => void
  setSearchText: (searchText: string) => void
  clearSearch: () => void
  searchText: string
}

const SearchBar = ({
  hide,
  onSearch,
  setSearchText,
  searchText,
  clearSearch
}: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  const setFocus = () => {
    setIsFocused(!isFocused)
  }

  const onClearSearch = () => {
    setSearchText('')
    clearSearch()
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'rounded-lg w-full sm:max-w-[400px] min-w-[300px] sm:min-w-[350px] border-gray  xl:min-w-[500px] h-8 xl:h-[38px] overflow-hidden border-[1px] flex items-center gap-[14px] pl-2 xl:pl-[14px]',
          isFocused && 'dark:border-white border-black',
          hide && 'hidden'
        )}
      >
        <button className="cursor-pointer peer-focus:text-white">
          <LupaSvg className="scale-75 xl:scale-100" />
        </button>

        <input
          type="text"
          placeholder="Pretraži...."
          className={cn(
            `placeholder:text-gray-text-hover placeholder:text-sm xl:placeholder:text-base w-full bg-transparent outline-none dark:focus:text-white focus:text-black text-gray peer`
          )}
          onFocus={setFocus}
          onBlur={setFocus}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex flex-row items-center gap-4 mt-2">
        <button
          className="cursor-pointer bg-primary text-white rounded-lg px-5 py-1"
          onClick={() => onSearch(searchText)}
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
