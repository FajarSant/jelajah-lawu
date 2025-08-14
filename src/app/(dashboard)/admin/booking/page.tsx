import BookingStatsCard from "@/components/Admin/booking/BookingStatusCard";
import { BookingTable } from "@/components/Admin/booking/BookingTable";
import { getBookingDashboardData } from "@/lib/actions/booking/booking-actions";

export default async function BookingDashboardPage() {
  const data = await getBookingDashboardData();

  return (
    <main className="px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Booking</h1>
      <BookingStatsCard statistik={data.statistik} />
      <BookingTable bookings={data.bookings} />
    </main>
  );
}
