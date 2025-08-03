'use client'

import { useEffect, useState } from 'react'

interface AdminNotificationsProps {
  initialNotifications: string[]
}

export function AdminNotifications({ initialNotifications }: AdminNotificationsProps) {
  const [notifications, setNotifications] = useState<string[]>(initialNotifications)

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Notifikasi</h2>
      <ul className="space-y-3 text-sm">
        {notifications.map((notif, idx) => (
          <li
            key={idx}
            className="flex items-start p-3 bg-muted border border-gray-200 dark:border-gray-700 rounded-md"
          >
            <span className="inline-block w-2 h-2 mt-1 mr-2 rounded-full bg-yellow-500" />
            <span>{notif}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
