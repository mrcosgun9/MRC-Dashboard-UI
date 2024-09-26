import { useAppContext } from '@/context/app-context';
import { Button, NavbarItem } from '@nextui-org/react'
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import UserDropDownMenu from './UserDropDownMenu';

const UserMenu = () => {
  const { data: session, status } = useSession();
  const { loginOnModal, registerOnModal } = useAppContext();
  useEffect(() => {
    console.log(status);

  }, [status])
  if (status == "loading") {
    <></>
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
          <Button onPress={registerOnModal} variant="shadow" className="bg-gradient-to-tr from-purple-700 to-blue-700 text-white shadow-lg font-medium" >
            Kayıt Ol
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button onPress={loginOnModal} className="bg-gradient-to-tr from-purple-700 to-blue-700 text-white shadow-lg font-medium" variant="shadow">Giriş Yap</Button>
        </NavbarItem>
      </>
    )
  else {
    return <></>
  }
}

export default UserMenu