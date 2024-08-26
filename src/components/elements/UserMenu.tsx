"use client"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

const UserMenu = () => {
  const { data: session, status } = useSession();
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div className='flex align-middle items-center gap-2 cursor-pointer'>
          <Avatar radius="lg" size="sm" isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <div className='hidden lg:block'>
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
        <DropdownItem key="logout" color="danger" onClick={()=> signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenu