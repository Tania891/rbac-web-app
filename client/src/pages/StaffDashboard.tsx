import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, Bell, User, Settings } from 'lucide-react';
import api from '@/utils/api';

const StaffDashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, tasksRes, notificationsRes] = await Promise.all([
          api.get('/staff/profile'),
          api.get('/staff/tasks'),
          api.get('/staff/notifications')
        ]);

        setProfile(profileRes.data.data);
        setTasks(tasksRes.data.data);
        setNotifications(notificationsRes.data.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateTaskStatus = async (taskId: number, status: string) => {
    try {
      await api.patch(`/staff/tasks/${taskId}`, { status });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const taskStats = [
    { 
      title: 'Completed Tasks', 
      value: tasks.filter(t => t.status === 'Completed').length, 
      icon: CheckCircle, 
      color: 'green' 
    },
    { 
      title: 'In Progress', 
      value: tasks.filter(t => t.status === 'In Progress').length, 
      icon: Clock, 
      color: 'blue' 
    },
    { 
      title: 'Pending Tasks', 
      value: tasks.filter(t => t.status === 'Pending').length, 
      icon: AlertCircle, 
      color: 'yellow' 
    },
    { 
      title: 'Unread Notifications', 
      value: notifications.filter(n => !n.read).length, 
      icon: Bell, 
      color: 'red' 
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="mt-2 text-gray-600">Your personal workspace and tasks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {taskStats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                    <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile & Quick Info */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Profile Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">{profile?.name}</div>
                  <div className="text-sm text-gray-500">{profile?.email}</div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Role:</span>
                    <span className="ml-2 font-medium text-gray-900">{profile?.role?.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Login:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {profile?.lastLogin ? new Date(profile.lastLogin).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Account Created:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {profile?.accountCreated ? new Date(profile.accountCreated).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Theme:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {profile?.preferences?.theme || 'Default'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Notifications
            </h3>
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className={`p-3 rounded-md border-l-4 ${
                  notification.type === 'success' ? 'border-green-400 bg-green-50' :
                  notification.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                  'border-blue-400 bg-blue-50'
                } ${!notification.read ? 'ring-2 ring-blue-200' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-900">{notification.title}</div>
                      <div className="text-sm text-gray-600">{notification.message}</div>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              View All Notifications
            </button>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            My Tasks
          </h3>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="text-xs text-gray-400 mt-2">
                      Due: {new Date(task.dueDate).toLocaleDateString()} • 
                      Assigned by: {task.assignedBy}
                    </div>
                  </div>
                  
                  {task.status !== 'Completed' && (
                    <div className="ml-4 flex space-x-2">
                      {task.status === 'Pending' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'In Progress')}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Start
                        </button>
                      )}
                      {task.status === 'In Progress' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'Completed')}
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
