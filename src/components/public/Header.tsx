"use client";
import React, { useState } from "react";
import { MenuIcon, X, UserIcon, Globe, HelpCircle } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600 mr-8">Traveloka</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Flights
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Hotels
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Activities
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Car Rental
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Airport Transfer
            </a>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <Globe className="h-4 w-4 mr-1" />
            <span>EN</span>
          </a>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            <span>Help</span>
          </a>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <UserIcon className="h-4 w-4 mr-1" />
            <span>Login</span>
          </a>
          <a
            href="#"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Register
          </a>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Flights
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Hotels
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Activities
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Car Rental
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Airport Transfer
            </a>
            <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col space-y-4">
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <Globe className="h-4 w-4 mr-2" />
                <span>EN</span>
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                <span>Help</span>
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                <span>Login</span>
              </a>
              <a
                href="#"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
              >
                Register
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
