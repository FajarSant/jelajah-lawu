

import DestinationDashboard from "@/components/Admin/Destination/DestinationStatsCard";
import { DestinationReviewTable } from "@/components/Admin/Destination/DestinationTable";
import { getDestinationDashboardData } from "@/lib/actions/admin/destination/get-destination-dashboard";

export default async function DestinationDashboardPage() {
  const data = await getDestinationDashboardData();
  <DestinationReviewTable reviews={data.ulasanBaru} />


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Destinasi</h1>
     <DestinationDashboard
        statistik={data.statistik}
        destinasiBaru={data.destinasiBaru}
        ulasanBaru={data.ulasanBaru}
      />

  <DestinationReviewTable reviews={data.ulasanBaru} />
      {/* Komponen lain seperti recent bookings/reviews bisa menyusul */}
    </div>
  );
}
