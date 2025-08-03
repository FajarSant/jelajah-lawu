'use server'

import { prisma } from '@/lib/prisma'
import { FormattedBooking, FormattedReview } from '@/types/dashboard'

export async function getRecentActivities(): Promise<{
  bookings: FormattedBooking[]
  reviews: FormattedReview[]
}> {
  const [bookings, reviews] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { tanggal: 'desc' },
      take: 5,
      include: {
        user: { select: { name: true } },
        destinasi: { select: { nama: true } },
        jeepTour: { select: { nama: true } },
        restoran: { select: { nama: true } },
        villa: { select: { nama: true } },
      },
    }),
    prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        user: { select: { name: true } },
      },
    }),
  ])

  const formattedBookings: FormattedBooking[] = bookings.map((b) => ({
    id: b.id,
    user: { name: b.user?.name || 'Pengguna' },
    tanggal: b.tanggal,
    jenis:
      b.destinasi?.nama ??
      b.jeepTour?.nama ??
      b.restoran?.nama ??
      b.villa?.nama ??
      'Booking',
  }))

  const formattedReviews: FormattedReview[] = reviews.map((r) => ({
    id: r.id,
    user: { name: r.user?.name || 'Pengguna' },
    komentar: r.komentar || '',
  }))

  return {
    bookings: formattedBookings,
    reviews: formattedReviews,
  }
}
