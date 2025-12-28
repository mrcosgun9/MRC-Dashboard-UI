"use client"
import React, { useEffect, useRef, useState } from 'react'
import ChatProfileInformation from '../fake-user-chats/ChatProfileInformation'
import { ChatMessageItem, GetChatByIdResponse } from '@/services/actions/chat/type'
import ChatItem from '../fake-user-chats/ChatItem'
import { Button, Input } from '@nextui-org/react'
import { BiSend } from 'react-icons/bi'
import { createMessages, getChatById, getLastedChat } from '@/actions/messageAction'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const MessagesList = ({ chatData }: { chatData: GetChatByIdResponse }) => {
  const router = useRouter();
  const { data } = useSession()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { chat } = chatData;
  const [messagesData, setMessagesData] = useState<ChatMessageItem[]>([]);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (chatData) {
      setMessagesData(chatData.chat.Messages);
    }
    scrollToBottom();
  }, [chatData]);

  const sendMessage = async () => {
    if (!message) {
      return;
    }
    setLoading(true);
    const messageData = {
      SenderId: Number(chatData.chat.RecipientUserId),
      RecipientUserId: Number(chatData.chat.SenderUserId),
      ModeratorId: Number(data?.user.id),
      IsSeen: false,
      IsDeleted: false,
      UserId: Number(chatData.chat.SenderUserId),
      CreatedAt: new Date(),
      IsActive: true,
      Timestamp: new Date(),
      Content: message,
      ChatId: Number(chatData.chat.Id),
      UpdatedAt: null
    }

    try {
      const res = await createMessages({ data: messageData });
      toast.success("Message sent successfully");
      getChatById(Number(chatData.chat.Id)).then((res) => {
        setMessagesData(res.chat.Messages);
      }).catch((err) => {
        console.error("Error fetching messages:", err);
      });
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setMessage('');
      getLastedChat(chatData.chat.Id).then((res) => {
        if (res)
          router.push(`/dashboard/chats/${res}`);
        else
          router.push(`/dashboard`);
      }).catch((err) => {
        console.error("Error fetching lasted chat:", err);
      })
    }
    catch (err) {
      console.error("Mesaj gönderme hatası:", err);
    }
    finally {
      setLoading(false);
    }
    setMessage('');
  }
  useEffect(() => {
    const interval = setInterval(() => {
      getChatById(Number(chatData.chat.Id)).then((res) => {
        setMessagesData(res.chat.Messages);
      }).catch((err) => {
        console.error("Error fetching messages:", err);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [chatData.chat.Id]);

  return (
    <div className='w-full flex align-top items-start justify-between gap-4 pb-6'>
      <ChatProfileInformation chatData={chatData} user={chatData.SenderUser} />
      <div className='w-6/12'>
        <div className='bg-white rounded shadow'>
          <div className='max-h-[calc(100vh-21rem)] overflow-x-auto p-4'>
            <div className='flex flex-col gap-3'>
              {
                messagesData.map((x, i) => {
                  return <ChatItem chatItem={x} isLeft={x.SenderId !== chat?.SenderUserId} key={i} />
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
          <Button color="primary" variant="solid" isIconOnly onPress={() => { sendMessage() }} isLoading={loading}>
            <BiSend />
          </Button>
        </div>
      </div>
      <ChatProfileInformation chatData={chatData} user={chatData?.RecipientUser} isLeft={true} />
    </div>
  )
}

export default MessagesList