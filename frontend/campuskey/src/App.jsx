import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import  {AuthProvider}  from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/misc/AboutPage';
import ContactPage from '@/pages/misc/ContactPage';

import ListingsPage from '@/pages/listings/ListingsPage';
import ListingDetailPage from '@/pages/listings/ListingDetailPage';

import StudentGuidePage from '@/pages/student/StudentGuidePage';
import HelpCenterPage from '@/pages/misc/HelpCenterPage';
import TermsPage from '@/pages/misc/TermsPage';

import PrivacyPage from '@/pages/misc/PrivacyPage';
import DisclaimerPage from '@/pages/misc/DisclaimerPage';

import LandlordSignupPage from '@/pages/landlord/LandlordSignupPage';
import LandlordLoginPage from '@/pages/landlord/LandlordLoginPage';
import LandlordDashboardPage from '@/pages/landlord/LandlordDashboardPage';

import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import ApplicationPage from '@/pages/ApplicationPage';

import StudentLoginPage from '@/pages/student/StudentLoginPage';
import StudentSignupPage from '@/pages/student/StudentSignupPage';
import StudentDashboardPage from '@/pages/student/StudentDashboardPage';

import PaymentPage from '@/pages/PaymentPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';

import StudentAccountSettingsPage from '@/pages/student/StudentAccountSettingsPage';
import StudentApplicationsPage from '@/pages/student/StudentApplicationsPage';
import StudentFavoritesPage from '@/pages/student/StudentFavoritesPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/student-guide" element={<StudentGuidePage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/student/login" element={<StudentLoginPage />} />
            <Route path="/student/signup" element={<StudentSignupPage />} />
            <Route path="/student/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/landlord/signup" element={<LandlordSignupPage />} />
            <Route path="/landlord/login" element={<LandlordLoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/listings" element={<ProtectedRoute><ListingsPage /></ProtectedRoute>} />
            <Route path="/listing/:id" element={<ProtectedRoute><ListingDetailPage /></ProtectedRoute>} />
            <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboardPage /></ProtectedRoute>} />
            <Route path="/student/settings" element={<ProtectedRoute role="student"><StudentAccountSettingsPage /></ProtectedRoute>} />
            <Route path="/student/applications" element={<ProtectedRoute role="student"><StudentApplicationsPage /></ProtectedRoute>} />
            <Route path="/student/favorites" element={<ProtectedRoute role="student"><StudentFavoritesPage /></ProtectedRoute>} />
            <Route path="/landlord/dashboard" element={<ProtectedRoute role="landlord"><LandlordDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} /> 
            <Route path="/apply/:id" element={<ProtectedRoute><ApplicationPage /></ProtectedRoute>} />
            <Route path="/payment/:listingId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;