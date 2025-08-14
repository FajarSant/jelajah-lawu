'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'

type FavoriteCategoryPieProps = {
  data: { name: string; value: number }[]
}

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444']

export function FavoriteCategoryPieClient({ data }: FavoriteCategoryPieProps) {
  console.log('FavoriteCategory Data:', data)

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <PieChartIcon className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Kategori Favorit</h2>
      </div>

      {/* Chart */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={85}
              dataKey="value"
              label={({ name, value }) => `${name} (${value})`}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                padding: '0.5rem 0.75rem',
              }}
              labelStyle={{ color: '#4b5563', fontWeight: 'bold' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
