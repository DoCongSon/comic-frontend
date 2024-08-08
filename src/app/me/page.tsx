'use client'
import { Card, CardContent } from '@/components/ui/card'
import { useAppContext } from '../app-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheckCircle2, Gem } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Me',
}

const MePage = () => {
  const [progress, setProgress] = useState(0)
  const { user } = useAppContext()

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

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
              <TabsContent value='history'>history</TabsContent>
              <TabsContent value='like'>like</TabsContent>
              <TabsContent value='save'>save</TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MePage
