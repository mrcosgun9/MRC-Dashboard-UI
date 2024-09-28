"use client"
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import ChatInformationList from '@/components/modules/fake-user-chats/ChatInformationList'
import ChatProfileInformation from '@/components/modules/fake-user-chats/ChatProfileInformation'
import useGetUsersChatById from '@/hooks/useGetUsersChatById'
import { Avatar, Button, Textarea } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import useGetMessagesByChatId from '@/hooks/useGetMessagesByChatId'
import ChatItem from '@/components/modules/fake-user-chats/ChatItem'
import { BiSend } from 'react-icons/bi'
import { useAppContext } from '@/context/AppContext'
import { getSession } from 'next-auth/react'
import { GetMessageByChatIdResponses, MessagesUser } from '@/services/actions/messages/type'


const ChatsPage = () => {

  const params = useParams()
  const { connection } = useAppContext();
  const { data, setChatId } = useGetUsersChatById();
  const { data: messagesData, setData: setMessagesData, setChatId: setMessagesChatId } = useGetMessagesByChatId();
  const [receiveMessage, setReceiveMessage] = useState<GetMessageByChatIdResponses | null>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (params.chatId) {
      setChatId(Number(params.chatId))
      setMessagesChatId(Number(params.chatId))
    }
  }, [params])

  const sendMessage = async () => {
    setLoading(true);
    const session = await getSession();
    if (connection) {
      try {
        await connection.invoke("PostMessageModerator", Number(params.chatId), Number(data?.senderUserId), Number(data?.recipientUserId), Number(session?.user.id), message.toString());
        var newMessage: GetMessageByChatIdResponses = {
          chat: {
            id: Number(params.chatId),
            recipientUser: data?.recipientUser as MessagesUser,
            recipientUserId: Number(data?.recipientUserId),
            senderUser: data?.senderUser as MessagesUser,
            senderUserId: Number(data?.senderUserId)
          },
          chatId: Number(params.chatId),
          content: message.toString(),
          sender: data?.senderUser as MessagesUser,
          senderId: Number(data?.senderUserId),
        }
        setMessagesData([...messagesData, newMessage])
        setMessage('');
        inputRef.current?.focus();
        setLoading(false);
      } catch (err) {
        console.error("SignalR Hatası:", err);
        setLoading(false);
      }
    }
    else {
      console.log("connection yok");
      setLoading(false);
    }
  }
  useEffect(() => {
    console.log(messagesData);

    console.log(receiveMessage);

  }, [receiveMessage])
  useEffect(() => {
    if (connection) {
      connection.on("receiveMessage", (senderId, receiverUserId, content) => {
        console.log("receiveMessage", senderId, receiverUserId, content);
        var newMessage: GetMessageByChatIdResponses = {
          chat: {
            id: Number(params.chatId),
            recipientUser: data?.recipientUser as MessagesUser,
            recipientUserId: Number(receiverUserId),
            senderUser: data?.senderUser as MessagesUser,
            senderUserId: Number(senderId)
          },
          chatId: Number(params.chatId),
          content: content.toString(),
          sender: data?.senderUser as MessagesUser,
          senderId: Number(senderId),
        }
        setReceiveMessage(newMessage)

        setMessage('');
        inputRef.current?.focus();
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
              ref={inputRef}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
            <Button color="primary" variant="solid" isIconOnly onClick={() => { sendMessage() }} isLoading={loading}>
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