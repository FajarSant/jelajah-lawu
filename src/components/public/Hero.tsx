"use client"
import React, { useState } from 'react'
import { Plane, Hotel, MapPin, Calendar, Search } from 'lucide-react'
export function Hero() {
  const [activeTab, setActiveTab] = useState('flights')
  return (
    <div className="bg-blue-600 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Find Your Perfect Trip
        </h1>
        <p className="text-white text-lg mb-8">
          Discover amazing places at exclusive deals
        </p>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`flex items-center px-4 py-2 ${activeTab === 'flights' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`}
              onClick={() => setActiveTab('flights')}
            >
              <Plane className="w-5 h-5 mr-2" />
              <span>Flights</span>
            </button>
            <button
              className={`flex items-center px-4 py-2 ${activeTab === 'hotels' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`}
              onClick={() => setActiveTab('hotels')}
            >
              <Hotel className="w-5 h-5 mr-2" />
              <span>Hotels</span>
            </button>
          </div>
          {activeTab === 'flights' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <div className="flex items-center border border-gray-300 rounded p-2">
                    <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                    <input
                      type="text"
                      placeholder="City or Airport"
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <div className="flex items-center border border-gray-300 rounded p-2">
                    <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                    <input
                      type="text"
                      placeholder="City or Airport"
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure
                  </label>
                  <div className="flex items-center border border-gray-300 rounded p-2">
                    <Calendar className="text-gray-400 w-5 h-5 mr-2" />
                    <input
                      type="text"
                      placeholder="Select Date"
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Return
                  </label>
                  <div className="flex items-center border border-gray-300 rounded p-2">
                    <Calendar className="text-gray-400 w-5 h-5 mr-2" />
                    <input
                      type="text"
                      placeholder="Select Date"
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Search Flights
              </button>
            </div>
          )}
          {activeTab === 'hotels' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <div className="flex items-center border border-gray-300 rounded p-2">
                  <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    placeholder="City, area, or property"
                    className="w-full focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <div className="flex items-center border border-gray-300 rounded p-2">
                    <Calendar className="text-gray-400 w-5 h-5 mr-2" />
                    <input
                      type="text"
                      placeholder="Select Date"
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <div className="flex items-center border border-gray-300 rounded p-2">
                    <Calendar className="text-gray-400 w-5 h-5 mr-2" />
                    <input
                      type="text"
                      placeholder="Select Date"
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Search Hotels
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
