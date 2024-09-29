import { useAppContext } from '@/context/app-context';
import { Button, NavbarItem } from '@nextui-org/react'
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import UserDropDownMenu from './UserDropDownMenu';

const UserMenu = () => {
  const { data: session, status } = useSession();
  const { loginOnModal, registerOnModal } = useAppContext();

  if (status == "loading") {
    <>Loading..</>
  }
  else if (status == 'authenticated') {
    return <>
      <UserDropDownMenu />
    </>
  }
  else if (status == "unauthenticated")
    return (
      <>
        <NavbarItem>
          <Button onPress={registerOnModal} variant="shadow" color='secondary' size='sm'   >
            Kayıt Ol
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button onPress={loginOnModal} variant="shadow" color='secondary' size='sm'>Giriş Yap</Button>
        </NavbarItem>
      </>
    )
  else {
    return <>Loading..</>
  }
}

export default UserMenu