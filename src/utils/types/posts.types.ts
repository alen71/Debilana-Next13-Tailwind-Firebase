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
  curPage: number
}

export enum PostsStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  BLOCKED = 'blocked'
}

export enum PostCategory {
  GASTARBAJTER = 'gastarbajter',
  DEBILANA = 'debilana'
}
