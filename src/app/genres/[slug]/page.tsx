import comicApiRequest from '@/apiRequests/comic'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'
import { renderPages } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { ComicItem, ComicListTitle, ComicListWrap } from '@/components/ui/comic'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Genres',
}

const Genres = async ({ params, searchParams }: { params: { slug: string }; searchParams: { page: string } }) => {
  const page = (searchParams.page && parseInt(searchParams.page)) || 1
  const comics = await comicApiRequest.getComicsByCategory(params.slug, 18, page)
  const { totalPages } = comics.payload
  const displayPages = renderPages(page, totalPages)
  const categories = await comicApiRequest.getCategories()
  const category = categories.payload.results.find((category) => category.slug === params.slug)
  return (
    <div className='p-6 md:p-10'>
      <div className='flex flex-row flex-wrap gap-2'>
        {categories.payload.results.map((category) => (
          <Link key={category.id} href={`/genres/${category.slug}`}>
            <Badge
              variant={params.slug === category.slug ? 'destructive' : 'default'}
              className='font-medium text-base'>
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
      <Separator className='my-6 md:my-10' />
      <div className='max-w-[1460px] mx-auto'>
        <ComicListTitle>{category?.name}</ComicListTitle>
        <ComicListWrap className='w-full'>
          {comics.payload.results.map((comic) => (
            <ComicItem key={comic.id} {...comic} />
          ))}
        </ComicListWrap>
        {totalPages > 1 && (
          <Pagination className='mt-10'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={`/genres/${params.slug}?page=${page - 1}`} disabled={page <= 1} />
              </PaginationItem>
              {totalPages > 5 && page > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {displayPages.map((item, index) => (
                <PaginationItem key={index}>
                  <PaginationLink isActive={item === page} href={`/genres/${params.slug}?page=${item}`}>
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {totalPages > 5 && page < totalPages - 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext href={`/genres/${params.slug}?page=${page + 1}`} disabled={page >= totalPages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}

export default Genres
