'use server'

import { prisma } from '@/lib/prisma'

export async function getFavoriteCategory() {
  try {
    const counts = await prisma.favorite.groupBy({
      by: ['tipe'],
      _count: {
        _all: true,
      },
    })
    // console.log("HASIL GROUP BY:", counts)


    const formatted = counts.map((item) => ({
      name: formatTipeFavorit(item.tipe), // tampilkan nama user-friendly
      value: item._count._all,
    }))

    return { success: true, data: formatted }
  } catch (error) {
    console.error('Gagal mengambil data kategori favorit:', error)
    return { success: false, message: 'Gagal mengambil data kategori favorit' }
  }
}

function formatTipeFavorit(tipe: string): string {
  switch (tipe) {
    case 'JeepTour':
      return 'Jeep Tour'
    case 'Villa':
      return 'Villa'
    case 'Restoran':
      return 'Restoran'
    case 'Destinasi':
      return 'Destinasi'
    default:
      return tipe
  }
}
