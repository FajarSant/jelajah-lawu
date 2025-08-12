import BookingStatusCard from "@/components/Admin/booking/BookingStatusCard";
import { BookingTable } from "@/components/Admin/booking/BookingTable";
import { getBookingDashboardStats, getLatestBookings } from "@/lib/actions/booking/booking-actions";

export default async function BookingDashboardPage() {
  const stats = await getBookingDashboardStats();
  const latestBookings = await getLatestBookings(10);

  const defaultStats = {
    totalBooking: 0,
    totalPerKategori: { destinasi: 0, jeep: 0, villa: 0, restoran: 0 },
    totalPerStatus: { DIPROSES: 0, SELESAI: 0, DIBATALKAN: 0 },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Booking</h1>

      <BookingStatusCard statistik={stats.data ?? defaultStats} />

      <div>
        <h2 className="text-lg font-semibold mb-4">Booking Terbaru</h2>
        <BookingTable bookings={latestBookings.data ?? []} />
      </div>
    </div>
  );
}
