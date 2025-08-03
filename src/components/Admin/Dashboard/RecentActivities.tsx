import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck2, MessageSquareText } from "lucide-react"
import { FormattedBooking, FormattedReview } from "@/types/dashboard"
import { format } from "date-fns"

type Props = {
  bookings: FormattedBooking[]
  reviews: FormattedReview[]
}

export function RecentActivities({ bookings, reviews }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Pemesanan Terbaru */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck2 className="w-5 h-5 text-primary" />
            Pemesanan Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada pemesanan.</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {bookings.map((b) => (
                <div key={b.id} className="border p-3 rounded-md">
                  <p className="font-medium">{b.user.name} memesan {b.jenis}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(b.tanggal), "dd MMM yyyy, HH:mm")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ulasan Terbaru */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareText className="w-5 h-5 text-primary" />
            Ulasan Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada ulasan.</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {reviews.map((r) => (
                <div key={r.id} className="border p-3 rounded-md">
                  <p className="font-medium">{r.user.name}</p>
                  <p className="text-sm text-muted-foreground">"{r.komentar}"</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
