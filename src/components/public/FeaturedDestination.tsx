import React from 'react'
import { MapPin } from 'lucide-react'
export function FeaturedDestinations() {
  const destinations = [
    {
      name: 'Bali',
      image:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Island paradise with beaches and cultural attractions',
      price: 'From $250',
    },
    {
      name: 'Singapore',
      image:
        'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Modern city with iconic architecture and attractions',
      price: 'From $320',
    },
    {
      name: 'Tokyo',
      image:
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Vibrant metropolis blending tradition and innovation',
      price: 'From $450',
    },
    {
      name: 'Bangkok',
      image:
        'https://images.unsplash.com/photo-1508009603885-50cf7c579365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Cultural hub with temples and bustling markets',
      price: 'From $200',
    },
  ]
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Popular Destinations
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Explore these amazing places with exclusive deals
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-blue-600 mr-1" />
                  <h3 className="font-bold text-gray-800">
                    {destination.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {destination.description}
                </p>
                <p className="text-blue-600 font-bold">{destination.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            View All Destinations
          </button>
        </div>
      </div>
    </div>
  )
}
