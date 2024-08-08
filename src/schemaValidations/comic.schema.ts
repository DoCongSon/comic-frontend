import z from 'zod'

export const ComicRes = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    vip: z.boolean(),
    origin_name: z.array(z.string()),
    content: z.string(),
    status: z.string(),
    thumb_url: z.string(),
    likes: z.number(),
    author: z.array(z.string()),
    category: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
      })
    ),
    chapters: z.array(
      z.object({
        id: z.string(),
        chapter_name: z.string(),
      })
    ),
  })
  .strict()

export type ComicResType = z.TypeOf<typeof ComicRes>

export type ListResType<T> = {
  results: T[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

export type ComicListResType = ListResType<Omit<ComicResType, 'chapters'>>

export type CategoryResType = {
  id: string
  name: string
  slug: string
}

export type CategoryListResType = ListResType<CategoryResType>

export type ChapterResType = {
  id: string
  comic: string
  chapter_name: string
  chapter_path: string
  chapter_images: {
    id: string
    image_page: string
    image_file: string
  }[]
}

export type TopViewComics = (ComicResType & { totalViews: number })[]
