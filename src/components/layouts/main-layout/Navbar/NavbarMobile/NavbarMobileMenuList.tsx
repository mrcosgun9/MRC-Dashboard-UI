import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { BiHome } from 'react-icons/bi'
import { FaRegCircle } from 'react-icons/fa6'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import NavbarMobileMenuItem from './NavbarMobileMenuItem'
import { menuItems } from '@/constants/NavbarMenu'
import { twMerge } from 'tailwind-merge'

const NavbarMobileMenuList = ({ showMenu, setShowMenu }: { showMenu: boolean, setShowMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);
  return (
    <>
      {showMenu && <div className='fixed top-0 left-0 z-50 w-full h-screen bg-black/10 backdrop-blur-sm'></div>}
      <div ref={ref} className={twMerge(
        'absolute w-[260px] top-0 h-screen z-[999999999] bg-slate-50 dark:bg-gray-800 shadow-sm px-4 py-5 transition-all ease-in-out duration-300',
        (showMenu ? 'left-0' : '-left-full'))}>
        {
          menuItems.map((x, i) => {
            return (
              <NavbarMobileMenuItem item={x} key={i} />
            )
          })
        }
      </div>
    </>
  )
}

export default NavbarMobileMenuList