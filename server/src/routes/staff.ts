import { Router, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();

// Apply authentication to all routes (all authenticated users can access)
router.use(authenticateToken);

// Get user profile
router.get('/profile', (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    message: 'Profile retrieved successfully',
    data: {
      ...req.user,
      lastLogin: new Date(Date.now() - 3600000), // 1 hour ago
      accountCreated: new Date('2024-01-15'),
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      }
    }
  });
});

// Get user tasks
router.get('/tasks', (req: AuthRequest, res: Response) => {
  const tasks = [
    {
      id: 1,
      title: 'Complete security training',
      description: 'Finish the mandatory security awareness training module',
      priority: 'High',
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      status: 'In Progress',
      assignedBy: 'Manager'
    },
    {
      id: 2,
      title: 'Update documentation',
      description: 'Review and update the user manual for the new system',
      priority: 'Medium',
      dueDate: new Date(Date.now() + 259200000), // 3 days
      status: 'Pending',
      assignedBy: 'Team Lead'
    },
    {
      id: 3,
      title: 'System backup verification',
      description: 'Verify that daily backups are running correctly',
      priority: 'Low',
      dueDate: new Date(Date.now() + 604800000), // 1 week
      status: 'Completed',
      assignedBy: 'System Admin'
    }
  ];

  res.json({
    success: true,
    message: 'Tasks retrieved successfully',
    data: tasks
  });
});

// Get notifications
router.get('/notifications', (req: AuthRequest, res: Response) => {
  const notifications = [
    {
      id: 1,
      title: 'System Maintenance',
      message: 'Scheduled maintenance window this weekend',
      type: 'info',
      read: false,
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 2,
      title: 'New Policy Update',
      message: 'Please review the updated security policy',
      type: 'warning',
      read: false,
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: 3,
      title: 'Training Completed',
      message: 'Congratulations on completing the security training!',
      type: 'success',
      read: true,
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    }
  ];

  res.json({
    success: true,
    message: 'Notifications retrieved successfully',
    data: notifications
  });
});

// Update task status
router.patch('/tasks/:id', (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  res.json({
    success: true,
    message: 'Task updated successfully',
    data: {
      id: parseInt(id),
      status,
      updatedBy: req.user?.name,
      updatedAt: new Date()
    }
  });
});

export default router;
