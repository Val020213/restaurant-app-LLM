import { create } from 'zustand';
import { MenuItem } from '../types';
import { NotificationGroup, BulkNotification } from '../types/admin';

interface AdminStore {
  products: MenuItem[];
  notificationGroups: NotificationGroup[];
  sentNotifications: BulkNotification[];
  addProduct: (product: MenuItem) => void;
  updateProduct: (id: string, product: Partial<MenuItem>) => void;
  deleteProduct: (id: string) => void;
  addNotificationGroup: (group: NotificationGroup) => void;
  updateNotificationGroup: (id: string, group: Partial<NotificationGroup>) => void;
  deleteNotificationGroup: (id: string) => void;
  sendBulkNotification: (notification: BulkNotification) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  products: [],
  notificationGroups: [],
  sentNotifications: [],
  
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
    
  updateProduct: (id, product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...product } : p
      ),
    })),
    
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
    
  addNotificationGroup: (group) =>
    set((state) => ({
      notificationGroups: [...state.notificationGroups, group],
    })),
    
  updateNotificationGroup: (id, group) =>
    set((state) => ({
      notificationGroups: state.notificationGroups.map((g) =>
        g.id === id ? { ...g, ...group } : g
      ),
    })),
    
  deleteNotificationGroup: (id) =>
    set((state) => ({
      notificationGroups: state.notificationGroups.filter((g) => g.id !== id),
    })),
    
  sendBulkNotification: (notification) =>
    set((state) => ({
      sentNotifications: [...state.sentNotifications, notification],
    })),
}));