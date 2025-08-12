"use client";

interface BookingStatProps {
  statistik: {
    totalBooking: number;
    totalPerKategori: { destinasi: number; jeep: number; villa: number; restoran: number };
    totalPerStatus: { DIPROSES: number; SELESAI: number; DIBATALKAN: number };
  };
}

export default function BookingStatusCard({ statistik }: BookingStatProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Booking</h3>
        <p className="text-2xl font-bold">{statistik.totalBooking}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Per Kategori</h3>
        <ul className="text-sm">
          <li>Destinasi: {statistik.totalPerKategori.destinasi}</li>
          <li>Jeep: {statistik.totalPerKategori.jeep}</li>
          <li>Villa: {statistik.totalPerKategori.villa}</li>
          <li>Restoran: {statistik.totalPerKategori.restoran}</li>
        </ul>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Per Status</h3>
        <ul className="text-sm">
          <li>Diproses: {statistik.totalPerStatus.DIPROSES}</li>
          <li>Selesai: {statistik.totalPerStatus.SELESAI}</li>
          <li>Dibatalkan: {statistik.totalPerStatus.DIBATALKAN}</li>
        </ul>
      </div>
    </div>
  );
}
