"use client"
import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ChatInformationItem from './ChatInformationItem'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import ChatNoteModal from './ChatNoteModal';
import { GetChatByIdResponse } from '@/services/actions/chat/type';
import moment from 'moment';


const ChatInformationList = ({ chatResponse }: { chatResponse: GetChatByIdResponse }) => {
  const [textColor, setTextColor] = useState<'text-green-600' | 'text-yellow-600' | 'text-red-600' | 'text-gray-600'>('text-gray-600');
  const [asaText, setAsaText] = useState<'1' | '2' | '3'>('1');
  const { RecipientUser, SenderUser, chat } = chatResponse;
  const [chatNotes, setChatNotes] = useState(chat.ChatNote);
  const [isListShow, setIsListShow] = useState(false);
  useEffect(() => {
    const createdDate = moment(chat.CreatedAt, 'D.M.YYYY HH:mm:ss'); // Gelen tarihi parse ediyoruz
    const currentDate = moment(); // Şimdiki zaman
    const diffDays = currentDate.diff(createdDate, 'days'); // Gün farkını hesaplıyoruz
    const diffHours = currentDate.diff(createdDate, 'hours');
    if (diffDays > 30) {
      setTextColor('text-red-600');
    } else if (diffDays > 20) {
      setTextColor('text-yellow-600');
    } else if (diffDays > 10) {
      setTextColor('text-green-600');
    }
    if (diffHours > 48) {
      setAsaText('3'); // 48 saatten fazla -> Mor
    } else if (diffHours > 24) {
      setAsaText('2'); // 24 saatten fazla -> Kırmızı
    } else if (diffHours > 8) {
      setAsaText('1'); // 8 saatten fazla -> Yeşil
    }
  }, [chat.CreatedAt]);
  const fakeUserId = RecipientUser?.UserType == 4 ? RecipientUser.Id : SenderUser?.Id;
  const userId = RecipientUser?.UserType != 4 ? RecipientUser?.Id : SenderUser?.Id;
  return (
    <div>
      <div className='flex justify-between align-middle items-center mb-2'>
        <div className='flex align-middle items-center justify-start gap-2'>
          <div className='flex align-middle items-center justify-start gap-3 cursor-pointer' onClick={() => setIsListShow(!isListShow)}>
            Chat Information {isListShow ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
          </div>
          <ChatNoteModal chatId={chat?.Id} userId={userId} fakeUserId={fakeUserId} chatNotes={chatNotes} setChatNotes={setChatNotes} />
        </div>
        <div className='flex justify-end align-middle items-center gap-3'>
          <Button color='secondary' size='sm' variant='flat'>
            ASA Dialog {asaText}
          </Button>
          <div className={twMerge('text-sm')}>
            Erstkontakt: <span className={textColor}>{moment(chat.CreatedAt).format('MMMM DD YYYY, h:mm:ss a')}</span>
          </div>
        </div>
      </div>
      <div className={twMerge('bg-white rounded-md shadow-md mb-4 px-4 py-5 overflow-y-auto', (isListShow ? 'max-h-full' : 'max-h-28'))}>
        <div className='grid grid-cols-2 align-middle items-center justify-between gap-3 w-full h-full'>
          {chatNotes?.map((x, i) => {
            return <ChatInformationItem item={x} isLeft={x.UserId == userId} key={i} chatNotes={chatNotes} setChatNotes={setChatNotes} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ChatInformationList