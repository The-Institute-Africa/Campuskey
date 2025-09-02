import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    toast({
      title: "Authentication Required",
      description: "Please log in to view this page.",
      variant: "destructive",
    });
    return <Navigate to="/student/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    toast({
      title: "Access Denied",
      description: "You do not have permission to view this page.",
      variant: "destructive",
    });
    // Redirect to a relevant dashboard or home page
    const homePath = user.role === 'student' ? '/student/dashboard' : '/';
    return <Navigate to={homePath} replace />;
  }

  return children;
};

export default ProtectedRoute;