"use client"
import { GenderType } from '@/services/actions/auth/type'
import { GetChatByIdUserResponse, User } from '@/services/actions/chat/type'
import { Avatar, Button, Input, Textarea, Tooltip } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { BsCalendarDate } from 'react-icons/bs'
import { FaTransgender, FaUser } from 'react-icons/fa6'
import { MdQuestionMark } from 'react-icons/md'
import { PiCoinsDuotone } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

const GetGenderIcon = ({ gender }: { gender: number | null }) => {
  if (gender == GenderType.Unknown) {
    return <Tooltip content="Gender Unknown"><Button size='sm' variant='light' isIconOnly><MdQuestionMark className='text-gray-700' size={24} /></Button></Tooltip>;
  }
  else if (gender == GenderType.Male) {
    return <AiOutlineMan className='text-blue-700' size={24} />;
  }
  else if (gender == GenderType.Woman) {
    return <AiOutlineWoman className='text-pink-700' size={24} />;
  }
  else if (gender == GenderType.Trans) {
    return <FaTransgender className='text-purple-700' size={24} />;
  }
  else if (gender == GenderType.Other) {
    return <FaUser className='text-gray-700' size={24} />;
  }
}
const ChatProfileInformation = ({ user, isLeft = false }: { user: GetChatByIdUserResponse | null, isLeft?: boolean }) => {

  return (
    <div className='w-3/12 bg-white rounded shadow p-5'>
      <div className={twMerge('flex gap-3 align-middle items-center', (isLeft && 'flex-row-reverse'))}>
        <div className='w-14'>
          <Avatar src={user?.ProfileImage ?? ""} radius='sm' className="w-14 h-14 text-large" isBordered color='primary' />
        </div>
        <div className='w-full'>
          <div className={twMerge('flex justify-between align-middle items-center w-full', (isLeft && 'flex-row-reverse'))}>
            {user?.UserName} {user && <GetGenderIcon gender={user?.Gender} />}
          </div>
          <div className={twMerge('text-xs flex align-middle items-center justify-start gap-1', (isLeft && 'justify-end'))}>
            <BsCalendarDate className='text-purple-800' />
            {Number(new Date().getFullYear()) - Number(user?.BirthYear)} Jahre ({user?.BirthYear}-{user?.BirthMonth}-{user?.BirthMonth})</div>
        </div>
      </div>
      {
        user?.UserType == 0 && <div className='flex justify-start my-3 py-1 px-3 rounded-full border border-yellow-400 align-middle items-center gap-2 bg-yellow-100'>
          <div><PiCoinsDuotone size={20} className='text-yellow-600' /></div>
          <div className='text-xs font-bold'>10 oder mehr Nachrichten verbleiben</div>
        </div>
      }
      {
        user?.UserType == 4 && <div className='flex justify-end'>
          <div className='flex justify-end my-3 py-1 px-3 rounded-full border border-gray-400 align-middle items-center gap-2 bg-gray-100 w-fit'>
            <div className='text-xs font-bold'>Fake</div>
            <div><BiUser size={20} className='text-gray-600' /></div>
          </div>
        </div>
      }
      <div className='flex flex-col gap-3'>
        <Input
          type="name"
          label="Name"
          labelPlacement="outside-left"
          placeholder="Name"
          size='sm'
          value={user?.FullName}
          classNames={{
            mainWrapper: ['w-full'],
            label: ['min-w-16']
          }}
        />
        <Input
          type="beziehung"
          label="Beziehung"
          labelPlacement="outside-left"
          placeholder="Beziehung"
          size='sm'
          classNames={{
            mainWrapper: ['w-full'],
            label: ['min-w-16']
          }}
        />
        <Input
          type="geburtstag"
          label="Geburtstag"
          labelPlacement="outside-left"
          placeholder="Geburtstag"
          size='sm'
          classNames={{
            mainWrapper: ['w-full'],
            label: ['min-w-16']
          }}
        />
        <Input
          type="stadt"
          label="Stadt"
          labelPlacement="outside-left"
          placeholder="Stadt"
          size='sm'
          classNames={{
            mainWrapper: ['w-full'],
            label: ['min-w-16']
          }}
        />
        <Input
          type="beruf"
          label="Beruf"
          labelPlacement="outside-left"
          placeholder="Beruf"
          size='sm'
          classNames={{
            mainWrapper: ['w-full'],
            label: ['min-w-16']
          }}
        />
        <Input
          type="hobbys"
          label="Hobbys"
          labelPlacement="outside-left"
          placeholder="Hobbys"
          size='sm'
          classNames={{
            mainWrapper: ['w-full'],
            label: ['min-w-16']
          }}
        />
        <div className='text-xs'>
          <b>PLZ:</b> 78462 Konstanz
        </div>
        <div className='text-xs'><b>Profil Text:</b><br />{user?.About}</div>
        <Textarea
          isRequired
          labelPlacement="outside"
          size='sm'
          className="w-full h-min"
          value={``}
        />
      </div>
    </div>
  )
}

export default ChatProfileInformation