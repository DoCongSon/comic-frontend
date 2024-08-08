'use client'

import React from 'react'
import Image from 'next/image'
import AutoScroll from 'embla-carousel-auto-scroll'
import { cn } from '@/lib/utils'
import { Label } from './label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { Badge } from './badge'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'
import { ComicResType } from '@/schemaValidations/comic.schema'
import { useRouter } from 'next/navigation'
import { cx } from 'class-variance-authority'
type ComicSliderProps = {
  mode?: 'auto-scroll' | 'slide' // default slide
  items: Omit<ComicResType, 'chapters'>[]
  className?: string
}

const ComicItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & Omit<ComicResType, 'chapters'>
>(({ className, name, likes, thumb_url, category, vip, id, onClick, slug, ...props }, ref) => {
  const router = useRouter()
  return (
    <div
      ref={ref}
      onClick={() => router.push(`/comics/${slug}`)}
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow w-[210px] h-[400px] inline-flex flex-col cursor-pointer overflow-hidden hover:shadow-destructive hover:shadow-md hover:border-destructive transition duration-500',
        className
      )}
      {...props}>
      <div className='w-full aspect-[3/4] overflow-hidden relative'>
        {vip && (
          <Badge
            variant='destructive'
            className='absolute top-2 right-2 z-10 text-xs leading-none py-1 hover:bg-destructive rounded-tl-3xl rounded-br-3xl'>
            vip
          </Badge>
        )}
        <Image
          src={thumb_url}
          width={180}
          height={240}
          alt={`image-${name}`}
          className='w-full h-full object-cover hover:scale-110 transition duration-500'
        />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label className='px-4 my-4 truncate cursor-pointer'>{name}</Label>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Label className='mx-4 mb-4 truncate flex cursor-pointer'>
        <HeartFilledIcon />
        <span className='ml-1'>{likes}</span>
      </Label>
      {category && (
        <div className='flex h-5 gap-1 mx-4 mb-4 overflow-hidden flex-wrap'>
          {category.map((item) => (
            <Badge variant='secondary' key={item.id} className='text-[8px] p-0.5'>
              {item.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
})
ComicItem.displayName = 'ComicItem'

const ComicListWrap = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap justify-center gap-4 items-start content-start', className)}
      {...props}
    />
  )
)
ComicListWrap.displayName = 'ComicListWrap'

const ComicSlider = React.forwardRef<HTMLDivElement, ComicSliderProps>(({ mode, items, className }, ref) => {
  const router = useRouter()
  return (
    <Carousel
      ref={ref}
      className={cx('w-full', className)}
      opts={{ loop: true }}
      plugins={
        mode === 'auto-scroll' ? [AutoScroll({ stopOnInteraction: false, stopOnMouseEnter: true, speed: 1 })] : []
      }>
      <CarouselContent className='-ml-2 md:-ml-4 p-1'>
        {items.map((item, index) => (
          <CarouselItem
            onClick={() => router.push(`/comics/${item.slug}`)}
            key={index}
            className='w-[210px] lg:w-[250px] xl:w-[300px] pl-2 md:pl-4 cursor-pointer'>
            <div className='w-full aspect-[3/4] overflow-hidden rounded-xl shadow relative'>
              <Image
                src={item.thumb_url}
                width={210}
                height={270}
                alt={`image-${item.name}`}
                className='w-full h-full object-cover'
              />
              <div className='absolute bottom-0 right-0 left-0 bg-gradient-to-t from-destructive to-transparent h-14 px-4 overflow-hidden '>
                <p className='mt-6 truncate font-bold text-yellow-400 md:text-lg'>{item.name}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
})
ComicSlider.displayName = 'ComicSlider'

const ComicCarousel = React.forwardRef<HTMLDivElement, ComicSliderProps>(({ mode, items }, ref) => {
  const router = useRouter()
  return (
    <Carousel ref={ref} className='w-full' opts={{ loop: true, dragFree: true }}>
      <CarouselContent className='-ml-2 md:-ml-4 p-2'>
        {items.map((item, index) => (
          <CarouselItem
            onClick={() => router.push(`/comics/${item.slug}`)}
            key={index}
            className='w-[226px] md:w[242px] pl-2 md:pl-4 cursor-pointer'>
            <ComicItem {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className='hidden md:flex' />
      <CarouselPrevious className='hidden md:flex' />
    </Carousel>
  )
})
ComicCarousel.displayName = 'ComicCarousel'

const ComicListTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2 mb-6', className)} {...props}>
      <div className='w-4 h-10 bg-gradient-to-t from-destructive to-yellow-400 rounded shadow'></div>
      <Label className='text-2xl font-bold text-destructive '>{children}</Label>
    </div>
  )
)
ComicListTitle.displayName = 'ComicListTitle'

export { ComicItem, ComicListWrap, ComicSlider, ComicListTitle, ComicCarousel }
