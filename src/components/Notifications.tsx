import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export function Notifications() {
  const { notifications, removeNotification } = useStore();

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration !== 0) {
        const timer = setTimeout(() => {
          removeNotification(notification.id);
        }, notification.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center p-4 rounded-lg shadow-lg ${
            {
              success: 'bg-green-100 text-green-800',
              error: 'bg-red-100 text-red-800',
              info: 'bg-blue-100 text-blue-800',
            }[notification.type]
          }`}
        >
          {notification.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
          {notification.type === 'error' && <AlertCircle className="w-5 h-5 mr-2" />}
          {notification.type === 'info' && <Info className="w-5 h-5 mr-2" />}
          <p className="mr-4">{notification.message}</p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}