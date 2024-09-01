"use client"
import DataTable from '@/components/elements/DataTable'
import AllUserListCount from '@/components/modules/manage-users/all-user/AllUserListCount'
import useGetAllUsers from '@/hooks/useGetAllUsers'
import { ColumnType, ColumnTypeEnum } from '@/types/DataTableType'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import PageHeader from '@/components/layouts/main-layout/PageHeader'

const columns: ColumnType[] = [
  { name: "IMAGE", uid: "profileImage", type: ColumnTypeEnum.image },
  { name: "ID", uid: "id", sortable: true },
  { name: "FULL NAME", uid: "fullName", sortable: true },
  { name: "Email", uid: "email", sortable: true, type: ColumnTypeEnum.email },
  { name: "ACTIONS", uid: "actions", type: ColumnTypeEnum.actions },
]
const AllUser = () => {
  const { data, error, loading } = useGetAllUsers();
  return (
    <div>
      <PageHeader title="ALL USERS" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'ALL USERS' },
      ]} />
      <AllUserListCount />
      <div className='my-5'>
        <DataTable
          loading={loading}
          columns={columns}
          addNewUrl='/dashboard/manage-users/create-user'
          data={data}
          defaultSort={{
            column: "id",
            direction: "ascending"
          }}
          filteredRowName={["name"]}
        />
      </div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default AllUser