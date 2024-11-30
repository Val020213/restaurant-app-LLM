import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { User } from '../../types/admin';
import { X } from 'lucide-react';

interface GroupFormProps {
  onClose: () => void;
}

export function GroupForm({ onClose }: GroupFormProps) {
  const { addNotificationGroup } = useAdminStore();
  const [name, setName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Mock users for demonstration
  const availableUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'customer' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'customer' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotificationGroup({
      id: Math.random().toString(36).substr(2, 9),
      name,
      users: selectedUsers,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Notification Group</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Users
            </label>
            <div className="max-h-60 overflow-y-auto border rounded-lg p-2">
              {availableUsers.map((user) => (
                <label key={user.id} className="flex items-center p-2 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedUsers.some((u) => u.id === user.id)}
                    onChange={(e) => {
                      setSelectedUsers(
                        e.target.checked
                          ? [...selectedUsers, user]
                          : selectedUsers.filter((u) => u.id !== user.id)
                      );
                    }}
                    className="mr-2"
                  />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}