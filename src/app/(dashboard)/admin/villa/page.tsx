import VillaDashboardStatsCard from "@/components/Admin/villa/VillaStatusCard";
import { VillaTable } from "@/components/Admin/villa/VillaTable";
import { getVillaDashboardData } from "@/lib/actions/admin/villa/villa.actions";

export default async function VillaDashboardPage() {
  const data = await getVillaDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Villa</h1>

      <VillaDashboardStatsCard statistik={data.statistik} />

      <VillaTable villas={data.villas} />
    </div>
  );
}
