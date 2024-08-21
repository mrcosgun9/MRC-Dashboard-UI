import React from 'react'
import NavbarMenuItem from './NavbarMenuItem'
import { MenuItemType } from '@/types/NavbarTypes'
const NavbarMenuList = ({menuList}:{menuList:MenuItemType[]}) => {
  return (
    <div className='container flex justify-start'>
      {
        menuList.map((x, i) => {
          return (
            <NavbarMenuItem item={x} key={i} />
          )
        })
      }
    </div>
  )
}

export default NavbarMenuList