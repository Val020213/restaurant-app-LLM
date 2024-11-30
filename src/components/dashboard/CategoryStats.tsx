import React from 'react';
import { CategorySummary } from '../../types/dashboard';

interface CategoryStatsProps {
  categories: CategorySummary[];
}

export function CategoryStats({ categories }: CategoryStatsProps) {
  const totalOrders = categories.reduce((sum, cat) => sum + cat.orders, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-6">Category Performance</h2>
      <div className="space-y-4">
        {categories.map((category) => {
          const percentage = (category.orders / totalOrders) * 100;
          return (
            <div key={category.name}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {category.name}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {category.orders} orders
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-600 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}