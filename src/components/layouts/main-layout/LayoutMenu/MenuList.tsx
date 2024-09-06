import { menuItems } from '@/constants/NavbarMenu'
import React from 'react'
import MenuItem from './MenuItem'

const MenuList = ({minimalMenu}:{minimalMenu:boolean}) => {
  return (
    <div className='h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden custom-scroll'>
      {
        menuItems.map((x, i) => {
          return (
            <MenuItem item={x} key={i} minimalMenu={minimalMenu}/>
          )
        })
      }
    </div>
  )
}

export default MenuList