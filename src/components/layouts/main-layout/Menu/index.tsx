"use client"
import UserMenu from '@/components/elements/UserMenu'
import { Button } from '@nextui-org/react'
import React from 'react'
import { RiMenuFoldFill } from 'react-icons/ri'
import MenuList from './MenuList'

const LayoutMenu = () => {
  return (
    <div className="w-60 h-screen fixed top-0 left-0 bg-white dark:bg-gray-800 p-4">
      <div className="flex align-middle items-center justify-between">
        <div className="text-2xl font-extrabold">LOGO</div>
        <div>
          <Button isIconOnly size="sm" variant='light' color='primary' onClick={()=>{}}>
            <RiMenuFoldFill size={18} />
          </Button>
        </div>
      </div>
      <div>
        <div className='w-full mt-4 flex flex-col gap-1'>
          {/* <div className='w-full flex align-middle items-center justify-start p-2 bg-gray-200 rounded-lg'>
            <div className='flex align-middle items-center justify-start'>
              <div className='w-7'><TbHome2 size={20} /></div>
              <div className='font-semibold text-sm'>Giriş</div>
            </div>
          </div> */}
          <MenuList />
        
        </div>
      </div>
      <div className='w-full absolute bottom-0 left-0 p-4'>
        <UserMenu />
      </div>
    </div>
  )
}

export default LayoutMenu