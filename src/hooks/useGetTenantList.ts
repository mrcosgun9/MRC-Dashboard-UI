import TenantService from "@/services/actions/tenants";
import { TenantControlResponse, TenantResponse } from "@/services/actions/tenants/type";
import { useEffect, useState } from "react";

const useGetTenantList = () => {
  const [data, setData] = useState<TenantResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await TenantService.getTenantList();
      setData(res.data)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useGetTenantList;
