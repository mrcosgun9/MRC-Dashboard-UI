import TenantService from "@/services/actions/tenants";
import { TenantControlRequest } from "@/services/actions/tenants/type";
import { useEffect, useState } from "react";

const useTenantControl = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(false);
  const [slug, setSlug] = useState<string | null>();

  const getData = async () => {
    setLoading(true);
    try {
      const res = await TenantService.tenantControl({ slug: slug! })
      console.log(res);

      setData(res.data)

    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug && slug.length > 4) {
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
