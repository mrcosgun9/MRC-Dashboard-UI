import ChatService from '@/services/actions/chat';
import { GetFakeUserChatListResponse } from '@/services/actions/chat/type';
import { useState, useEffect } from 'react';

const useGetUsersChatById = () => {
  const [chatId, setChatId] = useState<number | undefined>()
  const [data, setData] = useState<GetFakeUserChatListResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ChatService.getUsersChatById({ chatId: chatId });
        setData(result.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (chatId) {
      fetchData();
    }
  }, [chatId]);

  return { data, loading, error,setChatId };
};

export default useGetUsersChatById;