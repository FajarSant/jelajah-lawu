"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { getLatestFavorites } from "@/lib/actions/admin/favorit/favorit-action";

interface FavoriteItem {
  id: string;
  namaUser: string;
  kategori: "DESTINASI" | "JEEP" | "VILLA" | "RESTORAN";
  namaItem: string;
  tanggal: string; // simpan sebagai string
}

interface FavoriteTableProps {
  favorites?: FavoriteItem[];
}

export default function FavoriteTable({ favorites: initialFavorites = [] }: FavoriteTableProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites);
  const [loading, setLoading] = useState(!initialFavorites.length);

  useEffect(() => {
    if (initialFavorites.length) return; // kalau sudah ada data, jangan fetch lagi
    const fetchFavorites = async () => {
      setLoading(true);
      const res = await getLatestFavorites(10);
      if (res.success && res.data) {
        // konversi tanggal ke string
        const formatted: FavoriteItem[] = res.data.map((f: any) => ({
          ...f,
          tanggal: new Date(f.tanggal).toISOString(),
        }));
        setFavorites(formatted);
      }
      setLoading(false);
    };
    fetchFavorites();
  }, [initialFavorites]);

  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Favorit Terbaru</h2>

        {loading ? (
          <div className="flex justify-center py-10 text-gray-500">
            <Loader2 className="animate-spin w-6 h-6" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Nama Item</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {favorites.length > 0 ? (
                favorites.map((fav) => (
                  <TableRow key={fav.id}>
                    <TableCell>{fav.namaUser}</TableCell>
                    <TableCell>{fav.kategori}</TableCell>
                    <TableCell>{fav.namaItem}</TableCell>
                    <TableCell>
                      {new Date(fav.tanggal).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
