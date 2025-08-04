interface JeepTour {
  id: string;
  nama: string;
  lokasi: string;
  harga: number;
  kapasitas: number;
  vendorNama: string;
  createdAt: string;
}

export function JeepTerbaruList({ data }: { data: JeepTour[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Jeep Tour Terbaru</h2>
      <div className="border rounded-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-left">
              <th className="p-2">Nama</th>
              <th className="p-2">Lokasi</th>
              <th className="p-2">Harga</th>
              <th className="p-2">Kapasitas</th>
              <th className="p-2">Vendor</th>
              <th className="p-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="p-2">{j.nama}</td>
                <td className="p-2">{j.lokasi}</td>
                <td className="p-2">Rp{j.harga.toLocaleString()}</td>
                <td className="p-2">{j.kapasitas}</td>
                <td className="p-2">{j.vendorNama}</td>
                <td className="p-2">{new Date(j.createdAt).toLocaleDateString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
