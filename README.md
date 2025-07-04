# RBAC Web App - Role-Based Access Control Demo

A full-stack web application demonstrating role-based access control with React frontend and Node.js backend.

## Features

- **Authentication**: JWT-based login system
- **Role Management**: 3 roles (Admin, Manager, Staff) with different permissions
- **Protected Routes**: Frontend and backend route protection
- **Role-specific UI**: Different dashboard content based on user role
- **Modern Stack**: React + TypeScript, Node.js + Express, Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for development
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- JWT for authentication
- bcrypt for password hashing
- CORS enabled

## Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Start Development Servers

```bash
# Terminal 1: Start backend (port 3001)
cd server
npm run dev

# Terminal 2: Start frontend (port 5173)
cd client
npm run dev
```

### 3. Test the Application

Visit `http://localhost:5173` and use these test accounts:

- **Admin**: admin@demo.com / password123
- **Manager**: manager@demo.com / password123
- **Staff**: staff@demo.com / password123

## Project Structure

```
rbac-web-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main app component
│   ├── package.json
│   └── vite.config.ts
└── server/                # Node.js backend
    ├── src/
    │   ├── routes/        # API routes
    │   ├── middleware/    # Express middleware
    │   ├── models/        # Data models
    │   ├── utils/         # Utility functions
    │   └── server.ts      # Main server file
    ├── package.json
    └── tsconfig.json
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Protected Routes
- `GET /api/admin/*` - Admin only routes
- `GET /api/manager/*` - Manager and Admin routes
- `GET /api/staff/*` - All authenticated users

## Role Permissions

| Feature | Admin | Manager | Staff |
|---------|-------|---------|-------|
| View Dashboard | ✅ | ✅ | ✅ |
| User Management | ✅ | ❌ | ❌ |
| Reports | ✅ | ✅ | ❌ |
| Settings | ✅ | ✅ | ✅ |
| System Logs | ✅ | ❌ | ❌ |

## One-Command Setup

```bash
# Make the script executable and run it
chmod +x start.sh
./start.sh
```

This will:
1. Install all dependencies for both frontend and backend
2. Start both development servers
3. Display test account credentials

## Manual Setup

If you prefer to set up manually:

```bash
# Backend setup
cd server
npm install
npm run dev

# Frontend setup (in another terminal)
cd client
npm install
npm run dev
```

## Development

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:3001`
- Hot reload enabled for both frontend and backend
- TypeScript compilation with type checking

## Security Features

- JWT tokens with expiration
- Password hashing with bcrypt
- Role-based route protection
- CORS configuration
- Input validation

## Demo Features

### Role-Based UI
- **Admin Dashboard**: User management, system logs, full statistics
- **Manager Dashboard**: Team overview, reports, analytics
- **Staff Dashboard**: Personal tasks, notifications, profile

### API Protection
- Route-level permissions (admin, manager, staff)
- JWT token validation
- Role hierarchy enforcement

### Real-time Features
- Live task status updates
- Notification system
- Dynamic role-based content
