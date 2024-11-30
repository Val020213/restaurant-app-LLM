export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'customer';
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface NotificationGroup {
  id: string;
  name: string;
  users: User[];
}

export interface BulkNotification {
  title: string;
  message: string;
  groups: string[];
  type: 'promotion' | 'announcement' | 'update';
}