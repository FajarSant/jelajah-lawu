import { AdminCard } from "@/components/Admin/Dashboard/Admin-Card";
import { AdminNotifications } from "@/components/Admin/Dashboard/AdminNotifications";
import { RecentActivities } from "@/components/Admin/Dashboard/RecentActivities";
import { DashboardChart } from "@/components/Admin/Dashboard/Dashboard-Chart";
import { Users, CalendarCheck, DollarSign, Star } from "lucide-react";
import { getRecentActivities } from "@/lib/actions/admin/dashboard/getRecentActivities";
import { getAdminNotifications } from "@/lib/actions/admin/dashboard/getAdminNotifications";
import {
  getAdminStats,
  getFavoriteCategory,
  getMonthlyBooking,
} from "@/lib/actions/admin/dashboard/dashboard-action";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const monthlyBookingResult = await getMonthlyBooking();
  const favoriteCategoryResult = await getFavoriteCategory();
  const { bookings, reviews } = await getRecentActivities();
  const notifications = await getAdminNotifications();

  if (!monthlyBookingResult.success || !favoriteCategoryResult.success) {
    return <p className="text-red-500">Gagal memuat data</p>;
  }

  return (
    <main className="px-4 py-8 space-y-6">
      {/* ─── Statistik utama ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard
          title="Total Pengguna"
          value={stats.data.totalPengguna ?? 0}
          icon={Users}
          gradient="from-blue-500 to-indigo-500"
        />
        <AdminCard
          title="Total Booking"
          value={stats.data.totalBooking ?? 0}
          icon={CalendarCheck}
          gradient="from-green-500 to-emerald-500"
        />
        <AdminCard
          title="Total Pendapatan"
          value={`Rp ${
            stats.data.totalPendapatan?.toLocaleString("id-ID") ?? "0"
          }`}
          icon={DollarSign}
          gradient="from-yellow-500 to-orange-500"
        />
        <AdminCard
          title="Total Rating"
          value={`${stats.data.totalRating ?? 0} / 5`}
          icon={Star}
          gradient="from-pink-500 to-purple-500"
        />
      </div>

      {/* ─── Gabungan Chart Custom ─────────────────────────────── */}
      <div className="bg-white dark:bg-muted rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Analisis Dashboard</h2>
        <DashboardChart
          revenueData={monthlyBookingResult.data ?? []}
          favoriteData={favoriteCategoryResult.data ?? []}
        />
      </div>

      {/* ─── Aktivitas & Notifikasi ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-muted rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
          <RecentActivities bookings={bookings} reviews={reviews} />
        </div>
        <div className="bg-white dark:bg-muted rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Notifikasi Admin</h2>
          <AdminNotifications initialNotifications={notifications} />
        </div>
      </div>
    </main>
  );
}
