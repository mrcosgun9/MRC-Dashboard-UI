import { ChatMessageItem } from '@/services/actions/chat/type'
import { GetMessageByChatIdResponses } from '@/services/actions/messages/type'
import { Avatar } from '@nextui-org/react'
import { Messages } from '@prisma/client'
import moment from 'moment'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const ChatItem = ({ chatItem, isLeft }: { chatItem: ChatMessageItem, isLeft: boolean }) => {
   return (
    <div className={twMerge('flex w-full gap-2 align-middle items-center', (isLeft && 'justify-start flex-row-reverse'))}>
      <div>
        <Avatar src={chatItem?.User_Messages_RecipientUserIdToUser?.ProfileImage ?? ""} radius='full' className="w-6 h-6 text-large" isBordered />
      </div>
      <div className='max-w-[70%]'>
        <div className={twMerge('flex w-full gap-2 text-[9px]', (isLeft && 'justify-start'))}>
          <div>{moment(chatItem.CreatedAt).format('MMMM DD YYYY, h:mm:ss a')}</div>
          <div>{`${chatItem.User_Messages_ModeratorIdToUser?.FullName ?? ""}`}</div>
        </div>
        <div className={twMerge('w-full border border-gray-200 px-3 py-2 text-sm rounded-xl', (isLeft ? 'rounded-tr-none text-right' : 'rounded-tl-none'))}>
          {chatItem.Content}
        </div>
      </div>
    </div>
  )
}

export default ChatItem