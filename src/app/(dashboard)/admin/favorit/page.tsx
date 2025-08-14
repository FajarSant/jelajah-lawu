import FavoriteDashboardStatsCard from "@/components/Admin/Favorit/FavoritStastistik";
import FavoriteTable from "@/components/Admin/Favorit/FavoritTable";
import {
  getFavoriteDashboardStats,
  getLatestFavorites,
} from "@/lib/actions/admin/favorit/favorit-action";

export default async function FavoriteDashboardPage() {
  const stats = await getFavoriteDashboardStats();
  const latestFavorites = await getLatestFavorites(10);

  const defaultStats = {
    totalFavorite: 0,
    totalPerKategori: { destinasi: 0, jeep: 0, villa: 0, restoran: 0 },
  };

  const mappedFavorites =
    latestFavorites.data?.map((f) => ({
      ...f,
      kategori: f.kategori.toUpperCase() as
        | "DESTINASI"
        | "JEEP"
        | "VILLA"
        | "RESTORAN",
      tanggal: new Date(f.tanggal).toISOString(),
    })) ?? [];

  return (
    <main className="px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Favorit</h1>

      {/* Stats Card */}
      <FavoriteDashboardStatsCard statistik={stats.data ?? defaultStats} />

      {/* Favorit Terbaru */}
      <div>
        <FavoriteTable favorites={mappedFavorites} />
      </div>
    </main>
  );
}
