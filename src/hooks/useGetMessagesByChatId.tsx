import MessagesService from '@/services/actions/messages';
import { GetMessageByChatIdResponses } from '@/services/actions/messages/type';
import { useState, useEffect } from 'react';

const useGetMessagesByChatId = () => {
  const [chatId, setChatId] = useState<number | undefined>()
  const [data, setData] = useState<GetMessageByChatIdResponses[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await MessagesService.getMessagesByChatId({ chatId: chatId });
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

  return { data,setData, loading, error, setChatId };
};

export default useGetMessagesByChatId;