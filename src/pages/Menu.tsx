import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { MenuItem } from '../types';
import { Plus } from 'lucide-react';

const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart, addNotification } = useStore();

  const filteredMenu = menuItems.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const handleAddToCart = (item: MenuItem) => {
    addToCart({ ...item, quantity: 1 });
    addNotification({
      message: `${item.name} added to cart`,
      type: 'success',
      duration: 3000,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h1>
      
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-orange-600">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Signature Burger',
    description: 'Premium beef patty with special sauce and fresh vegetables',
    price: 14.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
  },
  {
    id: '2',
    name: 'Mediterranean Salad',
    description: 'Fresh greens with feta cheese, olives, and balsamic dressing',
    price: 12.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999'
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    price: 16.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002'
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 8.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51'
  },
  {
    id: '5',
    name: 'Craft Lemonade',
    description: 'Fresh squeezed lemonade with mint and honey',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859'
  }
];