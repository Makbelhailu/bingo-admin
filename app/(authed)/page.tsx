import { MetricCards } from "@/components/metric-cards";
import UserTable from "@/components/userTable";
import LimitTable from "@/components/limitTable";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <MetricCards />
      <div className="2xl:grid grid-cols-7 gap-4">
        <div className="2xl:col-span-5 h-fit">
          <h3 className="text-lg font-medium mb-4">Users</h3>
          <UserTable />
        </div>
        <div className=" 2xl:col-span-2 h-full">
          <h3 className="text-lg font-medium mb-4">Limit Assessment</h3>
          <LimitTable />
        </div>
      </div>
    </div>
  );
}
