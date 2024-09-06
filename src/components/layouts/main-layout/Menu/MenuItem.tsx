"use client"
import { MenuItemType } from '@/types/NavbarTypes'
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { twMerge } from 'tailwind-merge';

const MenuItem = ({ item }: { item: MenuItemType }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      if (showMenu) {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.height = '0px';
      }
    }
  }, [showMenu]);
  const menuEvent = () => {
    if (item.childs) {
      setShowMenu(!showMenu);
    }
    else {
      item.href && router.push(item.href);
    }
  }
  return (
    <div>
      <Button className='w-full flex align-middle items-center justify-start p-2 rounded-lg' variant='light' onClick={() => { menuEvent() }}>
        <div className='flex align-middle items-center justify-start w-full'>
          <div className='w-7'>{item.icon}</div>
          <div className='font-semibold text-sm'>{item.title}</div>
        </div>
        <div>
          {item.childs && <MdOutlineKeyboardArrowDown className={twMerge('transition-all', (showMenu ? 'rotate-0' : 'rotate-180'))} />}
        </div>
      </Button>
      <div
        ref={contentRef}
        className='overflow-hidden transition-height duration-300 ease-in-out'
        style={{ height: '0px' }}
      >
        {
          showMenu && item.childs?.map((x, i) => {
            return <div key={i} className='w-full flex align-middle items-center justify-start p-2 rounded-lg'>
              <Link href={x.href ? x.href : '#'} className='flex align-middle items-center justify-start'>
                <div className='w-7'></div>
                <div className='font-semibold text-sm'>{x.title}</div>
              </Link>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default MenuItem