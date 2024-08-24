import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiHome } from 'react-icons/bi'
import { FaRegCircle } from 'react-icons/fa6'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { RiMenu2Line } from 'react-icons/ri'
import NavbarMobileMenuList from './NavbarMobileMenuList'

const NavbarMobile = () => {
  const [showMenu,setShowMenu]=useState(false)
  return (
    <div className='block lg:hidden'>
      <Button isIconOnly variant="light" onClick={()=>{setShowMenu(!showMenu)}} >
        <RiMenu2Line size={20} />
      </Button>
      <NavbarMobileMenuList showMenu={showMenu} setShowMenu={setShowMenu}/>
    </div>
  )
}

export default NavbarMobile