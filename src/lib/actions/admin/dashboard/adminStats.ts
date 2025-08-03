'use server'

import { prisma } from '@/lib/prisma'

export async function getAdminStats() {
  try {
    const [
      totalDestinasi,
      totalJeepTour,
      totalVilla,
      totalRestoran,
      totalBooking,
      totalReview,
      totalFavorit,
      totalUser,
    ] = await Promise.all([
      prisma.destinasi.count(),
      prisma.jeepTour.count(),
      prisma.villa.count(),
      prisma.restoran.count(),
      prisma.booking.count(),
      prisma.review.count(),
      prisma.favorite.count(),
      prisma.user.count(),
    ])

    return {
      totalDestinasi,
      totalJeepTour,
      totalVilla,
      totalRestoran,
      totalBooking,
      totalReview,
      totalFavorit,
      totalUser,
    }
  } catch (error) {
    console.error('Gagal mengambil statistik admin:', error)
    throw new Error('Gagal memuat data statistik')
  }
}
