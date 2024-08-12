'use client'
import { Card, CardContent } from '@/components/ui/card'
import { useAppContext } from '../app-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheckCircle2, XCircleIcon, Gem } from 'lucide-react'
import { MouseEvent, useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import Link from 'next/link'
import { calculateLevelProgress } from '@/lib/utils'
import userApiRequest from '@/apiRequests/user'
import { toast } from 'sonner'

const MePage = () => {
  const [progress, setProgress] = useState(0)
  const { user, setUser } = useAppContext()

  useEffect(() => {
    ;(async () => {
      const response = await userApiRequest.me()
      setUser(response.payload)
    })()
  }, [setUser]) // fetch user data

  useEffect(() => {
    const progress = calculateLevelProgress(user?.progress.points || 0)
    const timer = setTimeout(() => setProgress(progress), 500)
    return () => clearTimeout(timer)
  }, [user])

  const handleDelete = (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    { type, payload }: { type: 'history' | 'like' | 'save'; payload: string }
  ) => {
    e.preventDefault()
    e.stopPropagation()
    if (type === 'history') {
      userApiRequest.deleteHistory(payload).then((response) => {
        setUser(response.payload)
        toast.success('deleted')
      })
    }
    if (type === 'like') {
      userApiRequest.deleteLike(payload).then((response) => {
        setUser(response.payload)
        toast.success('deleted')
      })
    }
    if (type === 'save') {
      userApiRequest.deleteSave(payload).then((response) => {
        setUser(response.payload)
        toast.success('deleted')
      })
    }
  }

  return (
    <div className='max-w-[1420px] h-[calc(100vh-4rem)] mx-auto p-4 md:p-10'>
      <Card>
        <CardContent className='mt-6'>
          <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            <div className='w-[300px]'>
              <Avatar className='w-full h-[300px] select-none'>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>UA</AvatarFallback>
              </Avatar>
              <h1 className='font-bold text-3xl justify-center mt-4 flex items-center gap-2'>
                {user?.name} {user?.verified && <CheckCircle2 className='text-cyan-400' />}
              </h1>
              <div className='w-full flex items-center gap-4 mt-4'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full border border-primary'>
                  <p className='font-bold text-xl'>{user?.progress.level}</p>
                </div>
                <Progress value={progress} className='flex-1' />
              </div>
              <Separator className='mt-10' />
              <div className='w-full flex flex-col gap-4 mt-6'>
                <div className='flex gap-4'>
                  <p className='font-bold text-lg'>Email:</p>
                  <p className='text-lg text-muted-foreground'>{user?.email}</p>
                </div>
                <div className='flex gap-4'>
                  <p className='font-bold text-lg'>Level:</p>
                  <p className='text-lg text-muted-foreground'>
                    {user?.progress.levelName} - {user?.progress.points} points
                  </p>
                </div>
                <div className='flex gap-4'>
                  <p className='font-bold text-lg'>Ruby:</p>
                  <p className='text-lg text-muted-foreground flex items-center gap-2'>
                    {user?.progress.ruby} <Gem className='text-rose-500' />
                  </p>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                  {user?.progress.achievements.map((achievement, index) => (
                    <Badge variant={'destructive'} key={achievement.id}>
                      {achievement.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            {/* tabs */}
            <Tabs defaultValue='history' className='flex-1'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='history'>History</TabsTrigger>
                <TabsTrigger value='like'>Like</TabsTrigger>
                <TabsTrigger value='save'>Save</TabsTrigger>
              </TabsList>
              <TabsContent value='history'>
                <div className='flex flex-wrap gap-4'>
                  {user?.history.map((item, index) => (
                    <Link key={item.id} href={`/comics/${item.comic.slug}/chapters/${item.id}`}>
                      <Card className='overflow-hidden'>
                        <CardContent className='w-[150px] h-[250px] p-0 flex flex-col relative'>
                          <Image
                            src={item.comic.thumb_url}
                            width={150}
                            height={150}
                            alt={item.comic.name}
                            className='size-[150px]'
                          />
                          <div className='flex flex-col gap-2 p-2 justify-between flex-1'>
                            <p className='text-sm leading-4'>{item.comic.name}</p>
                            <p className='text-muted-foreground font-bold'>{item.chapter_name}</p>
                          </div>
                          <XCircleIcon
                            className='absolute right-2 bottom-2 text-destructive cursor-pointer'
                            onClick={(e) => handleDelete(e, { type: 'history', payload: item.id })}
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value='like'>
                {
                  <div className='flex flex-wrap gap-4'>
                    {user?.likes.map((item, index) => (
                      <Link key={item.id} href={`/comics/${item.slug}/`}>
                        <Card className='overflow-hidden'>
                          <CardContent className='w-[150px] h-[250px] p-0 flex flex-col relative'>
                            <Image
                              src={item.thumb_url}
                              width={150}
                              height={150}
                              alt={item.name}
                              className='size-[150px]'
                            />
                            <div className='flex flex-col gap-2 p-2 justify-between flex-1'>
                              <p className='text-sm leading-4'>{item.name}</p>
                            </div>
                            <XCircleIcon
                              className='absolute right-2 bottom-2 text-destructive cursor-pointer'
                              onClick={(e) => handleDelete(e, { type: 'like', payload: item.id })}
                            />
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                }
              </TabsContent>
              <TabsContent value='save'>
                {
                  <div className='flex flex-wrap gap-4'>
                    {user?.saved.map((item, index) => (
                      <Link key={item.id} href={`/comics/${item.slug}/`}>
                        <Card className='overflow-hidden'>
                          <CardContent className='w-[150px] h-[250px] p-0 flex flex-col relative'>
                            <Image
                              src={item.thumb_url}
                              width={150}
                              height={150}
                              alt={item.name}
                              className='size-[150px]'
                            />
                            <div className='flex flex-col gap-2 p-2 justify-between flex-1'>
                              <p className='text-sm leading-4'>{item.name}</p>
                            </div>
                            <XCircleIcon
                              className='absolute right-2 bottom-2 text-destructive cursor-pointer'
                              onClick={(e) => handleDelete(e, { type: 'save', payload: item.id })}
                            />
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                }
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MePage
