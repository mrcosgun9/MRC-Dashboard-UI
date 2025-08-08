"use client"
import { GenderType } from '@/services/actions/auth/type'
import { GetChatByIdResponse, GetChatByIdUserResponse } from '@/services/actions/chat/type'
import { Avatar, Button, Input, Textarea, Tooltip } from '@nextui-org/react'
import React from 'react'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { BsCalendarDate } from 'react-icons/bs'
import { FaTransgender, FaUser } from 'react-icons/fa6'
import { MdQuestionMark } from 'react-icons/md'
import { PiCoinsDuotone } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import { useForm } from 'react-hook-form'
import { UserChatInformation } from '@prisma/client'
import { UpsertUserChatInformation } from '@/actions/messageAction'
import toast from 'react-hot-toast'

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
  return null;
}


const ChatProfileInformation = ({ user, isLeft = false, chatData }: { user: GetChatByIdUserResponse | null, isLeft?: boolean, chatData: GetChatByIdResponse }) => {
  const defaultFormData = chatData.chat.UserChatInformation?.find(x => x.UserId == user?.Id)
  const { register, handleSubmit, setValue, watch } = useForm<UserChatInformation>(
    {
      defaultValues: defaultFormData ?? {
        Birthday: '',
        ChatId: 0,
        City: '',
        Hobbies: '',
        Infos: '',
        Profession: '',
        Relationship: '',
        UserId: 0,
        FullName: '', // Add FullName to default values
      }
    });

  const onSubmit = (data: UserChatInformation) => {

    data.UserId = user?.Id ?? 0;
    data.ChatId = chatData.chat.Id ?? 0;


    // Güncellenen verileri burada işleyebilirsiniz
    UpsertUserChatInformation(data).then((res) => {
      toast.success("Profil erfolgreich aktualisiert");
    }).catch((err) => {
      console.log(err);
      toast.error("Fehler beim Aktualisieren des Profils");
    });

  };

  return (
    <div className='w-3/12 bg-white rounded shadow p-5'>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className={twMerge('flex gap-3 align-middle items-center', (isLeft && 'flex-row-reverse'))}>
          <div className='w-14'>
            <Avatar src={user?.ProfileImage ?? ""} radius='sm' className="w-14 h-14 text-large" isBordered color='primary' />
          </div>
          <div className='w-full'>
            <div className={twMerge('flex justify-between align-middle items-center w-full', (isLeft && 'flex-row-reverse'))}>
              {user?.FullName} {user && <GetGenderIcon gender={user?.Gender} />}
            </div>
            <div className={twMerge('text-xs flex align-middle items-center justify-start gap-1', (isLeft && 'justify-end'))}>
              <BsCalendarDate className='text-purple-800' />
              {Number(new Date().getFullYear()) - Number(user?.BirthYear)} Jahre ({user?.BirthYear}-{user?.BirthMonth}-{user?.BirthMonth})
            </div>
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
        <Input
          type="name"
          label="Name"
          labelPlacement="outside-left"
          placeholder="Name"
          size='sm'
          {...register('FullName')}
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
          {...register('Relationship')}
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
          {...register('Birthday')}
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
          {...register('City')}
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
          {...register('Profession')}
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
          {...register('Hobbies')}
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

          labelPlacement="outside"
          size='sm'
          className="w-full h-min"
          {...register('Infos')}
        />
        <Button type="submit" color="primary" size="sm" className="mt-2 self-end">Save</Button>
      </form>
    </div>
  )
}

export default ChatProfileInformation