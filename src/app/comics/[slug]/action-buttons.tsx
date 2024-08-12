'use client'

import userApiRequest from '@/apiRequests/user'
import { useAppContext } from '@/app/app-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  ReaderIcon,
  HeartFilledIcon,
  HeartIcon,
  Share1Icon,
  BookmarkIcon,
  BookmarkFilledIcon,
} from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  className?: string
  chapterReadNowLink: string
  comicId: string
}

const ActionButtons = ({ className, chapterReadNowLink, comicId }: Props) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { user, setUser } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    setIsLiked(user?.likes.map((like) => like.id).includes(comicId) || false)
    setIsBookmarked(user?.saved.map((bookmark) => bookmark.id).includes(comicId) || false)
  }, [comicId, user])

  const handleReadNow = () => {
    router.push(chapterReadNowLink)
  }

  const handleLike = async () => {
    if (isLiked) {
      const response = await userApiRequest.deleteLike(comicId)
      setUser(response.payload)
      toast.success('Comic disliked successfully')
    } else {
      const response = await userApiRequest.addLike(comicId)
      setUser(response.payload)
      toast.success('Comic liked successfully')
    }
    router.refresh()
  }

  const handleBookmark = () => {
    if (isBookmarked) {
      userApiRequest.deleteSave(comicId).then((response) => {
        setUser(response.payload)
        toast.success('Comic removed from bookmarks')
      })
    } else {
      userApiRequest.addSave(comicId).then((response) => {
        setUser(response.payload)
        toast.success('Comic added to bookmarks')
      })
    }
  }

  const handleShare = () => {
    // copy url to clipboard
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard')
  }

  return (
    <div className={cn('flex gap-4 md:gap-6', className)}>
      <Button variant={'destructive'} onClick={handleReadNow}>
        <ReaderIcon className='mr-2 h-4 w-4' /> Read now
      </Button>
      <Button variant='outline' size='icon' onClick={handleLike}>
        {isLiked ? (
          <HeartFilledIcon className='h-4 w-4 text-red-500' />
        ) : (
          <HeartIcon className='h-4 w-4 text-red-500' />
        )}
      </Button>
      <Button variant='outline' size='icon' onClick={handleBookmark}>
        {isBookmarked ? (
          <BookmarkFilledIcon className='h-4 w-4 text-yellow-500' />
        ) : (
          <BookmarkIcon className='h-4 w-4 text-yellow-500' />
        )}
      </Button>
      <Button variant='ghost' size='icon' onClick={handleShare}>
        <Share1Icon className='h-4 w-4' />
      </Button>
    </div>
  )
}

export default ActionButtons
