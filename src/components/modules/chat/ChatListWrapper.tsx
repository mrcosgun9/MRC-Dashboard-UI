"use client"
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import React from 'react'
import AllUserListCount from '../manage-users/all-user/AllUserListCount'
import DataTable from '@/components/elements/DataTable'
import { ColumnType, ColumnTypeEnum } from '@/types/DataTableType'
import UserService from '@/services/actions/userService'
import { ResponseStatus } from '@/types/baseType'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
const columns: ColumnType[] = [
  { name: "IMAGE", uid: "ProfileImage", type: ColumnTypeEnum.image },
  { name: "ID", uid: "id", sortable: true },

  { name: "Recipient Full Name", uid: "recipientUserNameLastName", sortable: true },
  { name: "Recipient Email", uid: "recipientEmail", sortable: true, type: ColumnTypeEnum.email },
  { name: "Recipient Type", uid: "recipientType", sortable: true, type: ColumnTypeEnum.userType },

  { name: "Sender Full Name", uid: "senderUserNameLastName", sortable: true },
  { name: "Sender Email", uid: "senderEmail", sortable: true, type: ColumnTypeEnum.email },
  { name: "Sender Type", uid: "senderType", sortable: true, type: ColumnTypeEnum.userType },
  { name: "Create Date", uid: "creaeAt", sortable: true, type: ColumnTypeEnum.date },
  { name: "ACTIONS", uid: "actions", type: ColumnTypeEnum.actions },
]
const ChatListWrapper = ({ data }: { data: any }) => {
  const router = useRouter();
  const deleteUserEvent = async (id: number) => {
    const res = await UserService.deleteUser({ id })
    if (res.status === ResponseStatus.Ok) {
      toast.success("User deleted successfully");
    }
    else {
      toast.error("User deletion failed")
    }
  }
  const viewChat = async (id: number) => {
    router.push("/dashboard/chats/" + id)
  }

  return (
    <div>
      <PageHeader title="ALL USERS" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'ALL USERS' },
      ]} />

      <div className='my-5'>

        <DataTable
          loading={false}
          columns={columns}
          data={data}
          deleteEvent={deleteUserEvent}
          editeUserEvent={viewChat}
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

export default ChatListWrapper