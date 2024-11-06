import { Button } from '@nextui-org/react'
import React from 'react'
import { MdDelete } from 'react-icons/md'

const ComponentItem = ({ item, setEditComponent }: { item: any, setEditComponent: React.Dispatch<React.SetStateAction<any[]>> }) => {
  console.log(item);

  return (
    <>
      <div className='border border-gray-300 border-dashed px-3 py-2 rounded bg-white flex justify-between align-middle items-center cursor-pointer transition-all hover:border-solid hover:border-blue-400'
        onClick={() => {
          setEditComponent(item)
        }}
      >
        {item.type}
        <Button isIconOnly variant='flat' size='sm' color='danger'>  <MdDelete /></Button>
      </div>

    </>

  )
}

export default ComponentItem