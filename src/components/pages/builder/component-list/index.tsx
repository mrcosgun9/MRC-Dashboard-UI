import mockResponse from '@/dynamic-rendering/dynamic-rendering.mock'
import { Button } from '@nextui-org/react'
import React from 'react'
import { BiPlus, BiX } from 'react-icons/bi'
import ComponentItem from '../component-item'

const ComponentList = () => {
  const [editComponent, setEditComponent] = React.useState<any>(null)
  return (
    <>
      <div className='flex flex-col text-sm font-bold gap-2'>
        {mockResponse.data.items?.map((item, i) => {
          return <ComponentItem item={item} setEditComponent={setEditComponent} key={i} />
        })}
        <div className='flex justify-center'>
          <Button color='primary' startContent={<BiPlus size={16} />}>Bölüm Ekle</Button>
        </div>
      </div>
      <pre>
        {JSON.stringify(editComponent, null, 2)}
      </pre>
      {
        editComponent && <div className="absolute w-full bg-white top-0 left-0">
          <div className='w-full px-2 py-3 border-b border-gray-400 flex justify-end'>
            <Button isIconOnly size='sm' onClick={() => setEditComponent([])}>
              <BiX />
            </Button>
          </div>
          <pre>
            {JSON.stringify(editComponent, null, 2)}
          </pre>
        </div>
      }

    </>
  )
}

export default ComponentList