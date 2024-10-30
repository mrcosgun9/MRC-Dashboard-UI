import { GetMessageByChatIdResponses } from '@/services/actions/messages/type'
import { Avatar } from '@nextui-org/react'
import moment from 'moment'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const ChatItem = ({ chatItem, isLeft }: { chatItem: GetMessageByChatIdResponses, isLeft: boolean }) => {
  return (
    <div className={twMerge('flex w-full gap-2 align-middle items-center', (isLeft && 'justify-start flex-row-reverse'))}>
      <div>
        <Avatar src={chatItem?.sender?.profileImage} radius='full' className="w-6 h-6 text-large" isBordered />
      </div>
      <div className='max-w-[70%]'>
        <div className={twMerge('flex w-full gap-2 text-[9px]', (isLeft && 'justify-start'))}>
          <div>{moment(chatItem.createdAt).format('MMMM DD YYYY, h:mm:ss a')}</div><div>{`${chatItem.moderatorUser?.fullName ?? ""}`}</div>
        </div>
        <div className={twMerge('w-full border border-gray-200 px-3 py-2 text-sm rounded-xl', (isLeft ? 'rounded-tr-none text-right' : 'rounded-tl-none'))}>
          {chatItem.content}
        </div>
      </div>
    </div>
  )
}

export default ChatItem