import comicApiRequest from '@/apiRequests/comic'
import React from 'react'
import ChapterContent from './chapter-content'
import { cookies } from 'next/headers'
import { Metadata, ResolvingMetadata } from 'next'
import { ComicResType } from '@/schemaValidations/comic.schema'

type Props = {
  params: { slug: string; id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const responseComic = await comicApiRequest.getComicDetail(params.slug)
  const comic: ComicResType = responseComic.payload

  const response = await comicApiRequest.getChapter(params.slug, params.id, accessToken?.value)
  const { chapter_name } = response.payload

  const url = `envConfig.NEXT_PUBLIC_URL/comics/${params.slug}`

  return {
    title: `${comic.name} - Chapter ${chapter_name}`,
    description: comic.content.replace(/<[^>]*>/g, ''),
    openGraph: {
      title: `${comic.name} - Chapter ${chapter_name}`,
      description: comic.content.replace(/<[^>]*>/g, ''),
      url,
      siteName: 'Super Comics',
      images: [
        {
          url: comic.thumb_url,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  }
}

const ChapterPage = async ({ params }: Props) => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const comicRes = await comicApiRequest.getComicDetail(params.slug)
  const comic = comicRes.payload
  const current_chapter_index = comic.chapters.findIndex((chapter) => chapter.id === params.id)
  let next_chapter_id
  let previous_chapter_id
  if (current_chapter_index > 0) {
    previous_chapter_id = comic.chapters[current_chapter_index - 1].id
  }
  if (current_chapter_index < comic.chapters.length - 1) {
    next_chapter_id = comic.chapters[current_chapter_index + 1].id
  }
  const response = await comicApiRequest.getChapter(params.slug, params.id, accessToken?.value)
  const { chapter_images, chapter_name, chapter_path, id } = response.payload
  return (
    <div className='p-4 md:p-10'>
      <h1 className='text-3xl font-bold text-center'>
        {comic.name} - Chapter {chapter_name}
      </h1>
      <div className='w-full max-w-[1000px] mt-4 md:mt-6 mx-auto'>
        <ChapterContent
          id={id}
          comic_slug={comic.slug}
          chapter_images={chapter_images}
          chapter_path={chapter_path}
          chapter_list={comic.chapters}
          next_chapter_id={next_chapter_id}
          previous_chapter_id={previous_chapter_id}
        />
      </div>
    </div>
  )
}

export default ChapterPage
