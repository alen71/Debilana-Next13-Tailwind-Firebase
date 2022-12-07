export type IPost = {
  admin?: boolean
  id: string
  content: string
  like: number
  dislike: number
  created_at: string
  status: PostsStatus
  category: PostCategory
}

export enum PostsStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  BLOCKED = 'blocked'
}

export enum PostCategory {
  GASTARBAJTER = 'Gastarbajter',
  DEBILANA = 'Debilana'
}
