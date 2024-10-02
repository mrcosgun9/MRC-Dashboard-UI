import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import ChatInformationItem from './ChatInformationItem'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import ChatNoteModal from './ChatNoteModal';
import { GetFakeUserChatListResponse } from '@/services/actions/chat/type';

const ChatInformationList = ({chatData}:{chatData: GetFakeUserChatListResponse | undefined}) => {
  const [isListShow, setIsListShow] = useState(false);
  return (
    <div>
      <div className='flex justify-between align-middle items-center mb-2'>
        <div className='flex align-middle items-center justify-start gap-2'>
          <div className='flex align-middle items-center justify-start gap-3 cursor-pointer' onClick={() => setIsListShow(!isListShow)}>
            Chat Information {isListShow ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
          </div>
          <ChatNoteModal />
        </div>
        <div>

          <Button color='danger' size='sm' variant='flat'>
            ASA Dialog
          </Button>
        </div>
      </div>
      <div className={twMerge('bg-white rounded-md shadow-md mb-4 px-4 py-5 overflow-y-auto', (isListShow ? 'max-h-48' : 'max-h-16'))}>
        <div className='flex align-middle items-center justify-between gap-3 w-full h-full'>
          <div className='w-full flex flex-col gap-1 '>
            {chatData?.chatNotes.map((x,i)=>{
              return <ChatInformationItem key={i} />
            })}
          </div>
          <div className='w-full flex flex-col gap-1'>
            <ChatInformationItem />
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default ChatInformationList