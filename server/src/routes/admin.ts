import { Router, Response } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import { UserModel } from '../models/User';
import { AuthRequest } from '../types';

const router = Router();

// Apply authentication and admin role requirement to all routes
router.use(authenticateToken);
router.use(requireRole(['admin']));

// Get all users (admin only)
router.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get system statistics (admin only)
router.get('/stats', async (req: AuthRequest, res: Response) => {
  try {
    const allUsers = await UserModel.getAllUsers();
    const stats = {
      totalUsers: allUsers.length,
      adminCount: allUsers.filter(u => u.role === 'admin').length,
      managerCount: allUsers.filter(u => u.role === 'manager').length,
      staffCount: allUsers.filter(u => u.role === 'staff').length,
      systemHealth: 'Excellent',
      uptime: '99.9%'
    };

    res.json({
      success: true,
      message: 'System statistics retrieved',
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get system logs (admin only)
router.get('/logs', (req: AuthRequest, res: Response) => {
  const logs = [
    { id: 1, timestamp: new Date(), level: 'INFO', message: 'User admin@demo.com logged in', source: 'AUTH' },
    { id: 2, timestamp: new Date(Date.now() - 300000), level: 'WARN', message: 'Failed login attempt for unknown@test.com', source: 'AUTH' },
    { id: 3, timestamp: new Date(Date.now() - 600000), level: 'INFO', message: 'System backup completed successfully', source: 'SYSTEM' },
    { id: 4, timestamp: new Date(Date.now() - 900000), level: 'ERROR', message: 'Database connection timeout', source: 'DATABASE' },
    { id: 5, timestamp: new Date(Date.now() - 1200000), level: 'INFO', message: 'User manager@demo.com accessed reports', source: 'ACCESS' }
  ];

  res.json({
    success: true,
    message: 'System logs retrieved',
    data: logs
  });
});

export default router;
