'use client'

import { Card, CardContent } from '@/components/ui/card'
import { CalendarCheck2, MessageSquareText } from 'lucide-react'
import { FormattedBooking, FormattedReview } from '@/types/dashboard'
import { format } from 'date-fns'

type Props = {
  bookings: FormattedBooking[]
  reviews: FormattedReview[]
}

export function RecentActivities({ bookings, reviews }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Pemesanan Terbaru */}
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500">
          <CalendarCheck2 className="w-5 h-5 text-white" />
          <h2 className="text-lg font-semibold text-white">Pemesanan Terbaru</h2>
        </div>
        <CardContent className="p-4">
          {bookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada pemesanan.</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {b.user.name} memesan {b.jenis}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(b.tanggal), 'dd MMM yyyy, HH:mm')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ulasan Terbaru */}
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500">
          <MessageSquareText className="w-5 h-5 text-white" />
          <h2 className="text-lg font-semibold text-white">Ulasan Terbaru</h2>
        </div>
        <CardContent className="p-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada ulasan.</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {r.user.name}
                  </p>
                  <p className="text-sm italic text-gray-500">"{r.komentar}"</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(107, 114, 128, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  )
}
