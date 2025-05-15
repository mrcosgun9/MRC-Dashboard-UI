import { getChatById } from '@/actions/messageAction';
import PageHeader from '@/components/layouts/main-layout/PageHeader';
import MessagesList from '@/components/modules/chat/messages-list';
import ChatInformationList from '@/components/modules/fake-user-chats/ChatInformationList';
import React from 'react'

type Props = {
  params: { chatId: string }; // Promise kaldırıldı
}

const ChatId = async ({ params }: Props) => {
  const chatData = await getChatById(Number(params.chatId));

  return (
    <>
      <PageHeader
        title="FAKE USER CHATS"
        breadcrumbsItems={[
          { title: 'DASHBOARD', url: '/dashboard' },
          { title: 'CHATS', url: '/dashboard/chats' },
          { title: 'FAKE USER CHATS' },
        ]}
      />

      <div>
        {chatData && <ChatInformationList chatResponse={chatData} />}
        <MessagesList chatData={chatData} />
      </div>
    </>
  )
}

export default ChatId