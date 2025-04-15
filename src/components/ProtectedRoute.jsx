import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userType = localStorage.getItem('userType');
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is allowed for this route
  if (!allowedRoles.includes(userType)) {
    // Redirect to appropriate dashboard based on role
    switch (userType) {
      case 'student':
        return <Navigate to="/siswa/dashboard" replace />;
      case 'teacher':
        return <Navigate to="/guru/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        // Invalid role, redirect to login
        localStorage.clear(); // Clear invalid session
        return <Navigate to="/login" replace />;
    }
  }

  // Authorized, render children
  return children;
};

export default ProtectedRoute; 