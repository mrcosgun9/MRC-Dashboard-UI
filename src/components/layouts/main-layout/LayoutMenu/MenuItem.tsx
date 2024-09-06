"use client"
import { MenuItemType } from '@/types/NavbarTypes'
import { Button, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { twMerge } from 'tailwind-merge';

const MenuItem = ({ item, minimalMenu }: { item: MenuItemType, minimalMenu: boolean }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const tooltipContent = <div className='py-1'>
    {
      item.childs ? item.childs?.map((x, i) => {
        return <Button key={i} className='w-full flex justify-start' variant='light' onClick={() => { x.href ? x.href : '#' }}>
          <div className='flex align-middle items-center justify-start'>
            <div className='font-semibold text-sm'>{x.title}</div>
          </div>
        </Button>
      }) : <div className='font-semibold'>
        {item.title}
      </div>
    }
  </div>;
  useEffect(() => {
    if (contentRef.current) {
      if (showMenu) {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.height = '0px';
      }
    }
  }, [showMenu]);
  useEffect(() => {
    if (minimalMenu) {
      setShowMenu(false);
    }
  }, [minimalMenu])
  const menuEvent = () => {
    if (!minimalMenu && item.childs) {
      setShowMenu(!showMenu);
    }
    else {
      item.href && router.push(item.href);
    }
  }
  return (
    <div>
      <Tooltip
        placement='right-start'
        isDisabled={!minimalMenu}
        content={
          tooltipContent
        }
      >
        <Button className='w-full flex align-middle items-center justify-start p-2 rounded-lg' isIconOnly={minimalMenu} variant='light' onClick={() => { menuEvent() }}>
          <div className='flex align-middle items-center justify-start w-full'>
            <div className='w-7'>{item.icon}</div>
            <div className='font-semibold text-sm'>
              {!minimalMenu && item.title}
            </div>
          </div>
          <div>
            {(item.childs && !minimalMenu) && <MdOutlineKeyboardArrowDown className={twMerge('transition-all', (showMenu ? 'rotate-0' : 'rotate-180'))} />}
          </div>
        </Button>
      </Tooltip>
      <div
        ref={contentRef}
        className='overflow-hidden transition-height duration-300 ease-in-out'
        style={{ height: '0px' }}
      >
        {
          showMenu && item.childs?.map((x, i) => {
            return <Button href={x.href ? x.href : '#'} key={i} size='sm' variant='light' className='w-full flex align-middle items-center justify-start mb-1'>
              <div className='flex align-middle items-center justify-start w-full'>
                <div className='w-7'></div>
                <div className='font-semibold text-sm'>{x.title}</div>
              </div>
            </Button>
          })
        }
      </div>
    </div>
  )
}

export default MenuItem