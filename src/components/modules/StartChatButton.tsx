"use client"
import { useAppContext } from '@/context/AppContext';
import ChatService from '@/services/actions/chat';
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const StartChatButton = () => {
  const router = useRouter();
  const [searching, setSearching] = useState(false);
  const getLastedChat = async () => {
    fetchData();
  }
  const fetchData = async () => {
    try {
      setSearching(true);
      const res = await ChatService.getFakeUserLastedChat();
      if (res.data.id) {
        setSearching(false)
        router.push(`/dashboard/chats/` + res.data.id);
      }
      else {
        setSearching(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (searching) {
      const interval = setInterval(() => {
        fetchData();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [searching])
  return (
    <Button variant="solid" color="secondary" className="font-semibold text-2xl py-8 px-8"
      isLoading={searching}
      onClick={() => {
        getLastedChat()
      }}>
      {!searching ? 'Start Chat' : 'Looking for chat'}
    </Button>
  )
}

export default StartChatButton