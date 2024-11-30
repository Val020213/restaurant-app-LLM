export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingOrders: number;
}

export interface OrderSummary {
  date: string;
  orders: number;
  revenue: number;
}

export interface CategorySummary {
  name: string;
  orders: number;
  revenue: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  image: string;
  status: 'active' | 'inactive';
}