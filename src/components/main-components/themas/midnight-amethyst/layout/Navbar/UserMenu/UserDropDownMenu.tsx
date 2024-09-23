"use client"
import { useAppContext } from '@/context/AppContext';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Skeleton } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
import { BsPlusCircleDotted } from 'react-icons/bs';

const UserDropDownMenu = () => {
  const { data: session, status } = useSession();
  const { isMinimalMenu, createTenantOnModal } = useAppContext();
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
          {
            !isMinimalMenu && <div className='hidden lg:block text-sm font-semibold'>
              {status == "loading" ?
                <Skeleton className="h-2 w-24 rounded" /> :
                session?.user.fullName}
            </div>
          }
          <Avatar radius="lg" size="sm" isBordered name={getNameFirstCharacter()} />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem onClick={createTenantOnModal} key="addShopping" color='primary' className="gap-2" startContent={<BsPlusCircleDotted size={24} />}>
          <p className="font-bold"> Mağaza Oluştur</p>
        </DropdownItem>
        <DropdownSection title="Mağazalarınız">
          <DropdownItem
            key="delete"
            color="secondary"
            description="Mağaza yönetimi"
          >
            Blog Sayfam (mrcblog)
          </DropdownItem>
        </DropdownSection>
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
          Çıkış Yap
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
export default UserDropDownMenu