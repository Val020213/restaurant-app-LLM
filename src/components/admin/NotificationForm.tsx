import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { BulkNotification } from '../../types/admin';
import { X } from 'lucide-react';

interface NotificationFormProps {
  onClose: () => void;
}

export function NotificationForm({ onClose }: NotificationFormProps) {
  const { notificationGroups, sendBulkNotification } = useAdminStore();
  const [formData, setFormData] = useState<Omit<BulkNotification, 'id'>>({
    title: '',
    message: '',
    groups: [],
    type: 'announcement',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendBulkNotification(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Send Notification</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as BulkNotification['type'] })}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="announcement">Announcement</option>
              <option value="promotion">Promotion</option>
              <option value="update">Update</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Groups
            </label>
            <div className="space-y-2">
              {notificationGroups.map((group) => (
                <label key={group.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.groups.includes(group.id)}
                    onChange={(e) => {
                      const newGroups = e.target.checked
                        ? [...formData.groups, group.id]
                        : formData.groups.filter((id) => id !== group.id);
                      setFormData({ ...formData, groups: newGroups });
                    }}
                    className="mr-2"
                  />
                  {group.name} ({group.users.length} users)
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
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}