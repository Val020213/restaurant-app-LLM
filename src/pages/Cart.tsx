import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { format, addHours } from 'date-fns';

export function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, addOrder, addNotification } = useStore();
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryTime, setDeliveryTime] = useState<string>('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      addNotification({
        message: 'Item removed from cart',
        type: 'info',
        duration: 3000,
      });
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!deliveryTime) return;

    const order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total,
      deliveryTime: new Date(deliveryTime),
      status: 'pending' as const,
      deliveryType,
    };

    addOrder(order);
    clearCart();
    addNotification({
      message: 'Order placed successfully!',
      type: 'success',
      duration: 5000,
    });
    navigate('/profile');
  };

  // Generate available time slots
  const timeSlots = Array.from({ length: 8 }, (_, i) => {
    const date = addHours(new Date(), i + 1);
    return format(date, "yyyy-MM-dd'T'HH:mm");
  });

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious items from our menu!</p>
        <button
          onClick={() => navigate('/menu')}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => {
                  removeFromCart(item.id);
                  addNotification({
                    message: 'Item removed from cart',
                    type: 'info',
                    duration: 3000,
                  });
                }}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setDeliveryType('delivery')}
              className={`flex-1 py-3 px-4 rounded-lg border ${
                deliveryType === 'delivery'
                  ? 'border-orange-600 bg-orange-50 text-orange-600'
                  : 'border-gray-300'
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => setDeliveryType('pickup')}
              className={`flex-1 py-3 px-4 rounded-lg border ${
                deliveryType === 'pickup'
                  ? 'border-orange-600 bg-orange-50 text-orange-600'
                  : 'border-gray-300'
              }`}
            >
              Pickup
            </button>
          </div>
          <select
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select delivery time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {format(new Date(slot), 'h:mm a')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-4">
          <span className="text-lg">Total:</span>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={!deliveryTime}
          className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}