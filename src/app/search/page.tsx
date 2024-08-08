import comicApiRequest from '@/apiRequests/comic'
import { ComicItem, ComicListTitle, ComicListWrap } from '@/components/ui/comic'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { renderPages } from '@/lib/utils'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

type Props = { searchParams: { q: string; page: string } }

export function generateMetadata({ searchParams }: Props, parent: ResolvingMetadata): Metadata {
  return {
    title: searchParams.q,
  }
}

const SearchPage = async ({ searchParams }: Props) => {
  const page = (searchParams.page && parseInt(searchParams.page)) || 1
  const comics = await comicApiRequest.search(searchParams.q, 18, page)
  const { totalPages } = comics.payload
  const displayPages = renderPages(page, totalPages)

  return (
    <div className='max-w-[1460px] mx-auto p-6 md:p-10'>
      <ComicListTitle>Result for: {searchParams.q}</ComicListTitle>
      <ComicListWrap className='w-full'>
        {comics.payload.results.length === 0 && (
          <p className='font-bold text-2xl text-center text-yellow-400'>No result found</p>
        )}
        {comics.payload.results.map((comic) => (
          <ComicItem key={comic.id} {...comic} />
        ))}
      </ComicListWrap>
      {totalPages > 1 && (
        <Pagination className='mt-10'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`/search?q=${searchParams.q}&page=${page - 1}`} disabled={page <= 1} />
            </PaginationItem>
            {totalPages > 5 && page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {displayPages.map((item, index) => (
              <PaginationItem key={index}>
                <PaginationLink isActive={item === page} href={`/search?q=${searchParams.q}&page=${item}`}>
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
              <PaginationNext href={`/search?q=${searchParams.q}&page=${page + 1}`} disabled={page >= totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default SearchPage
