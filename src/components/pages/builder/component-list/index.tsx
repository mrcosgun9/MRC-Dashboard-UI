import mockResponse from '@/dynamic-rendering/dynamic-rendering.mock'
import { Button, Checkbox, Select, SelectItem } from '@nextui-org/react'
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
        editComponent &&
        <div className="absolute w-full bg-white top-0 left-0 max-h-screen overflow-y-auto">
          <div className='w-full px-2 py-3 border-b border-gray-400 flex justify-between align-middle items-center'>
            <div className='font-bold'>
              {editComponent.type}
            </div>
            <Button isIconOnly size='sm' onClick={() => setEditComponent(null)}>
              <BiX size={16} />
            </Button>
          </div>
          <div>
            {
              Object.keys(editComponent.data).map((key: any, i) => {
                const data = editComponent.data[key];
                const { isEditable, type, name, items, value } = data;
                return isEditable && <div key={i} className='flex flex-col gap-2 border-b border-gray-400 py-3 px-4'>
                  {
                    type === 'select' &&
                    <Select
                      label={name}
                      placeholder={name}
                      value={value}
                      defaultSelectedKeys={[value]}
                      labelPlacement='outside'
                      selectionMode="single"
                      variant='faded'
                    >
                      {items.map((item: { value: string, label: string }) => (
                        <SelectItem key={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  }
                  {
                    type === 'file' &&
                    <div>
                      <label>{name}</label>
                      <input type='file' />
                    </div>
                  }
                  {
                    type === 'checkbox' &&
                    <div className='flex gap-2 items-center'>
                      <input type='checkbox' checked={value} />
                      <label>{name}</label>
                    </div>
                  }
                  {
                    type === 'group' &&
                    <div>
                      <label>{name}</label>
                      {
                        items.map((item: any, i: number) => {
                          const { isEditable, type, name, items, value, title, href } = item;
                          return isEditable && <div key={i} className='flex flex-col gap-2 items-center'>
                            <label>{title.value}</label>
                          </div>
                        })
                      }
                    </div>
                  }
                  <pre>
                    {
                      Object.keys(data).map((key: any, i) => {
                        const item = data[key];
                        const { isEditable, type, name, items, value } = item;
                        return isEditable && <div>
                          <Checkbox isSelected={value}>{name}</Checkbox>
                        </div>
                      })
                    }
                  </pre>
                </div>
              })
            }
          </div>
          <pre>
            {JSON.stringify(editComponent.data, null, 2)}
          </pre>
        </div>
      }

    </>
  )
}

export default ComponentList