import React from 'react'
const AllUserListItem=({title,count}:{title:string,count:string})=>{
  return (
    <div className='flex align-middle items-center justify-between w-full bg-white dark:bg-slate-600 p-4 rounded shadow'>
        <div>{title}</div>
        <div>{count}</div>
      </div>
  )
}

const AllUserListCount = () => {
  return (
    <div className='flex gap-4 align-middle items-center w-full'>
      <AllUserListItem count='986' title='Total'/>
      <AllUserListItem count='89' title='Real'/>
      <AllUserListItem count='23' title='Fake'/>
      <AllUserListItem count='986' title='Premium'/>
      <AllUserListItem count='986' title='Online'/>
      <AllUserListItem count='986' title='Verified'/>
      
    </div>
  )
}

export default AllUserListCount