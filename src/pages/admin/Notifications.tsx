import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { NotificationGroup, BulkNotification } from '../../types/admin';
import { Plus, Send, Users } from 'lucide-react';
import { NotificationForm } from '../../components/admin/NotificationForm';
import { GroupForm } from '../../components/admin/GroupForm';

export function Notifications() {
  const { notificationGroups, sentNotifications } = useAdminStore();
  const [isNotificationFormOpen, setIsNotificationFormOpen] = useState(false);
  const [isGroupFormOpen, setIsGroupFormOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsGroupFormOpen(true)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Users className="w-5 h-5 mr-2" />
            New Group
          </button>
          <button
            onClick={() => setIsNotificationFormOpen(true)}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Notification
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Notification Groups</h2>
          <div className="space-y-4">
            {notificationGroups.map((group) => (
              <div
                key={group.id}
                className="border rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{group.name}</h3>
                  <span className="text-sm text-gray-500">
                    {group.users.length} users
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {group.users.slice(0, 5).map((user) => (
                    <div
                      key={user.id}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                    >
                      {user.name[0]}
                    </div>
                  ))}
                  {group.users.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                      +{group.users.length - 5}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            {sentNotifications.map((notification, index) => (
              <div
                key={index}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    {
                      promotion: 'bg-purple-100 text-purple-800',
                      announcement: 'bg-blue-100 text-blue-800',
                      update: 'bg-green-100 text-green-800',
                    }[notification.type]
                  }`}>
                    {notification.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                <div className="text-xs text-gray-500">
                  Sent to {notification.groups.length} groups
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isNotificationFormOpen && (
        <NotificationForm onClose={() => setIsNotificationFormOpen(false)} />
      )}

      {isGroupFormOpen && (
        <GroupForm onClose={() => setIsGroupFormOpen(false)} />
      )}
    </div>
  );
}