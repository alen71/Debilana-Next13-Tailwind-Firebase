import React, { useState } from 'react'

const tabs = [
  { text: 'Odobravanjima' },
  { text: 'Osudama' },
  { text: 'Komentarima' }
]

const SortTable = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSortList = () => setIsOpen(!isOpen)

  const open = isOpen
    ? 'animate-slideIn translate-x-[0] opacity-1 visible'
    : 'animate-slideOut translate-x-[300%] opacity-0 invisible'

  return (
    <div
      onClick={toggleSortList}
      className="rounded-md bg-main-gray relative dark:bg-gray-dark px-3 py-2 text-center cursor-pointer select-none "
    >
      Sort
      <div
        className={`absolute left-0 top-14 w-[18rem] ${open} bg-main-gray dark:bg-gray-dark px-3 py-4 rounded-md `}
      >
        <div className="mb-4">Sortiraj po broju:</div>
        <div className="grid grid-rows-3 mt-2 divide-y-[1px] border-y-[1px]">
          {tabs.map(({ text }) => (
            <p
              key={text}
              className="py-2 hover:bg-primary-light-hover dark:hover:bg-gray-dark-hover"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SortTable
