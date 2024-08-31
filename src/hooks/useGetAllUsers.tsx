import UserService from '@/services/actions/userService';
import { GetAllOnlineUserResponse } from '@/services/actions/userService/type';
import { useState, useEffect } from 'react';

const useGetAllUsers = () => {
  const [data, setData] = useState<GetAllOnlineUserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await UserService.getAllOnlineUser();
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

export default useGetAllUsers;