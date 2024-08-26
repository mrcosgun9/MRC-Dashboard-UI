import React from 'react'
import { FaRegCircle } from 'react-icons/fa6'
import { MdKeyboardArrowRight } from 'react-icons/md' 
import Link from 'next/link'
import { MenuItemType } from '@/types/NavbarTypes'
import { useRouter } from 'next/navigation'

const NavbarMenuItem = ({ item }: { item: MenuItemType }) => {
  return (
    <div className='relative group'>
      <div className='flex justify-start align-middle items-center gap-2 py-2 px-3 text-sm cursor-pointer' >
        <div>
          {item.icon}
        </div>
        <div className='flex align-middle items-center gap-2'>
          {item.title}
          <div>
            <MdKeyboardArrowRight className='group-hover:rotate-90 transition-all ease-in-out	' />
          </div>
        </div>
      </div>
      <div className='absolute bg-white dark:bg-gray-800 z-[99999] rounded-md shadow-lg hidden group-hover:block overflow-hidden'>
        {
          item.childs?.map((x, i) => {
            return (
              <Link className='w-full' href={x.href??''} key={i}>
                <div className='flex align-middle items-center justify-start gap-2  text-sm py-3 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 '>
                  <div>
                    <FaRegCircle size={6} />
                  </div>
                  <div className='whitespace-nowrap'>
                    {x.title}
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>

  )
}

export default NavbarMenuItem