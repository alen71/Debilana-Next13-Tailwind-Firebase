import PageLayout from '@/components/layout/PageLayout'
import Post from '@/components/layout/posts/Post'
import SearchBar from '@/components/shared/SearchBar'
import Spinner from '@/components/shared/Spinner'
import { useSearchPost } from '@/hooks/useSearchPost'
import React, { useCallback, useRef, useState } from 'react'

const Search = () => {
  const loader = useRef(null)
  const observer = useRef<any>()
  const [searchText, setSearchText] = useState('')
  const { searchResults, loading, error, next, clearSearch } = useSearchPost()

  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return
      if (observer.current) observer.current?.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          next(searchText)
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, next, searchText]
  )

  return (
    <PageLayout hideSortTable>
      <SearchBar
        onSearch={next}
        setSearchText={setSearchText}
        searchText={searchText}
        clearSearch={clearSearch}
      />

      {!searchResults && <p>Pretražite objave</p>}

      {searchResults?.map((post, index) => {
        return (
          <div
            key={post.id}
            ref={
              index && searchResults.length === index + 1
                ? lastElementRef
                : undefined
            }
            className={`mx-6 lg:mx-0 md:max-w-xl 2xl:max-w-3xl w-[95%] min-[768px]:min-w-[650px]`}
          >
            <Post index={index} {...post} />
          </div>
        )
      })}

      {searchResults && searchResults.length === 0 && <p>Nema rezultata</p>}

      <div>{loading && <Spinner />}</div>
      {error && <p>Error!</p>}
      <div ref={loader} />
    </PageLayout>
  )
}

export default Search
