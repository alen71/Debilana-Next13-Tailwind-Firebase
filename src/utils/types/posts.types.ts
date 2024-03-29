export type IPost = {
  admin?: boolean
  id: string
  content: string
  like: number
  dislike: number
  created_at: string
  status: PostsStatus
  category: PostCategory
  videoURL: string
  fileName: string
  fileType: string
  index?: number
  link?: string
}

export enum PostsStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  BLOCKED = 'blocked'
}

export enum PostCategory {
  OSTALO = 'ostalo',
  GASTARBAJTER = 'gastarbajteri',
  DEBILANA = 'debilana',
  DEMOKRATIJA = 'demokratija'
}

export enum PostSort {
  LIKE = 'like',
  DISLIKE = 'dislike',
  NEW = 'created_at'
}
