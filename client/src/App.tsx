import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Unauthorized from '@/pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Only Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Admin Panel</h1>
                  <p className="text-gray-600">This is an admin-only section.</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          {/* Manager+ Routes */}
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute minRole="manager">
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Reports</h1>
                  <p className="text-gray-600">Available to Managers and Admins.</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900">404</h1>
                  <p className="text-gray-600">Page not found</p>
                </div>
              </div>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
