"use server"
import { getFakeUserChatList } from '@/actions/messageAction'
import ChatListWrapper from '@/components/modules/chat/ChatListWrapper'
import { ColumnType } from '@/types/DataTableType'


const columns: ColumnType[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Sender Name", uid: "senderUser.fullName", sortable: true },
  { name: "Recipient Name", uid: "recipientUser.fullName", sortable: true },
]
const ChatList = async () => {
  // const router=useRouter();
  // const { data, error, loading } = useGetFakeUserChatList();
  // const rowEvent = (item: any) => {
  //   router.push("/dashboard/chats/"+item.id)
  const data = await getFakeUserChatList();
  const mappedData = data.map((item: any) => ({
    id: item.Id,
    creaeAt: item.CreatedAt,
    recipientUserNameLastName: item.User_Chats_RecipientUserIdToUser.Name + " " + item.User_Chats_RecipientUserIdToUser.LastName,
    recipientEmail: item.User_Chats_RecipientUserIdToUser.Email,
    recipientType:  item.User_Chats_RecipientUserIdToUser.UserType,
    senderUserNameLastName: item.User_Chats_SenderUserIdToUser.Name + " " + item.User_Chats_SenderUserIdToUser.LastName,
    senderEmail: item.User_Chats_SenderUserIdToUser.Email,
    senderType: item.User_Chats_SenderUserIdToUser.UserType,
  }))
  return (
    <div>
      <ChatListWrapper data={mappedData} />

    </div>
  )
}

export default ChatList