"use client"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import type { Selection } from "@nextui-org/react";
import { MdCircle, MdKeyboardArrowDown } from 'react-icons/md';
import { createPage } from '@/dynamic-rendering';
import mockResponse from '@/dynamic-rendering/dynamic-rendering.mock';
import ComponentList from '@/components/pages/builder/component-list';

const BuilderPage = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["home"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const pages = [
    { key: "home", title: "Anasayfa" },
    { key: "company", title: "Şirket" },
    { key: "service", title: "Servis" },
  ]

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <div className="w-1/5 border-r border-gray-300">
            <div className='w-full py-2 px-3 border-b border-gray-300 flex justify-between align-middle items-center'>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    className="capitalize"
                    size='sm'
                    endContent={<MdKeyboardArrowDown />}
                  >
                    {pages.find((page) => page.key === selectedValue)?.title}

                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  {pages.map((page) => (
                    <DropdownItem key={page.key}>
                      {page.title}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button color="default" size='sm' variant="solid" startContent={<MdCircle size={8} className='animate-ping text-purple-900' />}>
                SEO
              </Button>
            </div>
            <div className='px-3 py-2 relative'>
              <ComponentList/>
            </div>
          </div>
          <main className="w-4/5 ">
            <div className='w-full py-6 border-b border-gray-300'></div>
            <div className='container h-screen'>
              {createPage(mockResponse)}
            </div>
          </main>
        </div>
      </div>
    </>

  )
}

export default BuilderPage