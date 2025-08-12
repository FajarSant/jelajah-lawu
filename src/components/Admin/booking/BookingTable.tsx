"use client";

interface BookingTableProps {
  bookings: {
    id: string;
    namaUser: string;
    kategori: string;
    namaItem: string;
    status: string;
    totalHarga: number;
    tanggal: Date;
  }[];
}

export function BookingTable({ bookings }: BookingTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nama User</th>
            <th className="p-3 text-left">Kategori</th>
            <th className="p-3 text-left">Nama Item</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Total Harga</th>
            <th className="p-3 text-left">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                Tidak ada booking terbaru
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-3">{b.namaUser}</td>
                <td className="p-3">{b.kategori}</td>
                <td className="p-3">{b.namaItem}</td>
                <td className="p-3">{b.status}</td>
                <td className="p-3">Rp {b.totalHarga.toLocaleString()}</td>
                <td className="p-3">{new Date(b.tanggal).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
