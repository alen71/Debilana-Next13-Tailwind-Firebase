import React, { useState } from 'react'

import LupaSvg from '../../assets/lupa.svg'

type Props = {
  hide?: boolean
}

const SearchBar = ({ hide }: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  const setFocus = () => {
    setIsFocused(!isFocused)
  }

  const inputColor = isFocused
    ? 'text-black border-black dark:border-primary-dark dark:text-primary-dark'
    : 'text-gray-text-hover border-gray-text-hover'
  const placeholderColor = isFocused
    ? 'placeholder:text-black placeholder:dark:text-primary-dark'
    : 'placeholder:text-gray-text-hover'

  const isHide = hide ? 'hidden' : ''

  return (
    <div
      className={`${inputColor} ${isHide} rounded-lg w-full sm:max-w-[400px] h-8 xl:h-[38px] overflow-hidden border-2 flex items-center gap-[14px] pl-2 xl:pl-[14px] `}
    >
      <button className="cursor-pointer">
        <LupaSvg className="scale-75 xl:scale-100" />
      </button>

      <input
        type="text"
        placeholder="Pretraži...."
        className={`${placeholderColor} placeholder:text-sm xl:placeholder:text-base w-full bg-transparent outline-none`}
        onFocus={setFocus}
        onBlur={setFocus}
      />
    </div>
  )
}

export default SearchBar
