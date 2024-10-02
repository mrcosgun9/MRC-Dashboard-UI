import { GetMessageByChatIdResponses } from '@/services/actions/messages/type'
import { Avatar } from '@nextui-org/react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const ChatItem = ({ chatItem, isLeft }: { chatItem: GetMessageByChatIdResponses, isLeft: boolean }) => {
 
  return (
    <div className={twMerge('flex w-full gap-2', (isLeft && 'justify-start flex-row-reverse'))}>
      <div>
        <Avatar src={chatItem?.sender?.profileImage} radius='full' className="w-6 h-6 text-large" isBordered  />
      </div>
      <div className={twMerge('max-w-[70%] border border-gray-200 px-3 py-2 text-sm rounded-xl', (isLeft ? 'rounded-tr-none' : 'rounded-tl-none'))}>
        {chatItem.content}
      </div>
    </div>
  )
}

export default ChatItem