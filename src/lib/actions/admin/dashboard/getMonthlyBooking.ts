'use server'

import { prisma } from '@/lib/prisma'
import { startOfYear, endOfYear } from 'date-fns'

export async function getMonthlyBooking() {
  try {
    const now = new Date()
    const start = startOfYear(now)
    const end = endOfYear(now)

    const bookings = await prisma.booking.findMany({
      where: {
        tanggal: {
          gte: start,
          lte: end,
        },
      },
      select: {
        tanggal: true,
      },
    })

    const monthlyCounts = new Array(12).fill(0)

    bookings.forEach((b) => {
      const month = new Date(b.tanggal).getMonth() // ✅ gunakan field 'tanggal'
      monthlyCounts[month]++
    })

    const namaBulan = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ]

    const result = namaBulan.map((nama, index) => ({
      month: nama,
      total: monthlyCounts[index],
    }))

    return { success: true, data: result }
  } catch (error) {
    console.error('Gagal mengambil data booking bulanan:', error)
    return { success: false, message: 'Gagal mengambil data' }
  }
}
