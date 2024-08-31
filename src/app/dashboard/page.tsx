import InformationCard from "@/components/elements/InformationCard";
import PageHeader from "@/components/layouts/main-layout/PageHeader";

export default function Home() {
  return (
    <div>
      <div className="mb-4">
        <div className="text-xl font-bold">Welcome back, Json Taylor !</div>
        <div className="text-sm text-gray-500">Track your sales activity, leads and deals here.</div>
      </div>
      <div>
        <PageHeader title="PAGE HEADER" breadcrumbsItems={[
          {title:'Dashboard',url:'/dashboard'},
          {title:'Test',url:'/test'},
        ]} />
      </div>
      <div className="grid grid-cols-4 gap-3 my-5">
        <InformationCard />
        <InformationCard />
        <InformationCard />
        <InformationCard />
      </div>
    </div>
  );
}
