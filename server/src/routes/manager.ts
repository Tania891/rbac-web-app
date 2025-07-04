import { Router, Response } from 'express';
import { authenticateToken, requireMinRole } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();

// Apply authentication and manager+ role requirement to all routes
router.use(authenticateToken);
router.use(requireMinRole('manager'));

// Get reports (manager and admin)
router.get('/reports', (req: AuthRequest, res: Response) => {
  const reports = [
    {
      id: 1,
      title: 'Monthly Security Report',
      type: 'Security',
      generatedBy: 'System',
      date: new Date(),
      status: 'Completed',
      summary: 'All security metrics within normal parameters'
    },
    {
      id: 2,
      title: 'User Activity Report',
      type: 'Activity',
      generatedBy: req.user?.name,
      date: new Date(Date.now() - 86400000),
      status: 'Completed',
      summary: '89 active users, 15% increase from last month'
    },
    {
      id: 3,
      title: 'Performance Analytics',
      type: 'Performance',
      generatedBy: 'System',
      date: new Date(Date.now() - 172800000),
      status: 'In Progress',
      summary: 'System performance analysis ongoing'
    }
  ];

  res.json({
    success: true,
    message: 'Reports retrieved successfully',
    data: reports
  });
});

// Get team overview (manager and admin)
router.get('/team', (req: AuthRequest, res: Response) => {
  const teamData = {
    totalMembers: 12,
    activeToday: 8,
    onLeave: 2,
    departments: [
      { name: 'Development', count: 5, active: 4 },
      { name: 'Security', count: 3, active: 2 },
      { name: 'Operations', count: 4, active: 2 }
    ],
    recentActivity: [
      { user: 'John Doe', action: 'Completed security audit', time: '2 hours ago' },
      { user: 'Jane Smith', action: 'Updated system documentation', time: '4 hours ago' },
      { user: 'Mike Johnson', action: 'Resolved critical bug', time: '6 hours ago' }
    ]
  };

  res.json({
    success: true,
    message: 'Team overview retrieved',
    data: teamData
  });
});

// Generate report (manager and admin)
router.post('/reports/generate', (req: AuthRequest, res: Response) => {
  const { reportType, dateRange } = req.body;

  // Simulate report generation
  const newReport = {
    id: Date.now(),
    title: `${reportType} Report`,
    type: reportType,
    generatedBy: req.user?.name,
    date: new Date(),
    status: 'Generating',
    summary: 'Report generation in progress...'
  };

  res.json({
    success: true,
    message: 'Report generation started',
    data: newReport
  });
});

export default router;
