"use client"

import { getLastedChat } from '@/actions/messageAction';
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const StartChatButton = () => {
  const router = useRouter();
  const [searching, setSearching] = useState(false);
  const lastedChat = async () => {
    fetchData();
  }
  const fetchData = async () => {
    try {
      setSearching(true);
      const res = await getLastedChat();
      if (res) {
        setSearching(false)
        router.push(`/dashboard/chats/` + res);
      }
      else {
        const currentCount = parseInt(sessionStorage.getItem('emptyDataCount') || '0');
        const newCount = currentCount + 1;
        sessionStorage.setItem('emptyDataCount', newCount.toString());

        if (newCount >= 6) {
          setSearching(false);
          sessionStorage.removeItem('emptyDataCount');
        } else {
          setSearching(true);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearching(false);
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
      onPress={() => {
        lastedChat()
      }}>
      {!searching ? 'Start Chat' : 'Looking for chat'}
    </Button>
  )
}

export default StartChatButton