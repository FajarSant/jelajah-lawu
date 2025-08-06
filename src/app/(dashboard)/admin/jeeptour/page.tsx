// app/admin/jeep/page.tsx

import { JeepStatistik } from "@/components/Admin/jeeptour/JeepStatistik";
import { JeepTerbaruList } from "@/components/Admin/jeeptour/JeepTerbaruList";
import { JeepTourTable } from "@/components/Admin/jeeptour/JeepTourTable";
import { UlasanTerbaruList } from "@/components/Admin/jeeptour/UlasanTerbaruList";
import { getAllJeepTour } from "@/lib/actions/admin/jeep/jeep-action";
import { getJeepDashboardData } from "@/lib/actions/admin/jeep/jeep-action";

export default async function JeepDashboardPage() {
  const [dashboardData, jeepTours] = await Promise.all([
    getJeepDashboardData(),
    getAllJeepTour(),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Jeep</h1>

      {/* Statistik Jeep */}
      <JeepStatistik {...dashboardData.statistik} />

      {/* Jeep Tour Terbaru */}
      <JeepTerbaruList
        data={dashboardData.jeepTourTerbaru.map((j) => ({
          ...j,
          createdAt:
            j.createdAt instanceof Date
              ? j.createdAt.toISOString()
              : j.createdAt,
        }))}
      />

      {/* Ulasan Terbaru */}
      <UlasanTerbaruList
        data={dashboardData.ulasanTerbaru.map((u) => ({
          ...u,
          createdAt:
            u.createdAt instanceof Date
              ? u.createdAt.toISOString()
              : u.createdAt,
        }))}
      />

      {/* Tabel Semua Jeep Tour */}
      <JeepTourTable jeepTours={jeepTours} />
    </main>
  );
}
