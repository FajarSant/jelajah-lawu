
import RestoranDashboardStatsCard from "@/components/Admin/Restoran/RestoranStatusCard";
import { RestoranTable } from "@/components/Admin/Restoran/RestoranTable";
import { getRestoranDashboardData } from "@/lib/actions/admin/restoran/restoran-action";

export default async function RestoranDashboardPage() {
  const data = await getRestoranDashboardData();

  return (
    <main className="px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Restoran</h1>

      <RestoranDashboardStatsCard statistik={data.statistik} />
      <RestoranTable restorans={data.restorant} />
    </main>
  );
}
