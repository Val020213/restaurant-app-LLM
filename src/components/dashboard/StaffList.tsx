import React from 'react';
import { StaffMember } from '../../types/dashboard';

interface StaffListProps {
  staff: StaffMember[];
}

export function StaffList({ staff }: StaffListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-6">Staff Members</h2>
      <div className="space-y-4">
        {staff.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              member.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}