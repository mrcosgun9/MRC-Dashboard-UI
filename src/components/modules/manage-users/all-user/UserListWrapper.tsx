"use client"
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import React from 'react'
import AllUserListCount from './AllUserListCount'
import DataTable from '@/components/elements/DataTable'
import { ColumnType, ColumnTypeEnum } from '@/types/DataTableType'
import UserService from '@/services/actions/userService'
import { ResponseStatus } from '@/types/baseType'
import { toast } from 'react-toastify'
const columns: ColumnType[] = [
  { name: "IMAGE", uid: "profileImage", type: ColumnTypeEnum.image },
  { name: "ID", uid: "id", sortable: true },
  { name: "FULL NAME", uid: "Name", sortable: true },
  { name: "Email", uid: "Email", sortable: true, type: ColumnTypeEnum.email },
  { name: "ACTIONS", uid: "actions", type: ColumnTypeEnum.actions },
]
const UserListWrapper = ({ data }: { data: any }) => {

  const deleteUserEvent = async (id: number) => {
    const res = await UserService.deleteUser({ id })
    if (res.status === ResponseStatus.Ok) {
      toast.success("User deleted successfully");
    }
    else {
      toast.error("User deletion failed")
    }
  }
  const editeUserEvent = async (id: number) => {
    console.log("editeUserEvent", id)
  }
  return (
    <div>
      <PageHeader title="ALL USERS" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'ALL USERS' },
      ]} />
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <AllUserListCount />
      <div className='my-5'>
        {/* <DataTable
          loading={false}
          columns={columns}
          addNewUrl='/dashboard/manage-users/create-user'
          data={data}
          deleteEvent={deleteUserEvent}
          editeUserEvent={editeUserEvent}
          defaultSort={{
            column: "id",
            direction: "ascending"
          }}
          filteredRowName={["fullName", "email"]}
        /> */}
      </div>

    </div>
  )
}

export default UserListWrapper