"use client"
import DataTable from '@/components/elements/DataTable'
import { ColumnType, ColumnTypeEnum } from '@/types/DataTableType'
import React from 'react'
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import useGetFakeUserChatList from '@/hooks/useGetFakeUserChatList'
import { useRouter } from 'next/navigation'

const columns: ColumnType[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Sender Name", uid: "senderUser.fullName", sortable: true },
  { name: "Recipient Name", uid: "recipientUser.fullName", sortable: true },
]
const ChatList = () => {
  const router=useRouter();
  const { data, error, loading } = useGetFakeUserChatList();
  const rowEvent = (item: any) => {
    router.push("/dashboard/chats/"+item.id)
  }
  return (
    <div>
      <PageHeader title="ALL USERS" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'ALL USERS' },
      ]} />

      <div className='my-5'>
        <DataTable
          loading={loading}
          columns={columns}
          addNewUrl='/dashboard/manage-users/create-user'
          data={data}
          rowEvent={rowEvent}
          defaultSort={{
            column: "id",
            direction: "ascending"
          }}
          filteredRowName={["fullName", "email"]}
        />
      </div>
      {/* <pre>
        {JSON.stringify(data, null, 2)}
      </pre> */}
    </div>
  )
}

export default ChatList