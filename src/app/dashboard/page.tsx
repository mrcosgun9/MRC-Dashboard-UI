import InformationCard from "@/components/elements/InformationCard";

export default function Home() {
  return (
    <div>
      <div className="mb-4">
        <div className="text-xl font-bold">Welcome back, Json Taylor !</div>
        <div className="text-sm text-gray-500">Track your sales activity, leads and deals here.</div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        <InformationCard />
        <InformationCard />
        <InformationCard />
        <InformationCard />
      </div>
    </div>
  );
}
