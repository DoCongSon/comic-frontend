import comicApiRequest from '@/apiRequests/comic'
import { Button } from '@/components/ui/button'
import { ComicItem, ComicListTitle, ComicListWrap, ComicSlider, ComicCarousel } from '@/components/ui/comic'
import Link from 'next/link'

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const page = (searchParams.page && parseInt(searchParams.page)) || 1
  const comics = await comicApiRequest.getHotComics()
  const recommendedComics = await comicApiRequest.getRecommendedComics(12, page)
  const items = comics.payload.results

  return (
    <div className='max-w-[1420px] p-4 md:p-10 mx-auto'>
      <ComicSlider items={items} mode='auto-scroll' />
      <div className='mt-10'>
        <ComicListTitle>Truyện Hot 🔥🔥🔥</ComicListTitle>
        <ComicCarousel items={items} mode='auto-scroll' />
        <div className='mt-10'>
          <ComicListTitle>Truyện Đề Cử</ComicListTitle>
        </div>
        <ComicListWrap className='w-full'>
          {recommendedComics.payload.results.map((comic) => (
            <ComicItem key={comic.id} {...comic} />
          ))}
        </ComicListWrap>
      </div>
    </div>
  )
}
