"use client"
import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'

const PageHeader = ({ title, breadcrumbsItems }: { title: string, breadcrumbsItems: { title: string, url: string }[] }) => {
  const router = useRouter();
  return (
    <div className='w-full flex align-middle items-center justify-between'>
      <div className='w-full text-xl font-bold flex align-middle items-center justify-start gap-3'>
        <Button isIconOnly size='sm' variant='light' color='primary' onClick={() => { router.back() }}>
          <MdArrowBack size={18} />
        </Button>
        <div>{title}</div>
      </div>
      <div className='w-full flex justify-end align-middle items-center'>
        <Breadcrumbs
          itemClasses={{
            separator: "px-2"
          }}
        >
          {breadcrumbsItems.map((x, i) => {
            return <BreadcrumbItem href={x.url} key={i}>
              {x.title}
            </BreadcrumbItem>

          })}
        </Breadcrumbs>
      </div>
      <div>

      </div>
    </div>
  )
}

export default PageHeader