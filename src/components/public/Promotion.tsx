import React from 'react'
export function Promotions() {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Special Offers & Promotions
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Exclusive deals and discounts for your next trip
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg overflow-hidden shadow-lg">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-2">
                Flight Sale: Up to 25% Off
              </h3>
              <p className="mb-4">
                Book your next adventure with our special discount on
                international flights
              </p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
                Book Now
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-lg overflow-hidden shadow-lg">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Hotel Deals: 30% Off</h3>
              <p className="mb-4">
                Enjoy premium accommodations at discounted rates for your next
                vacation
              </p>
              <button className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100">
                View Deals
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800">
                Subscribe to our Newsletter
              </h3>
              <p className="text-gray-600">
                Get the latest deals and special offers straight to your inbox
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="border border-gray-300 rounded-l px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
