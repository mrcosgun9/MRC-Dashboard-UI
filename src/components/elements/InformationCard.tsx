import Link from 'next/link'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import { IoIosArrowRoundForward } from 'react-icons/io'

const InformationCard = () => {
  return (
    <div className='w-full border border-gray-200 dark:border-slate-500 rounded p-5 bg-white dark:bg-slate-600'>
      <div className='flex gap-2 align-middle items-center'>
        <div className='w-12 h-12 bg-indigo-600 text-white rounded-full flex align-middle items-center justify-center'>
          <BiUser size={28}/>
        </div>
        <div>
          <div className='text-sm text-gray-600 dark:text-gray-200'>Total Customers</div>
          <div className='text-lg font-bold'>1500</div>
          <Link href="#" className='text-xs text-blue-600 dark:text-blue-200 flex align-middle items-center justify-start gap-1'>
            View All<IoIosArrowRoundForward size={18} />

          </Link>
        </div>
      </div>
    </div>
  )
}

export default InformationCard