// app/admin/jeep/page.tsx

import { JeepStatistik } from "@/components/Admin/jeeptour/JeepStatistik";
import { JeepTourTable } from "@/components/Admin/jeeptour/JeepTourTable";
import { getAllJeepTour } from "@/lib/actions/admin/jeep/jeep-action";
import { getJeepDashboardData } from "@/lib/actions/admin/jeep/jeep-action";

export default async function JeepDashboardPage() {
  const [dashboardData, jeepTours] = await Promise.all([
    getJeepDashboardData(),
    getAllJeepTour(),
  ]);

  return (
    <main className="px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Jeep</h1>

      {/* Statistik Jeep */}
      <JeepStatistik {...dashboardData.statistik} />

      {/* Tabel Semua Jeep Tour */}
      <JeepTourTable jeepTours={jeepTours} />
    </main>
  );
}
