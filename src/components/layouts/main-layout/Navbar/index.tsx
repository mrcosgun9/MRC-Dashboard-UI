"use client"
import UserMenu from '@/components/elements/UserMenu';
import { User } from '@nextui-org/react';
import React from 'react'
import { IoSettingsOutline } from 'react-icons/io5';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <header className='w-full'>
      <div className='w-full py-4'>
        <div className='container flex justify-between align-middle items-center'>
          <div className='flex align-middle items-center justify-center'>
            <div className='font-extrabold'>LOGO</div>
          </div>
          <div className='flex justify-end align-middle items-center gap-4'>
            <div>
              <UserMenu/>
            </div>
            <div>
              <IoSettingsOutline size={24} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar