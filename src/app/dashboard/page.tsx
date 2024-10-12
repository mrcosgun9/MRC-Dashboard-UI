"use client"
import PageHeader from "@/components/layouts/main-layout/PageHeader";
import StartChatButton from "@/components/modules/StartChatButton";
import { useAppContext } from "@/context/AppContext";
import ChatService from "@/services/actions/chat";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const { data: session, status } = useSession();

  return (
    <div>
      <div className="mb-4">
        <div className="text-xl font-bold">Welcome back, {session?.user.fullName} !</div>
        <div className="text-sm text-gray-500">Track your sales activity, leads and deals here.</div>
      </div>
      <div className="flex justify-center items-center align-middle w-full">
        <StartChatButton />
      </div>
      {/* <div>
        <PageHeader title="PAGE HEADER" breadcrumbsItems={[
          { title: 'Dashboard', url: '/dashboard' },
          { title: 'Test', url: '/test' },
        ]} />
      </div>
      <div className="grid grid-cols-4 gap-3 my-5">
        <InformationCard />
        <InformationCard />
        <InformationCard />
        <InformationCard />
      </div> */}
    </div>
  );
}
