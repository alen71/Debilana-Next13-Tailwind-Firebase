import { algoliasearch, SearchResponse } from 'algoliasearch'
import { IPost } from '../types/posts.types'

const appId = process.env.NEXT_PUBLIC_VERCEL_ALGOLIA_APP_ID ?? ''
const apiKey = process.env.NEXT_PUBLIC_VERCEL_ALGOLIA_API_KEY ?? ''

const client = algoliasearch(appId, apiKey)

client.setSettings({
  indexName: 'debilana_content',
  indexSettings: {
    attributesForFaceting: ['searchable(content)']
  }
})

export const searchRequest = (
  query: string
): Promise<SearchResponse<IPost>> => {
  return client.searchSingleIndex({
    indexName: 'debilana_content',
    searchParams: {
      facetFilters: ['content'],
      query
    }
  })
}
