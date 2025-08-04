import { JeepStatistik } from "@/components/Admin/jeeptour/JeepStatistik";
import { JeepTerbaruList } from "@/components/Admin/jeeptour/JeepTerbaruList";
import { JeepTourTable } from "@/components/Admin/jeeptour/JeepTourTable";
import { UlasanTerbaruList } from "@/components/Admin/jeeptour/UlasanTerbaruList";
import { getAllJeepTour } from "@/lib/actions/admin/jeep/jeeptour-actions";
import { getJeepDashboardData } from "@/lib/actions/admin/jeep/Jeep-Dashboard";

export default async function JeepDashboardPage() {
  const { statistik, jeepTourTerbaru, ulasanTerbaru } =
    await getJeepDashboardData();
      const jeepTours = await getAllJeepTour();


  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Jeep</h1>

      <JeepStatistik {...statistik} />
      <JeepTerbaruList
        data={jeepTourTerbaru.map((j) => ({
          ...j,
          createdAt: j.createdAt.toISOString(), // ubah Date ke string
        }))}
      />

      <UlasanTerbaruList
        data={ulasanTerbaru.map((u) => ({
          ...u,
          createdAt: u.createdAt.toISOString(), // ubah Date ke string
        }))}
      />

            <JeepTourTable jeepTours={jeepTours} />

    </main>
  );
}
