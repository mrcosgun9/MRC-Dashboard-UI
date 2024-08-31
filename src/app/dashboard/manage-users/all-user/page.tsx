"use client"
import DataTable from '@/components/elements/DataTable'
import AllUserListCount from '@/components/modules/manage-users/all-user/AllUserListCount'
import { statusOptions } from '@/data/data'
import useGetAllUsers from '@/hooks/useGetAllUsers'
import { ColumnType, ColumnTypeEnum } from '@/types/DataTableType'
import React from 'react'
const columns: ColumnType[] = [
  { name: "Image", uid: "profileImage", type: ColumnTypeEnum.image },
  { name: "ID", uid: "id", sortable: true },
  { name: "Full Name", uid: "fullName", sortable: true },
  { name: "Email", uid: "email", sortable: true, type: ColumnTypeEnum.email },
  { name: "ACTIONS", uid: "actions", type: ColumnTypeEnum.actions },
]
const AllUser = () => {
  const { data, error, loading } = useGetAllUsers();
  return (
    <div>
      <AllUserListCount />
      <div className='my-5'>
        <DataTable
          loading={loading}
          columns={columns}
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