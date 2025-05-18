import DataTable from '@/components/elements/DataTable'
import AllUserListCount from '@/components/modules/manage-users/all-user/AllUserListCount'
import useGetAllUsers from '@/hooks/useGetAllUsers'
import { ColumnType, ColumnTypeEnum } from '@/types/DataTableType'
import React, { use } from 'react'
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import UserService from '@/services/actions/userService'
import { ResponseStatus } from '@/types/baseType'
import { toast } from 'react-toastify'
import UserListWrapper from '@/components/modules/manage-users/all-user/UserListWrapper'
import { getAllUser } from '@/actions/userAction'
const columns: ColumnType[] = [
  { name: "IMAGE", uid: "profileImage", type: ColumnTypeEnum.image },
  { name: "ID", uid: "id", sortable: true },
  { name: "FULL NAME", uid: "fullName", sortable: true },
  { name: "Email", uid: "email", sortable: true, type: ColumnTypeEnum.email },
  { name: "ACTIONS", uid: "actions", type: ColumnTypeEnum.actions },
]

const AllUser = async () => {
  const users = await getAllUser();

  return (
    <div>
      <UserListWrapper data={users.data} />
    </div>
  )
}

export default AllUser