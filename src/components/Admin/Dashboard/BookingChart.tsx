'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { BarChart3 } from 'lucide-react'

type BookingChartClientProps = {
  data?: {
    month: string
    total: number
  }[]
}

export function BookingChartClient({ data }: BookingChartClientProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500">
        <BarChart3 className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Grafik Booking Bulanan</h2>
      </div>

      {/* Chart */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                padding: '0.5rem 0.75rem',
              }}
              labelStyle={{ color: '#4b5563', fontWeight: 'bold' }}
            />
            <Bar
              dataKey="total"
              fill="url(#colorUv)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
