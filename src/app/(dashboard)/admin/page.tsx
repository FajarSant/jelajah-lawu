import { AdminCard } from "@/components/Admin/Admin-Card";
import { AdminNotifications } from "@/components/Admin/AdminNotifications";
import { BookingChartClient } from "@/components/Admin/BookingChart";
import { FavoriteCategoryPieClient } from "@/components/Admin/FavoriteCategoryPie";
import { getAdminStats } from "@/lib/actions/dashboard/adminStats";
import { getMonthlyBooking } from "@/lib/actions/dashboard/getMonthlyBooking";
import { getFavoriteCategory } from "@/lib/actions/dashboard/getFavoriteCategory";
import { Bed, CalendarCheck, Car, MapPin, Star, Utensils } from "lucide-react";
import { getRecentActivities } from "@/lib/actions/dashboard/getRecentActivities";
import { RecentActivities } from "@/components/Admin/RecentActivities";
import { getAdminNotifications } from "@/lib/actions/dashboard/getAdminNotifications";

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
    <div className="p-6 space-y-8">
      {/* Kartu statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <AdminCard
          title="Destinasi"
          value={stats.totalDestinasi}
          icon={MapPin}
        />
        <AdminCard title="Jeep Tour" value={stats.totalJeepTour} icon={Car} />
        <AdminCard title="Villa" value={stats.totalVilla} icon={Bed} />
        <AdminCard
          title="Restoran"
          value={stats.totalRestoran}
          icon={Utensils}
        />
        <AdminCard
          title="Booking"
          value={stats.totalBooking}
          icon={CalendarCheck}
        />
        <AdminCard title="Ulasan" value={stats.totalReview} icon={Star} />
      </div>

      {/* Grafik dan Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-muted rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            Statistik Booking Bulanan
          </h2>
          <BookingChartClient data={monthlyBookingResult.data ?? []} />
        </div>
        <div className="bg-white dark:bg-muted rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            Kategori Favorit Pengguna
          </h2>
          <FavoriteCategoryPieClient data={favoriteCategoryResult.data ?? []} />
        </div>
      </div>

      {/* Aktivitas & Notifikasi */}
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
    </div>
  );
}
