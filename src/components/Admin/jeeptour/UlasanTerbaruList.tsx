interface Ulasan {
  namaUser: string;
  jeepTourNama: string;
  rating: number;
  komentar: string | null;
  createdAt: string;
}

export function UlasanTerbaruList({ data }: { data: Ulasan[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Ulasan Terbaru</h2>
      <ul className="space-y-3">
        {data.map((u, i) => (
          <li key={i} className="border p-3 rounded-md">
            <div className="text-sm font-semibold">
              {u.namaUser} memberi {u.rating} ⭐ ke <span className="text-primary">{u.jeepTourNama}</span>
            </div>
            {u.komentar && <p className="text-sm text-muted-foreground mt-1">"{u.komentar}"</p>}
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(u.createdAt).toLocaleDateString("id-ID")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
