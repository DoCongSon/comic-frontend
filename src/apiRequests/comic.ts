import http from '@/lib/http'
import {
  CategoryListResType,
  ChapterResType,
  ComicListResType,
  ComicResType,
  TopViewComics,
} from '@/schemaValidations/comic.schema'

const comicApiRequest = {
  getComicDetail: (comic: string) => http.get<ComicResType>(`/comics/${comic}`),
  getHotComics: () => http.get<ComicListResType>('/comics?sortBy=likes:desc&limit=10'),
  getTopViewComics: () => http.get<TopViewComics>('/comics/top-viewed', { cache: 'no-store' }),
  getTopLikeComics: () => http.get<ComicListResType>('/comics?sortBy=likes:desc&limit=10', { cache: 'no-store' }),
  getRecommendedComics: (limit: number, page: number) =>
    http.get<ComicListResType>(`/comics?limit=${limit}&page=${page}`),
  getChapter: (comic: string, chapter: string, token?: string) =>
    http.get<ChapterResType>(
      `/comics/${comic}/chapters/${chapter}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    ),
  search: (q: string, limit: number, page: number) =>
    http.get<ComicListResType>(`/comics?name=${q}&limit=${limit}&page=${page}`),
  getCategories: () => http.get<CategoryListResType>('/categories?limit=99&sortBy=name%3Aasc'),
  getComicsByCategory: (category: string, limit: number, page: number) =>
    http.get<ComicListResType>(`/comics?category=${category}&limit=${limit}&page=${page}`),
}

export default comicApiRequest
