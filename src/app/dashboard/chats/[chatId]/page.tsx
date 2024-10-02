"use client"
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import ChatInformationList from '@/components/modules/fake-user-chats/ChatInformationList'
import ChatProfileInformation from '@/components/modules/fake-user-chats/ChatProfileInformation'
import useGetUsersChatById from '@/hooks/useGetUsersChatById'
import { Avatar, Button, Input, Textarea } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import useGetMessagesByChatId from '@/hooks/useGetMessagesByChatId'
import ChatItem from '@/components/modules/fake-user-chats/ChatItem'
import { BiSend } from 'react-icons/bi'
import { useAppContext } from '@/context/AppContext'
import { getSession } from 'next-auth/react'
import { GetMessageByChatIdResponses, MessagesUser } from '@/services/actions/messages/type'
import { showToast } from '@/services/toastrServices'
import toast from 'react-hot-toast'


const ChatsPage = () => {
  const params = useParams()
  const { connection } = useAppContext();
  const { data, setChatId } = useGetUsersChatById();
  const { data: messagesData, setData: setMessagesData, setChatId: setMessagesChatId } = useGetMessagesByChatId();
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [receiveMessage, setReceiveMessage] = useState<GetMessageByChatIdResponses | null>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (params.chatId) {
      setChatId(Number(params.chatId))
      setMessagesChatId(Number(params.chatId))
    }
  }, [params])

  useEffect(() => {
    if (messagesData.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'end' });
    }
  }, [messagesData])

  const sendMessage = async () => {
    setLoading(true);
    const session = await getSession();
    if (connection) {
      try {
        await connection.invoke("PostMessageModerator", Number(params.chatId), Number(data?.recipientUserId), Number(data?.senderUserId), Number(session?.user.id), data?.recipientUser.fullName, message.toString());
        var newMessage: GetMessageByChatIdResponses = {
          chat: {
            id: Number(params.chatId),
            recipientUser: data?.senderUser as MessagesUser,
            recipientUserId: Number(data?.senderUserId),
            senderUser: data?.recipientUser as MessagesUser,
            senderUserId: Number(data?.recipientUserId)
          },
          chatId: Number(params.chatId),
          content: message.toString(),
          sender: data?.recipientUser as MessagesUser,
          senderId: Number(data?.recipientUserId),
          recipientUser: data?.senderUser as MessagesUser,
          recipientUserId: Number(data?.senderUserId),
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
      setLoading(false);
    }
  }
  useEffect(() => {
    if (connection) {
      connection.on("receiveMessage", (senderId, receiverUserId, content) => {
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
          recipientUser: data?.recipientUser as MessagesUser,
          recipientUserId: Number(receiverUserId),
        }
        setReceiveMessage(newMessage)

        setMessage('');
        inputRef.current?.focus();
      })
    }
  }, [connection])
  useEffect(() => {
    if (receiveMessage) {
      setMessagesData([...messagesData, receiveMessage])
      setReceiveMessage(null);
    }
  }, [receiveMessage])
  return (
    <div>
      <PageHeader title="FAKE USER CHATS" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'CHATS', url: '/dashboard/chats' },
        { title: 'FAKE USER CHATS' },
      ]} />
      <div>
      <ChatInformationList chatData={data}/>
      </div>
      <div className='w-full flex align-top items-start justify-between gap-4'>
        <ChatProfileInformation user={data?.recipientUser} />
        <div className='w-6/12'>
    

          <div className='bg-white rounded shadow'>
            <div className='max-h-[360px] overflow-x-auto p-4'>
              <div className='flex flex-col gap-3'>
                {
                  messagesData.map((x, i) => {
                    return <ChatItem chatItem={x} isLeft={x.senderId == data?.senderUserId} key={i} />
                  })
                }
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className='bg-white rounded shadow w-full mt-3 flex align-middle items-center justify-between'>
            <Input
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
        <ChatProfileInformation user={data?.senderUser} isLeft={true} />
      </div>
    </div>
  )
}

export default ChatsPage