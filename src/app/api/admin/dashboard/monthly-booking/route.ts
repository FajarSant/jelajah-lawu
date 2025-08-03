import { NextResponse } from 'next/server'
import { getMonthlyBooking } from '@/lib/actions/admin/dashboard/getMonthlyBooking'

export async function GET() {
  const result = await getMonthlyBooking()
  return NextResponse.json(result)
}
