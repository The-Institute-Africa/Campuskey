import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/pages/auth/api/store/auth.store";
import { useEffect, useState } from "react";
import { CheckProfile } from "@/pages/auth/api/checkProfile.api";

const ProtectedRoute = ({ children, roles }) => {
  const { token, user, setUser } = useAuth(); // Access user from AuthProvider
  const location = useLocation();
  const [loading, setLoading] = useState(true); // For async profile fetch

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    // Fetch full profile if user doesn't have full info
    const loadProfile = async () => {
      try {
        const profile = await CheckProfile();
        setUser(profile); // update AuthProvider user
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token, setUser]);

  if (!token) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loading) {
    // Wait for profile to load
    return <div>Loading...</div>;
  }

  const role = user?.roles?.[0];
  const status = user?.accountStatus;
  // Suspended users
  if (status === "SUSPENDED") {
    return <Navigate to="/access-denied" replace />;
  }

  // Role-based access
if (roles && (!role || !roles.includes(role))) {
  return <Navigate to="/access-denied" replace />;
}

if (role === "ROLE_LANDLORD") {
  const needsProfile = status == null || status === "UNVERIFIED";

  if (needsProfile && location.pathname !== "/landlord/profile") {
    return <Navigate to="/landlord/profile" replace />;
  }
}


  // Student-specific redirects
  if (role === "ROLE_STUDENT") {
    if (!user.hasStudentProfile && location.pathname !== "/student/profile") {
      return <Navigate to="/student/profile" replace />;
    }
    
  }

  // All checks passed, render children
  return children;
};

export default ProtectedRoute;
