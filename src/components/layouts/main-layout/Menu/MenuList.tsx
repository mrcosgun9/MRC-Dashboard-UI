import { menuItems } from '@/constants/NavbarMenu'
import React from 'react'
import MenuItem from './MenuItem'

const MenuList = () => {
  return (
    <div>
      {
        menuItems.map((x, i) => {
          return (
            <MenuItem item={x} key={i} />
          )
        })
      }
    </div>
  )
}

export default MenuList