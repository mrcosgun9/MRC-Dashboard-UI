"use client"
import React from 'react'
import LayoutMenu from './LayoutMenu';
import { twMerge } from 'tailwind-merge';
import { useAppContext } from '@/context/AppContext';
import { ThemeSwitcher } from '@/components/elements/ThemeSwitcher';
import Navbar from './Navbar';

const MainLayout = ({ children }: { children: React.ReactNode; }) => {
  const { isMinimalMenu } = useAppContext();
  return (
    <div>
      <div className='block lg:hidden'>
        <Navbar />
      </div>
      <div className='hidden lg:block bg-red-400 px-5'>
        <LayoutMenu />
      </div>
      <div className={twMerge("w-screen lg:pl-60 transition-all py-10", (isMinimalMenu && 'lg:pl-16'))}>
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