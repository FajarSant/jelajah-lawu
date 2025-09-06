import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
export function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Traveloka</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Flights
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Hotels
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Flight + Hotel
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Activities
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Car Rental
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Business Partners</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Partner With Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Travel Agents
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Download App</h3>
            <p className="text-gray-300 mb-4">
              Book on the go with our mobile app
            </p>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="bg-black text-white px-3 py-2 rounded text-xs"
              >
                App Store
              </a>
              <a
                href="#"
                className="bg-black text-white px-3 py-2 rounded text-xs"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © 2023 Traveloka. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
