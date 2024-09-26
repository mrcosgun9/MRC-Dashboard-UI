"use client"
import UserMenu from '@/components/elements/UserMenu'
import { Button } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { RiMenuFoldFill } from 'react-icons/ri'
import MenuList from './MenuList'
import { twMerge } from 'tailwind-merge'
import { useAppContext } from '@/context/app-context'

const LayoutMenu = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { isMinimalMenu, setIsMinimalMenu } = useAppContext();
  const className = !isMobile ? 'w-60 h-screen fixed top-0 left-0 bg-white dark:bg-gray-800 p-4 pr-1 transition-all ease-in-out' : 'w-full h-full';
  useEffect(() => {
    isMobile && setIsMinimalMenu(false)
  }, [isMobile])
  return (
    <div className={twMerge(className, (isMinimalMenu ? 'w-16' : 'w-60'))}>
      <div className={twMerge("flex align-middle items-center justify-between", (isMinimalMenu && 'justify-center'))}>
        <div className="text-2xl font-extrabold">
          {isMinimalMenu ? <Button isIconOnly className='text-2xl font-extrabold' variant='light' onClick={() => { setIsMinimalMenu(!isMinimalMenu) }}>
            L
          </Button> : 'LOGO'}
        </div>
        <div>
          {(!isMinimalMenu && !isMobile) && <Button isIconOnly size="sm" variant='light' color='primary' onClick={() => { setIsMinimalMenu(!isMinimalMenu) }} >
            <RiMenuFoldFill size={18} />
          </Button>}
        </div>
      </div>
      <div className='w-full mt-4 flex flex-col gap-1'>
        <MenuList minimalMenu={isMinimalMenu} />
      </div>
      <div className='w-full absolute bottom-0 left-0 p-4'>
        {
          !isMobile && <UserMenu />
        }
      </div>
    </div>
  )
}

export default LayoutMenu