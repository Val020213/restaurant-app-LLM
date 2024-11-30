import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16">
      <section className="relative h-[500px] -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              Delicious Food,<br />Delivered to You
            </h1>
            <p className="text-xl mb-8">
              Experience the finest cuisine from our kitchen to your table
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
            >
              Order Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">
                    ${dish.price.toFixed(2)}
                  </span>
                  <Link
                    to="/menu"
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const featuredDishes = [
  {
    id: '1',
    name: 'Signature Burger',
    description: 'Premium beef patty with special sauce and fresh vegetables',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
  },
  {
    id: '2',
    name: 'Mediterranean Salad',
    description: 'Fresh greens with feta cheese, olives, and balsamic dressing',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999'
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002'
  }
];