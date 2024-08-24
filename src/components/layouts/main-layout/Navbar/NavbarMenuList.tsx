import React from 'react'
import NavbarMenuItem from './NavbarMenuItem'
 import { menuItems } from '@/constants/NavbarMenu'
const NavbarMenuList = ( ) => {
  return (
    <div className='container flex justify-start'>
      {
        menuItems.map((x, i) => {
          return (
            <NavbarMenuItem item={x} key={i} />
          )
        })
      }
    </div>
  )
}

export default NavbarMenuList