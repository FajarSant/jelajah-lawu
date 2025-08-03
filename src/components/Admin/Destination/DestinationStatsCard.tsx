'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'

type Statistik = {
  totalDestinasi: number
  rataRataHarga: number
  totalReview: number
  totalFavorit: number
  totalBooking: number
}

type DestinasiBaru = {
  id: string
  nama: string
  lokasi: string
  harga: number
  vendorNama: string | null
  totalUlasan: number
  totalFavorit: number
  createdAt: Date
}

type UlasanBaru = {
  id: string
  komentar: string | null
  nilai: number
  createdAt: Date
  user: {
    name: string | null
  }
  destinasi: {
    nama: string
  }
}

type Props = {
  statistik: Statistik
  destinasiBaru: DestinasiBaru[]
  ulasanBaru: UlasanBaru[]
}

export default function DestinationDashboard({ statistik, destinasiBaru, ulasanBaru }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Statistik */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Statistik Destinasi</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatItem label="Total Destinasi" value={statistik.totalDestinasi} />
          <StatItem label="Rata-rata Harga" value={`Rp${statistik.rataRataHarga.toLocaleString()}`} />
          <StatItem label="Total Ulasan" value={statistik.totalReview} />
          <StatItem label="Total Favorit" value={statistik.totalFavorit} />
          <StatItem label="Total Booking" value={statistik.totalBooking} />
        </CardContent>
      </Card>

      {/* Destinasi Terbaru */}
      <Card>
        <CardHeader>
          <CardTitle>Destinasi Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {destinasiBaru.map((d) => (
                <div key={d.id} className="text-sm">
                  <p className="font-semibold">{d.nama}</p>
                  <p className="text-muted-foreground">{d.lokasi} - Rp{d.harga.toLocaleString()}</p>
                  <p className="text-muted-foreground">Vendor: {d.vendorNama || 'Tidak diketahui'}</p>
                  <p className="text-muted-foreground">
                    {d.totalUlasan} ulasan · {d.totalFavorit} favorit
                  </p>
                  <p className="text-xs text-gray-500">{format(new Date(d.createdAt), 'dd MMM yyyy')}</p>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Ulasan Terbaru */}
      <Card>
        <CardHeader>
          <CardTitle>Ulasan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {ulasanBaru.map((r) => (
                <div key={r.id} className="text-sm">
                  <p className="font-semibold">{r.user.name || 'Pengguna tidak diketahui'}</p>
                  <p className="text-muted-foreground">{r.destinasi.nama}</p>
                  <p className="text-muted-foreground">"{r.komentar}"</p>
                  <p className="text-muted-foreground">Nilai: {r.nilai}</p>
                  <p className="text-xs text-gray-500">{format(new Date(r.createdAt), 'dd MMM yyyy')}</p>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  )
}
