'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ListBulletIcon } from '@radix-ui/react-icons'
import { cx } from 'class-variance-authority'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'

type ChapterContentProps = {
  id: string
  comic_slug: string
  chapter_list: {
    id: string
    chapter_name: string
  }[]
  chapter_images: {
    id: string
    image_file: string
    image_page: string
  }[]
  chapter_path: string
  next_chapter_id?: string
  previous_chapter_id?: string
}

const ChapterContent = ({
  id,
  comic_slug,
  chapter_images,
  chapter_path,
  chapter_list,
  next_chapter_id,
  previous_chapter_id,
}: ChapterContentProps) => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [showButtonToTop, setShowButtonToTop] = useState(false)
  const sheet = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowRight' && next_chapter_id) {
      handleNextChapter()
    }
    if (e.key === 'ArrowLeft' && previous_chapter_id) {
      handlePreviousChapter()
    }
    if (e.key === 'l' || e.key === 'L') {
      handleListChapter()
    }
    if (e.key === 't' || e.key === 'T') {
      scrollToTop()
    }
  }

  // show button to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2000) {
        setShowButtonToTop(true)
      } else {
        setShowButtonToTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // click outside to close sheet
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (sheet.current && !sheet.current.contains(e.target)) {
        setSheetOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sheet])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  const handleNextChapter = () => {
    if (next_chapter_id) {
      router.push(`/comics/${comic_slug}/chapters/${next_chapter_id}`)
    }
  }

  const handlePreviousChapter = () => {
    if (previous_chapter_id) {
      router.push(`/comics/${comic_slug}/chapters/${previous_chapter_id}`)
    }
  }

  const handleListChapter = () => {
    setSheetOpen(!sheetOpen)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className='flex gap-4 md:gap-6 mt-4 md:mt-6 items-center justify-center'>
        <Button variant={'default'} onClick={handlePreviousChapter} disabled={!previous_chapter_id}>
          <ChevronLeftIcon width={20} height={20} />
        </Button>
        <Button variant={'default'} onClick={handleListChapter}>
          <ListBulletIcon width={20} height={20} />
        </Button>
        <Button variant={'default'} onClick={handleNextChapter} disabled={!next_chapter_id}>
          <ChevronRightIcon width={20} height={20} />
        </Button>
      </div>
      <div className='mt-2'>
        <p className='text-muted-foreground text-center'>
          Press the Left, Right and List button to navigate between chapters or use the &quot;
          <span className='text-yellow-500 font-bold'>arrow keys</span>&quot; and &quot;
          <span className='text-yellow-500 font-bold'>L</span>&quot; key on your keyboard.
          <br />
          Use the &quot;<span className='text-yellow-500 font-bold'>T</span>&quot; key to scroll to top.
        </p>
      </div>
      <div className='w-full mt-4 md:mt-6 select-none'>
        {chapter_images.map((image) => (
          <Image
            key={image.id}
            src={`${chapter_path}/${image.image_file}`}
            alt={image.image_page}
            width={600}
            height={1200}
            className='w-full h-auto object-cover'
          />
        ))}
      </div>
      <div className='flex gap-4 md:gap-6 mt-4 md:mt-6 items-center justify-center'>
        <Button variant={'default'} onClick={handlePreviousChapter} disabled={!previous_chapter_id}>
          <ChevronLeftIcon width={20} height={20} />
        </Button>
        <Button variant={'default'} onClick={handleListChapter}>
          <ListBulletIcon width={20} height={20} />
        </Button>
        <Button variant={'default'} onClick={handleNextChapter} disabled={!next_chapter_id}>
          <ChevronRightIcon width={20} height={20} />
        </Button>
      </div>
      <div className='mt-2'>
        <p className='text-muted-foreground text-center'>
          Press the Left, Right and List button to navigate between chapters or use the &quot;
          <span className='text-yellow-500 font-bold'>arrow keys</span>&quot; and &quot;
          <span className='text-yellow-500 font-bold'>L</span>&quot; key on your keyboard.
          <br />
          Use the &quot;<span className='text-yellow-500 font-bold'>T</span>&quot; key to scroll to top.
        </p>
      </div>
      {showButtonToTop && (
        <Button
          variant={'default'}
          size={'icon'}
          onClick={scrollToTop}
          className='fixed bottom-4 right-4 z-50 rounded-full animate-bounce bg-primary/50 hover:bg-primary'>
          <ChevronUpIcon width={20} height={20} />
        </Button>
      )}
      <Sheet open={sheetOpen}>
        <SheetContent handleClose={() => setSheetOpen(false)} ref={sheet}>
          <SheetHeader>
            <SheetTitle>Chapter list</SheetTitle>
          </SheetHeader>
          <ScrollArea className='h-[calc(100vh_-_theme(spacing.16))] flex gap-4 py-4'>
            {chapter_list.map((chapter) => (
              <Link
                href={`/comics/${comic_slug}/chapters/${chapter.id}`}
                className={cx(
                  'transition-colors hover:bg-accent hover:text-accent-foreground p-2 rounded-lg flex',
                  chapter.id === id && 'bg-accent text-accent-foreground'
                )}
                key={chapter.id}>
                Chapter: {chapter.chapter_name}
              </Link>
            ))}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ChapterContent
