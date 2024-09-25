"use client"
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import ChatInformationList from '@/components/modules/fake-user-chats/ChatInformationList'
import ChatProfileInformation from '@/components/modules/fake-user-chats/ChatProfileInformation'
import useGetUsersChatById from '@/hooks/useGetUsersChatById'
import { Avatar, Button, Textarea } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import useGetMessagesByChatId from '@/hooks/useGetMessagesByChatId'
import ChatItem from '@/components/modules/fake-user-chats/ChatItem'
import { BiSend } from 'react-icons/bi'
import { useAppContext } from '@/context/AppContext'


const ChatsPage = () => {
  const params = useParams()
  const { connection } = useAppContext();
  const { data, setChatId } = useGetUsersChatById();
  const { data: messagesData, setChatId: setMessagesChatId } = useGetMessagesByChatId();
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (params.chatId) {
      setChatId(Number(params.chatId))
      setMessagesChatId(Number(params.chatId))
    }
  }, [params])

  const sendMessage = async () => {
       

    console.log("🚀PostMessage", params.chatId, data?.senderUserId, data?.recipientUserId, message);
    if (connection) {
      // connection.invoke("PostMessage",46,7,9,"22222")
      try {
         connection.invoke("PostMessage", Number(params.chatId), Number(data?.senderUserId), Number(data?.recipientUserId), message.toString());
      } catch (err) {
        console.error("SignalR Hatası:", err);
      }
    }
    else {
      console.log("connection yok");

    }
  }
  useEffect(() => {
    if (connection) {
      connection.on("receiveMessage", (senderId, receiverUserId, content) => {
        console.log(senderId, receiverUserId, content);

        // setReceiveMessage({
        //   chat: {
        //     id: selectedChat?.id!,
        //     recipientUserId: receiverUserId,
        //     senderUserId: senderId
        //   },
        //   receiverUserId: receiverUserId,
        //   senderId: senderId,
        //   content: content,
        //   receiverUser: selectedChat?.senderUser!,
        //   senderUser: selectedChat?.recipientUser!
        // });
      })
    }
  }, [connection])
  return (
    <div>
      <PageHeader title="FAKE USER CHATS" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'CHATS', url: '/dashboard/chats' },
        { title: 'FAKE USER CHATS' },
      ]} />
      <div className='w-full flex align-top items-start justify-between gap-4'>
        <ChatProfileInformation user={data?.recipientUser} />
        <div className='w-6/12'>
          <ChatInformationList />

          <div className='bg-white rounded shadow'>
            <div className='max-h-[360px] overflow-x-auto p-4'>
              <div className='flex flex-col gap-3'>

                {
                  messagesData.map((x, i) => {
                    return <ChatItem chatItem={x} isLeft={x.senderId == data?.senderUserId} key={i} />
                  })
                }

                {/* <div className='flex w-full gap-2 justify-start flex-row-reverse'>
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" radius='full' className="w-10 h-10 text-large" isBordered color='primary' />
                  <div className='w-full max-w-[70%] h-16 bg-red-500 rounded-xl rounded-tr-none'></div>
                </div> */}
              </div>
            </div>
          </div>
          <div className='bg-white rounded shadow w-full mt-3 flex align-middle items-center justify-between'>
            <Textarea
              className='px-4'
              variant="underlined"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
            <Button color="primary" variant="solid" isIconOnly onClick={() => { sendMessage() }}>
              <BiSend />
            </Button>
          </div>
        </div>
        <ChatProfileInformation user={data?.senderUser} />
      </div>
    </div>
  )
}

export default ChatsPage