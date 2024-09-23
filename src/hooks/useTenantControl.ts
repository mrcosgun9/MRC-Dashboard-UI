import TenantService from "@/services/actions/tenants";
import {  TenantControlResponse } from "@/services/actions/tenants/type";
import { useEffect, useState } from "react";

const useTenantControl = () => {
  const [data, setData] = useState<TenantControlResponse | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(false);
  const [slug, setSlug] = useState<string | null>();

  const getData = async () => {
    setLoading(true);
    try {
      const res = await TenantService.tenantControl({ slug: slug! })

      setData(res.data)

    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug && slug.length > 3) {
      const handler = setTimeout(() => {
        getData();
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }

  }, [slug]);

  return {
    data,
    loading,
    error,
    setSlug
  };
};

export default useTenantControl;
