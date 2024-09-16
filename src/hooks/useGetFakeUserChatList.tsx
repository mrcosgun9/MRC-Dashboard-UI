import ChatService from '@/services/actions/chat';
import { GetFakeUserChatListResponse } from '@/services/actions/chat/type';
import { useState, useEffect } from 'react';

const useGetFakeUserChatList = () => {
  const [data, setData] = useState<GetFakeUserChatListResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ChatService.getFakeUserChatList();
        setData(result.data);
      } catch (err:any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGetFakeUserChatList;