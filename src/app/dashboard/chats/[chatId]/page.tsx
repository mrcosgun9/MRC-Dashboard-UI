"use client"
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import ChatInformationList from '@/components/modules/fake-user-chats/ChatInformationList'
import ChatProfileInformation from '@/components/modules/fake-user-chats/ChatProfileInformation'
import useGetUsersChatById from '@/hooks/useGetUsersChatById'
import { Avatar, Textarea } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'


const ChatsPage = () => {
  const params = useParams()
  const { data, error, loading, setChatId } = useGetUsersChatById();
  useEffect(() => {
    if (params.chatId) {
      setChatId(Number(params.chatId))
    }
  }, [params])
  console.log(data);
  
  return (
    <div>
      <PageHeader title="FAKE USER CHATS" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'CHATS' },
        { title: 'FAKE USER CHATS' },
      ]} />
      <div className='w-full flex align-top items-start justify-between gap-4'>
        <ChatProfileInformation user={data?.recipientUser} />
        <div className='w-6/12'>
          <ChatInformationList />

          <div className='bg-white rounded shadow'>
            <div className='max-h-[360px] overflow-x-auto p-4'>
              <div className='flex flex-col gap-3'>
                <div className='flex w-full gap-2'>
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" radius='full' className="w-10 h-10 text-large" isBordered color='primary' />
                  <div className='w-full max-w-[70%] h-16 bg-red-500 rounded-xl rounded-tl-none'></div>
                </div>
                <div className='flex w-full gap-2'>
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" radius='full' className="w-10 h-10 text-large" isBordered color='primary' />
                  <div className='w-full max-w-[70%] h-16 bg-red-500 rounded-xl rounded-tl-none'></div>
                </div>
                <div className='flex w-full gap-2 justify-start flex-row-reverse'>
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" radius='full' className="w-10 h-10 text-large" isBordered color='primary' />
                  <div className='w-full max-w-[70%] h-16 bg-red-500 rounded-xl rounded-tr-none'></div>
                </div>
                <div className='flex w-full gap-2'>
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" radius='full' className="w-10 h-10 text-large" isBordered color='primary' />
                  <div className='w-full max-w-[70%] h-16 bg-red-500 rounded-xl rounded-tl-none'></div>
                </div>
                <div className='flex w-full gap-2 justify-start flex-row-reverse'>
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" radius='full' className="w-10 h-10 text-large" isBordered color='primary' />
                  <div className='w-full max-w-[70%] h-16 bg-red-500 rounded-xl rounded-tr-none'></div>
                </div>
                <div className='flex w-full gap-2 justify-start flex-row-reverse'>
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" radius='full' className="w-10 h-10 text-large" isBordered color='primary' />
                  <div className='w-full max-w-[70%] h-16 bg-red-500 rounded-xl rounded-tr-none'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white rounded shadow w-full mt-3'>
            <Textarea
              variant="underlined"
              placeholder="Enter your description"
            />
          </div>
        </div>
        <ChatProfileInformation user={data?.senderUser} />
      </div>
    </div>
  )
}

export default ChatsPage