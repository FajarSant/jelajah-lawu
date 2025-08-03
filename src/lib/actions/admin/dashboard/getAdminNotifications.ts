'use server'

import { prisma } from '@/lib/prisma'

export async function getAdminNotifications(): Promise<string[]> {
  const [reviewPending, bookingPending, restoranPending, userBaru] = await Promise.all([
    prisma.review.count({ where: { isVerified: false } }), // butuh field isVerified di model Review
    prisma.booking.count({ where: { status: 'DIPROSES' } }),
    prisma.restoran.count({ where: { isApproved: false } }), // butuh field isApproved di model Restoran
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    }),
  ])

  const notifications: string[] = []

  if (reviewPending > 0) {
    notifications.push(`${reviewPending} ulasan menunggu verifikasi`)
  }

  if (bookingPending > 0) {
    notifications.push(`${bookingPending} pemesanan baru belum diproses`)
  }

  if (restoranPending > 0) {
    notifications.push(`${restoranPending} restoran menunggu approval`)
  }

  if (userBaru > 0) {
    notifications.push(`${userBaru} pengguna baru bergabung minggu ini`)
  }

  return notifications.length > 0 ? notifications : ['Tidak ada notifikasi saat ini']
}
