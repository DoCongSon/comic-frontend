import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import comicApiRequest from '@/apiRequests/comic'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComicResType } from '@/schemaValidations/comic.schema'
import {
  ReaderIcon,
  HeartFilledIcon,
  HeartIcon,
  Share1Icon,
  BookmarkIcon,
  BookmarkFilledIcon,
} from '@radix-ui/react-icons'
import envConfig from '@/config'
import ActionButtons from './action-buttons'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const response = await comicApiRequest.getComicDetail(params.slug)
  const comic: ComicResType = response.payload
  const url = `envConfig.NEXT_PUBLIC_URL/comics/${params.slug}`

  return {
    title: comic.name,
    description: comic.content.replace(/<[^>]*>/g, ''),
    openGraph: {
      title: comic.name,
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

const ComicDetailPage = async ({ params }: Props) => {
  const response = await comicApiRequest.getComicDetail(params.slug)
  const comic: ComicResType = response.payload

  return (
    <div className='max-w-[1420px] mx-auto p-4 md:p-10'>
      <Card>
        <CardContent className='mt-6'>
          <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            <div className='w-[300px] max-w-full h-[400px] rounded-lg overflow-hidden shadow relative mx-auto'>
              <Image
                src={comic.thumb_url}
                alt={comic.name}
                width={300}
                height={400}
                priority
                className='w-full h-full object-cover'
              />
              {comic.vip && (
                <Badge
                  variant='destructive'
                  className='absolute top-2 right-2 z-10 text-xs leading-none py-1 hover:bg-destructive rounded-tl-3xl rounded-br-3xl'>
                  vip
                </Badge>
              )}
            </div>
            <div className='flex flex-1 flex-col gap-4'>
              <h1 className='text-3xl font-bold text-center'>{comic.name}</h1>
              {comic.origin_name[0] != '' && (
                <div>
                  <h2 className='text-lg font-semibold'>Other name:</h2>
                  <p>{comic.origin_name.join(', ')}</p>
                </div>
              )}
              <div className='flex flex-wrap gap-4'>
                {comic.category.map((category) => (
                  <Badge variant={'secondary'} key={category.id}>
                    {category.name}
                  </Badge>
                ))}
              </div>
              <div>
                <h2 className='text-lg font-semibold'>Author:</h2>
                <p>{comic.author.join(', ')}</p>
              </div>
              <div className='flex gap-4 items-center'>
                <HeartFilledIcon width={18} height={18} color='yellow' />
                <h2 className='text-lg font-semibold leading-none'>{comic.likes}</h2>
              </div>
              <div className='flex gap-4 items-center'>
                <h2 className='text-lg font-semibold'>Status</h2>
                <Badge variant={'destructive'}>{comic.status.toUpperCase()}</Badge>
              </div>
              <ActionButtons
                comicId={comic.id}
                chapterReadNowLink={`/comics/${params.slug}/chapters/${comic.chapters[0].id}`}
              />
            </div>
          </div>
          <div className='mt-6'>
            <p className='text-muted-foreground text-justify'>{comic.content.replace(/<[^>]*>/g, '')}</p>
          </div>
        </CardContent>
      </Card>
      {/* tabs */}
      <Tabs defaultValue='chapter' className='mt-6'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='chapter'>Chapters</TabsTrigger>
          <TabsTrigger value='comments'>Comments</TabsTrigger>
        </TabsList>
        <TabsContent value='chapter'>
          <ScrollArea className='h-[500px] w-full rounded-xl border bg-card text-card-foreground shadow p-6'>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {comic.chapters.map((chapter) => (
                <Link
                  href={`/comics/${params.slug}/chapters/${chapter.id}`}
                  className='transition-colors hover:bg-accent hover:text-accent-foreground p-2 rounded-lg'
                  key={chapter.id}>
                  Chapter: {chapter.chapter_name}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value='comments'>
          <ScrollArea className='h-[500px] w-full rounded-xl border bg-card text-card-foreground shadow px-6'>
            {/* todo */}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ComicDetailPage
