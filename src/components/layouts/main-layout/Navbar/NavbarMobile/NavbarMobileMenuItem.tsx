import { MenuItemType } from '@/types/NavbarTypes'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiHome } from 'react-icons/bi'
import { FaRegCircle } from 'react-icons/fa6'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

const NavbarMobileMenuItem = ({ item }: { item: MenuItemType }) => {
  const [openMenuItem, setOpenMenuItem] = useState(false);
  return (
    <div className='relative' onClick={()=>{setOpenMenuItem(!openMenuItem)}}>
      <div className='flex justify-between w-full align-middle items-center rounded-md px-4 py-2 cursor-pointer'>
        <div className='flex align-middle items-center justify-start gap-3 font-medium text-slate-600 dark:text-slate-300 text-sm'>
          <div className='w-3 flex align-middle items-center justify-start'>{item.icon ? item.icon : <FaRegCircle size={6} />}</div>
          <div>{item.title}</div>
        </div>
        <div>
          {item.childs && <MdOutlineKeyboardArrowRight size={16} className={twMerge('text-slate-500 transition-all ease-in-out',openMenuItem&&'rotate-90')} />}
        </div>
      </div>
      {
        item.childs && 
        <div className={twMerge('ml-3 mb-2 transition-all ease-in-out bg-gray-100 dark:bg-gray-700 rounded-md',(openMenuItem?'h-auto':'h-0 overflow-hidden'))}>
          {item.childs.map((x, i) => {
            return (
              <Link className='w-full' href={"#"} key={i} >
                <div className='flex align-middle items-center justify-start text-xs text-slate-600 dark:text-slate-200 font-medium gap-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 rounded-lg'>
                  <div>
                    <FaRegCircle size={6} />
                  </div>
                  <div className='whitespace-nowrap'>
                    {x.title}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      }

    </div>
  )
}

export default NavbarMobileMenuItem