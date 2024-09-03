"use client"
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import ChatInformationList from '@/components/modules/fake-user-chats/ChatInformationList'
import ChatProfileInformation from '@/components/modules/fake-user-chats/ChatProfileInformation'
import { Avatar, Badge, Button, Input } from '@nextui-org/react'
import React from 'react'
import { AiOutlineMan } from 'react-icons/ai'
import { PiCoinsDuotone } from 'react-icons/pi'

const ChatsPage = () => {
  return (
    <div>
      <PageHeader title="FAKE USER CHATS" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'CHATS' },
        { title: 'FAKE USER CHATS' },
      ]} />
      <div className='w-full flex align-top items-start justify-between gap-4'>
        <ChatProfileInformation />
        <div className='w-6/12'>
          <ChatInformationList />

          <div className='bg-white rounded shadow p-5'>

          </div>
        </div>
        <ChatProfileInformation />
      </div>
    </div>
  )
}

export default ChatsPage