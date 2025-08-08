'use client';

import React from 'react'
import { useGetUserStats } from '@/hooks/useGetUserStats'
import { UserStats } from '@/services/actions/userService';

const AllUserListItem = ({ title, count }: { title: string, count: string | number }) => {
  return (
    <div className='flex align-middle items-center justify-between w-full bg-white dark:bg-slate-600 p-4 rounded shadow'>
      <div>{title}</div>
      <div  >
        {count}
      </div>
    </div>
  )
}

const AllUserListCount = ({ userStats }: { userStats: UserStats }) => {



  return (
    <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5  gap-4 align-middle items-center w-full'>

      <AllUserListItem count={userStats?.total || 0} title='Total ' />
      <AllUserListItem count={userStats?.real || 0} title='Real' />
      <AllUserListItem count={userStats?.fake || 0} title='Fake' />
      <AllUserListItem count={userStats?.premium || 0} title='Premium' />
      {/* <AllUserListItem count={userStats?.online || 0} title='Online' /> */}
      <AllUserListItem count={userStats?.verified || 0} title='Verified' />
    </div>
  )
}

export default AllUserListCount