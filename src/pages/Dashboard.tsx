import React from 'react';
import { ShoppingBag, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { OrdersChart } from '../components/dashboard/OrdersChart';
import { CategoryStats } from '../components/dashboard/CategoryStats';
import { StaffList } from '../components/dashboard/StaffList';
import { DashboardStats, OrderSummary, CategorySummary, StaffMember } from '../types/dashboard';

const stats: DashboardStats = {
  totalOrders: 1234,
  totalRevenue: 45678,
  averageOrderValue: 37,
  pendingOrders: 12,
};

const orderData: OrderSummary[] = [
  { date: 'Mon', orders: 45, revenue: 1200 },
  { date: 'Tue', orders: 52, revenue: 1400 },
  { date: 'Wed', orders: 49, revenue: 1300 },
  { date: 'Thu', orders: 63, revenue: 1800 },
  { date: 'Fri', orders: 58, revenue: 1600 },
  { date: 'Sat', orders: 81, revenue: 2400 },
  { date: 'Sun', orders: 77, revenue: 2200 },
];

const categories: CategorySummary[] = [
  { name: 'Main Course', orders: 523, revenue: 15690 },
  { name: 'Starters', orders: 321, revenue: 6420 },
  { name: 'Desserts', orders: 246, revenue: 4920 },
  { name: 'Beverages', orders: 144, revenue: 1440 },
];

const staff: StaffMember[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Head Chef',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Sous Chef',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'Server',
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c',
    status: 'inactive',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Download Report
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            View All Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Average Order"
          value={`$${stats.averageOrderValue}`}
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrdersChart data={orderData} />
        </div>
        <div>
          <CategoryStats categories={categories} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StaffList staff={staff} />
        </div>
      </div>
    </div>
  );
}