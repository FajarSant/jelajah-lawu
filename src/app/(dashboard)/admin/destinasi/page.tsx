import DestinationDashboard from "@/components/Admin/Destination/DestinationStatsCard";
import { DestinationTable } from "@/components/Admin/Destination/DestinationTable";
import { getDestinationDashboardData } from "@/lib/actions/admin/destination/get-destination-dashboard";

export default async function DestinationDashboardPage() {
  const data = await getDestinationDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Destinasi</h1>

      <DestinationDashboard statistik={data.statistik} />

      <DestinationTable destinasi={data.destinasi} />
    </div>
  );
}
