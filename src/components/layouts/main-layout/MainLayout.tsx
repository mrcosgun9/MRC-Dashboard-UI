"use client"
import React from 'react'
import LayoutMenu from './Menu';
import { twMerge } from 'tailwind-merge';
import { useAppContext } from '@/context/AppContext';
import { ThemeSwitcher } from '@/components/elements/ThemeSwitcher';

const MainLayout = ({ children }: { children: React.ReactNode; }) => {
  const { isMinimalMenu } = useAppContext();
  return (
    <div>
      <LayoutMenu />
      <div className={twMerge("w-screen pl-60 transition-all py-10", (isMinimalMenu && 'pl-16'))}>
        <div className="w-full px-10">
          {children}
        </div>
      </div>
      <div className='fixed right-3 bottom-3'>
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default MainLayout