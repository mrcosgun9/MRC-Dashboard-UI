"use client"
import { ThemeSwitcher } from '@/components/elements/ThemeSwitcher';
import UserMenu from '@/components/elements/UserMenu';
import React from 'react'
import { IoSettingsOutline } from 'react-icons/io5';
import NavbarMenuList from './NavbarMenuList';
import NavbarMobile from './NavbarMobile';


const Navbar = () => {
  return (
    <header className='w-full bg-white dark:bg-gray-800'>
      <div className='w-full py-2 border-b border-gray-100 dark:border-gray-800'>
        <div className='container flex justify-between align-middle items-center'>
          <div className='flex align-middle items-center justify-center gap-3'>
            <div className='font-extrabold'>LOGO</div>
            <NavbarMobile/>
          </div>
          <div className='flex justify-end align-middle items-center gap-4'>
            <div>
              <ThemeSwitcher />
            </div>
            <div>
              <UserMenu />
            </div>
            <div>
              <IoSettingsOutline size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full border-b-2 border-gray-100 dark:border-gray-800 hidden lg:block'>
        <NavbarMenuList  />
      </div>
    </header>
  )
}

export default Navbar