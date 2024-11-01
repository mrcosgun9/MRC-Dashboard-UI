"use client"
import React from 'react'
import LayoutMenu from './LayoutMenu';
import { twMerge } from 'tailwind-merge';
import { useAppContext } from '@/context/app-context';
import { ThemeSwitcher } from '@/components/elements/ThemeSwitcher';
import Navbar from './Navbar';
import { layoutExiestPages } from '@/data/data';
import { usePathname } from 'next/navigation';
const MainLayout = ({ children }: { children: React.ReactNode; }) => {
  const pathname = usePathname();
  const { isMinimalMenu } = useAppContext();
  const isLayout = layoutExiestPages.some(page => !pathname.includes(page));
  return (
    <div>
      <div className='block lg:hidden'>
        <Navbar />
      </div>
      <div className='hidden lg:block px-5'>
        {isLayout && <LayoutMenu />}
      </div>
      <div className={twMerge("w-screen transition-all", (isLayout ? (isMinimalMenu ? 'lg:pl-16 py-10' : 'lg:pl-60 py-10') : ''))}>
        <div className={twMerge("w-full", isLayout && 'px-10')}>
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