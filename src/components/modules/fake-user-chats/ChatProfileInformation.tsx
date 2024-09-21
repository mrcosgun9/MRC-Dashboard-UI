"use client"
import { User } from '@/services/actions/chat/type'
import { Avatar, Input, Textarea } from '@nextui-org/react'
import React from 'react'
import { AiOutlineMan } from 'react-icons/ai'
import { BsCalendarDate } from 'react-icons/bs'
import { PiCoinsDuotone } from 'react-icons/pi'

const ChatProfileInformation = ({user}:{user: User | undefined}) => {
  return (
    <div className='w-3/12 bg-white rounded shadow p-5'>
      <div className='flex gap-3 align-middle items-center'>
        <div className='w-14'>
          <Avatar src={user?.profileImage} radius='sm' className="w-14 h-14 text-large" isBordered color='primary' />
        </div>
        <div className='w-full'>
          <div className='flex justify-between align-middle items-center w-full'>{user?.userName}<AiOutlineMan className='text-blue-700' size={24} /></div>
          <div className='text-xs flex align-middle items-center justify-start gap-1'><BsCalendarDate className='text-purple-800' />
            69 Jahre (1955-01-01)</div>
        </div>
      </div>
      <div className='flex justify-start my-3 py-1 px-3 rounded-full border border-yellow-400 align-middle items-center gap-2 bg-yellow-100'>
        <div><PiCoinsDuotone size={20} className='text-yellow-600' /></div>
        <div className='text-xs font-bold'>10 oder mehr Nachrichten verbleiben</div>
      </div>
      <div className='flex flex-col gap-3'>
        <Input
          type="name"
          label="Name"
          labelPlacement="outside-left"
          placeholder="Name"
          size='sm'
          value={user?.fullName}
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
        <div className='text-xs'><b>Profil Text</b><br />Leben ohne Liebe ist
          mo lich aber sinnlos.
        </div>
        <Textarea
          isRequired
          labelPlacement="outside"
          size='sm'
 
          className="w-full h-min"
          value={`
            MAG NICHT SCHREIBEN,
            MACHT SICH GROSSE SORGEN
            UM SEINE FAMILIE IN LIBANON
            - hat einen festen Kreis an
            Freunden
            - hat eine grosse Familie in d.
            Heimat
            - fâhrt gerne Rad und grosse
            Spaziergange
            - letztes Date ein Janr her
            -die letzten 25 jahre in der schweiz
            gewese n
            - mag es rasiert
            -Er würde geme auf unsere Brüste
            abspritzen
            `}
        />
      </div>
    </div>
  )
}

export default ChatProfileInformation