'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'

interface AdminNotificationsProps {
  initialNotifications: string[]
}

export function AdminNotifications({ initialNotifications }: AdminNotificationsProps) {
  const [notifications] = useState<string[]>(initialNotifications)

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500">
        <Bell className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Notifikasi</h2>
      </div>

      {/* List */}
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {notifications.length > 0 ? (
          notifications.map((notif, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="inline-block w-2 h-2 mt-1 rounded-full bg-yellow-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{notif}</span>
            </li>
          ))
        ) : (
          <li className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 italic">
            Tidak ada notifikasi baru
          </li>
        )}
      </ul>
    </div>
  )
}
