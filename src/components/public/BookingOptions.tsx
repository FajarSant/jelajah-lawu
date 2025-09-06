import React from 'react'
import {
  Plane,
  Hotel,
  Map,
  Car,
  Briefcase,
  Ticket,
  CreditCard,
} from 'lucide-react'
export function BookingOptions() {
  const options = [
    {
      icon: <Plane className="h-6 w-6" />,
      title: 'Flights',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <Hotel className="h-6 w-6" />,
      title: 'Hotels',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: 'Activities',
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: 'Car Rental',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Airport Transfer',
      color: 'bg-red-50 text-red-600',
    },
    {
      icon: <Ticket className="h-6 w-6" />,
      title: 'Attractions',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Gift Cards',
      color: 'bg-pink-50 text-pink-600',
    },
  ]
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          What would you like to book?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {options.map((option, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`rounded-full p-4 mb-2 ${option.color}`}>
                {option.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {option.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
