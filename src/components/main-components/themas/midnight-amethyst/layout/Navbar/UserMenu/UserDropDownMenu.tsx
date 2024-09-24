"use client"
import { useAppContext } from '@/context/AppContext';
import useGetTenantList from '@/hooks/useGetTenantList';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Skeleton } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { BsPlusCircleDotted } from 'react-icons/bs';

const UserDropDownMenu = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { isMinimalMenu, createTenantOnModal } = useAppContext();
  const { data } = useGetTenantList();
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
          {
            data?.map((x, i) => {
              return <DropdownItem
                key={i}
                color="secondary"
                description="Mağaza yönetimi"
                onClick={() => { router.push("/dashboard?slug=" + x.domain) }}
              >
                {x.title} ({x.domain})
              </DropdownItem>
            })
          }
        </DropdownSection>
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Çıkış Yap
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
export default UserDropDownMenu