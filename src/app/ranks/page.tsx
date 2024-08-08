import comicApiRequest from '@/apiRequests/comic'
import userApiRequest from '@/apiRequests/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Ranks',
}

const RanksPage = async () => {
  const topLikes = await comicApiRequest.getTopLikeComics()
  const topViews = await comicApiRequest.getTopViewComics()
  const topUsers = await userApiRequest.getTopUsers()

  return (
    <div className='max-w-[1420px] p-4 md:p-10 mx-auto'>
      <Tabs defaultValue='like' className='flex-1'>
        <TabsList className='grid w-full grid-cols-3 h-14 p-2'>
          <TabsTrigger value='like' className='text-2xl font-bold'>
            Top Like
          </TabsTrigger>
          <TabsTrigger value='view' className='text-2xl font-bold'>
            Top View
          </TabsTrigger>
          <TabsTrigger value='user' className='text-2xl font-bold'>
            Top User
          </TabsTrigger>
        </TabsList>
        <div className='mt-6 md:mt-10'>
          <TabsContent value='like'>
            <div className='flex flex-col md:flex-row gap-6 justify-center'>
              <Link href={`/comics/${topLikes.payload.results[0].slug}`} className='flex flex-col items-center'>
                <Image src='/top1.png' alt='top1' width={100} height={100} quality={100} />
                <h1 className='text-2xl font-bold text-center'>{topLikes.payload.results[0].likes} Likes</h1>
                <Image
                  src={topLikes.payload.results[0].thumb_url}
                  alt='top1-comic'
                  width={300}
                  height={300}
                  quality={100}
                  className='rounded-2xl w-[300px] h-[300px] object-cover'
                />
                <h1 className='text-2xl font-bold text-center mt-6 max-w-[300px]'>
                  {topLikes.payload.results[0].name}
                </h1>
              </Link>
              <Link
                href={`/comics/${topLikes.payload.results[1].slug}`}
                className='flex flex-col items-center md:-order-1'>
                <Image src='/top2.png' alt='top2' width={100} height={100} quality={100} />
                <h1 className='text-2xl font-bold text-center'>{topLikes.payload.results[1].likes} Likes</h1>
                <Image
                  src={topLikes.payload.results[1].thumb_url}
                  alt='top2-comic'
                  width={300}
                  height={300}
                  quality={100}
                  className='rounded-2xl w-[300px] h-[300px] object-cover'
                />
                <h1 className='text-2xl font-bold text-center mt-6 max-w-[300px]'>
                  {topLikes.payload.results[1].name}
                </h1>
              </Link>
              <Link href={`/comics/${topLikes.payload.results[3].slug}`} className='flex flex-col items-center'>
                <Image src='/top3.png' alt='top3' width={100} height={100} quality={100} />
                <h1 className='text-2xl font-bold text-center'>{topLikes.payload.results[2].likes} Likes</h1>
                <Image
                  src={topLikes.payload.results[2].thumb_url}
                  alt='top3-comic'
                  width={300}
                  height={300}
                  quality={100}
                  className='rounded-2xl w-[300px] h-[300px] object-cover'
                />
                <h1 className='text-2xl font-bold text-center mt-6 max-w-[300px]'>
                  {topLikes.payload.results[2].name}
                </h1>
              </Link>
            </div>
            <div className='flex flex-col gap-6 mt-10'>
              {topLikes.payload.results.slice(3).map((comic, index) => (
                <Link href={`/comics/${comic.slug}`} key={comic.id} className='flex items-center gap-4'>
                  <div className='text-5xl font-bold text-center w-[100px] h-[100px] rounded-xl shadow border flex flex-col items-center justify-center'>
                    <p>{index + 4}</p>
                    <h1 className='text-xl font-bold text-center'>{comic.likes} Likes</h1>
                  </div>
                  <Image
                    src={comic.thumb_url}
                    alt='top10-comic'
                    width={100}
                    height={100}
                    className='rounded-xl w-[100px] h-[100px] object-cover'
                  />
                  <h1 className='text-2xl font-bold flex-1'>{comic.name}</h1>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value='view'>
            <div className='flex flex-col md:flex-row gap-6 justify-center'>
              <Link href={`/comics/${topViews.payload[0].slug}`} className='flex flex-col items-center'>
                <Image src='/top1.png' alt='top1' width={100} height={100} quality={100} />
                <h1 className='text-2xl font-bold text-center'>{topViews.payload[0].totalViews} Views</h1>
                <Image
                  src={topViews.payload[0].thumb_url}
                  alt='top1-comic'
                  width={300}
                  height={300}
                  quality={100}
                  className='rounded-2xl w-[300px] h-[300px] object-cover'
                />
                <h1 className='text-2xl font-bold text-center mt-6 max-w-[300px]'>{topViews.payload[0].name}</h1>
              </Link>
              <Link href={`/comics/${topViews.payload[1].slug}`} className='flex flex-col items-center md:-order-1'>
                <Image src='/top2.png' alt='top2' width={100} height={100} quality={100} />
                <h1 className='text-2xl font-bold text-center'>{topViews.payload[1].totalViews} Views</h1>
                <Image
                  src={topViews.payload[1].thumb_url}
                  alt='top2-comic'
                  width={300}
                  height={300}
                  quality={100}
                  className='rounded-2xl w-[300px] h-[300px] object-cover'
                />
                <h1 className='text-2xl font-bold text-center mt-6 max-w-[300px]'>{topViews.payload[1].name}</h1>
              </Link>
              <Link href={`/comics/${topViews.payload[3].slug}`} className='flex flex-col items-center'>
                <Image src='/top3.png' alt='top3' width={100} height={100} quality={100} />
                <h1 className='text-2xl font-bold text-center'>{topViews.payload[2].totalViews} Views</h1>
                <Image
                  src={topViews.payload[2].thumb_url}
                  alt='top3-comic'
                  width={300}
                  height={300}
                  quality={100}
                  className='rounded-2xl w-[300px] h-[300px] object-cover'
                />
                <h1 className='text-2xl font-bold text-center mt-6 max-w-[300px]'>{topViews.payload[2].name}</h1>
              </Link>
            </div>
            <div className='flex flex-col gap-6 mt-10'>
              {topViews.payload.slice(3).map((comic, index) => (
                <Link href={`/comics/${comic.slug}`} key={comic.id} className='flex items-center gap-4'>
                  <div className='text-5xl font-bold text-center w-[100px] h-[100px] rounded-xl shadow border flex flex-col items-center justify-center'>
                    <p>{index + 4}</p>
                    <h1 className='text-xl font-bold text-center'>{comic.totalViews} Views</h1>
                  </div>
                  <Image
                    src={comic.thumb_url}
                    alt='top10-comic'
                    width={100}
                    height={100}
                    className='rounded-xl w-[100px] h-[100px] object-cover'
                  />
                  <h1 className='text-2xl font-bold flex-1'>{comic.name}</h1>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value='user'>
            <div className='flex flex-col md:flex-row gap-6 justify-center'>
              <div className='flex flex-col items-center'>
                <Image src='/top1.png' alt='top1' width={100} height={100} quality={100} />
                <Avatar className='w-[300px] h-[300px] select-none'>
                  <AvatarImage src={topUsers.payload[0].avatar} />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                <h1 className='text-2xl font-bold text-center mt-6 max-w-[300px]'>{topUsers.payload[0].name}</h1>
                <h1 className='text-lg text-center mt-2 text-muted-foreground'>
                  {topUsers.payload[0].progress.levelName} - {topUsers.payload[0].progress.points} points
                </h1>
              </div>
              <div className='flex flex-col items-center md:-order-1'>
                <Image src='/top2.png' alt='top2' width={100} height={100} quality={100} />
                <Avatar className='w-[300px] h-[300px] select-none'>
                  <AvatarImage src={topUsers.payload[1].avatar} />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                <h1 className='text-2xl font-bold text-center mt-6 max-w-[300px]'>{topUsers.payload[1].name}</h1>
                <h1 className='text-lg text-center mt-2 text-muted-foreground'>
                  {topUsers.payload[1].progress.levelName} - {topUsers.payload[1].progress.points} points
                </h1>
              </div>
              <div className='flex flex-col items-center'>
                <Image src='/top3.png' alt='top3' width={100} height={100} quality={100} />
                <Avatar className='w-[300px] h-[300px] select-none'>
                  <AvatarImage src={topUsers.payload[2].avatar} />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                <h1 className='text-2xl font-bold text-center mt-6 max-w-[300px]'>{topUsers.payload[2].name}</h1>
                <h1 className='text-lg text-center mt-2 text-muted-foreground'>
                  {topUsers.payload[2].progress.levelName} - {topUsers.payload[2].progress.points} points
                </h1>
              </div>
            </div>
            <div className='flex flex-col gap-6 mt-10'>
              {topUsers.payload.slice(3).map((user, index) => (
                <div key={user.id} className='flex items-center gap-4'>
                  <div className='text-3xl font-bold text-center w-[100px] h-[100px] rounded-xl shadow border flex flex-col items-center justify-center'>
                    <p>{index + 4}</p>
                    <h1 className='text-base font-bold text-center'>{user.progress.levelName}</h1>
                    <h1 className='text-sm text-center'>{user.progress.points} points</h1>
                  </div>
                  <Avatar className=' w-[100px] h-[100px] select-none'>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>UA</AvatarFallback>
                  </Avatar>
                  <h1 className='text-2xl font-bold flex-1'>{user.name}</h1>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default RanksPage
