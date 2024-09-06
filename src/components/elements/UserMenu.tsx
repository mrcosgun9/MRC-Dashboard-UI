"use client"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

const UserMenu = () => {
  const { data: session, status } = useSession();
  const getNameFirstCharacter = () => {
    return session?.user.fullName
      .split(' ')
      .map(word => word[0])
      .join('');
  }
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div className='flex align-middle items-center gap-2 cursor-pointer'>
          <Avatar radius="lg" size="sm" isBordered name={getNameFirstCharacter()} />
          <div className='hidden lg:block text-sm font-semibold'>
            {status == "loading" ?
              <Skeleton className="h-2 w-24 rounded" /> :
              session?.user.fullName}
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">@tonyreichert</p>
        </DropdownItem>
        <DropdownItem key="settings">
          My Settings
        </DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">
          Analytics
        </DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">
          Help & Feedback
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenu