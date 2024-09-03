import React from 'react'
import { BiX } from 'react-icons/bi'

const ChatInformationItem = () => {
  return (
    <div className='bg-blue-100 border border-blue-600 w-full text-xs flex align-middle items-start justify-between p-1 rounded'>
      <div>
        <div>ChatInformationItem</div>
        <div>BCO-038 am 01.09.2024 um 11:13:51</div>
      </div>
      <div><BiX className='text-red-600 cursor-pointer' size={20}/></div>
    </div>
  )
}

export default ChatInformationItem