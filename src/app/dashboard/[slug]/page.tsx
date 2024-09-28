"use client"
import InformationCard from "@/components/elements/InformationCard";
import PageHeader from "@/components/layouts/main-layout/PageHeader";
import { swrFetcher } from "@/services/swr-service";
import useSWR from "swr";

export default function Home({ params }: { params: { slug: string } }) {

  const { data, isLoading, error } = useSWR<any>(
    () => ['/Chat/GetUserChat', {}, { 
      'app-name': params.slug
    }],
    ([url, body, headers]) => swrFetcher(url, body, headers)
  );
  return (
    <div>
      <div>
        {JSON.stringify(isLoading)}
        {JSON.stringify(error)}
        {JSON.stringify(data)}
      </div>
      <div className="mb-4">
        <div className="text-xl font-bold">Welcome back, Json Taylor !</div>
        <div className="text-sm text-gray-500">Track your sales activity, leads and deals here.</div>
      </div>
      <div>
        <PageHeader title="PAGE HEADER" breadcrumbsItems={[
          { title: 'Dashboard', url: '/dashboard' },
          { title: 'Test', url: '/test' },
        ]} />
      </div>
      <div className="grid lg:grid-cols-4 gap-3 my-5">
        <InformationCard />
        <InformationCard />
        <InformationCard />
        <InformationCard />
      </div>
    </div>
  );
}
