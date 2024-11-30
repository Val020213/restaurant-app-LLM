import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart, Menu, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Notifications } from './Notifications';

export function Layout() {
  const cart = useStore((state) => state.cart);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Menu className="w-8 h-8 text-orange-600" />
            <span className="text-xl font-bold text-gray-900">FoodieHub</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/menu" className="text-gray-700 hover:text-orange-600">
              Menu
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-orange-600">
              <User className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-600" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Notifications />

      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Phone: (555) 123-4567</p>
              <p>Email: contact@foodiehub.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <p>Mon-Fri: 11:00 AM - 10:00 PM</p>
              <p>Sat-Sun: 12:00 PM - 11:00 PM</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-orange-400">Instagram</a>
                <a href="#" className="hover:text-orange-400">Facebook</a>
                <a href="#" className="hover:text-orange-400">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}