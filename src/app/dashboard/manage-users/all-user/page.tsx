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


const AllUser = async () => {
  // const users = await fetchUserList();

  return (
  <>
  </>
  )
}

export default AllUser