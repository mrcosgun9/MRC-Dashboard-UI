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
  { name: "IMAGE", uid: "ProfileImage", type: ColumnTypeEnum.image },
  { name: "ID", uid: "Id", sortable: true },
  { name: "FULL NAME", uid: "FullName", sortable: true },
  { name: "Email", uid: "Email", sortable: true, type: ColumnTypeEnum.email },
  { name: "Type", uid: "UserType", sortable: true, type: ColumnTypeEnum.userType },
  { name: "Create Date", uid: "CreatedAt", sortable: true, type: ColumnTypeEnum.date },
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
      <AllUserListCount />
      <div className='my-5'>

        <DataTable
          loading={false}
          columns={columns}
          addNewUrl='/dashboard/manage-users/create-user'
          data={data}
          deleteEvent={deleteUserEvent}
          editeUserEvent={editeUserEvent}
          defaultSort={{
            column: "Id",
            direction: "descending"
          }}
          filteredRowName={["FullName", "Email"]}
        />
      </div>

    </div>
  )
}

export default UserListWrapper