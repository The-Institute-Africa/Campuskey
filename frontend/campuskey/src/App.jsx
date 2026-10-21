import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Landlord Pages
import AddProperty from '@/pages/landlord/AddProperty';
import LandlordDashboardPage from '@/pages/landlord/LandlordDashboardPage';
import LandlordAccount from '@/pages/landlord/LandlordAccount';
import LandlordProfile from '@/pages/landlord/LandlordProfile'
import LandlordMessages from '@/pages/landlord/LandlordMessages';
import PropertyDocuments from '@/pages/landlord/PropertyDocuments';

// Admin Pages
import AdminAccounts from '@/pages/admin/AdminAccounts';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminMessaging from '@/pages/admin/AdminMessaging';
import AdminProperties from '@/pages/admin/AdminProperties';
import AdminLogin from '@/pages/admin/AdminLogin';
// Misc & Student Pages
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/misc/AboutPage';
import ContactPage from '@/pages/misc/ContactPage';
import ListingsPage from '@/pages/property/PropertyPage';
import ListingDetailPage from '@/pages/property/PropertyDetailPage';
import PropertyDetail from '@/pages/student/propertyDetail';
import StudentGuidePage from '@/pages/student/StudentGuidePage';
import HelpCenterPage from '@/pages/misc/HelpCenterPage';
import TermsPage from '@/pages/misc/TermsPage';
import PrivacyPage from '@/pages/misc/PrivacyPage';
import DisclaimerPage from '@/pages/misc/DisclaimerPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import StudentDashboardPage from '@/pages/student/StudentDashboardPage';
import PaymentPage from '@/pages/student/PaymentPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import StudentAccountSettingsPage from '@/pages/student/StudentAccountSettingsPage';
import StudentApplicationsPage from '@/pages/student/StudentApplicationsPage';
import StudentFavoritesPage from '@/pages/student/StudentFavoritesPage';
import StudentInquiriesPage from '@/pages/student/StudentInquiriesPage';
import ScrollToTop from "@/components/ScrollToTop";
import StudentProfile from "@/pages/student/studentProfile"
import ProfileViewPage from "@/pages/ProfileViewPage";

import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './pages/auth/api/store/auth.store';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/access-denied" element={<div>Access Denied</div>} />
            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/student-guide" element={<StudentGuidePage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Routes */}
            <Route path="/properties" element={<ListingsPage />} />
            <Route path="/property/:slug" element={<ListingDetailPage />} />
            <Route path="/payment/:propertyId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />

            {/* Student Routes */}
            <Route path="/student" element={
              <ProtectedRoute roles={["ROLE_STUDENT"]}>
                <StudentDashboardPage />
                </ProtectedRoute>} />
            <Route path="/student/profile" element={
              <ProtectedRoute roles={["ROLE_STUDENT"]}>
                <StudentProfile />
              </ProtectedRoute>
            } />

            <Route path="/student/settings" element={<ProtectedRoute roles={["ROLE_STUDENT"]}><StudentAccountSettingsPage /></ProtectedRoute>} />
            <Route path="/student/applications" element={<ProtectedRoute roles={["ROLE_STUDENT"]}><StudentApplicationsPage /></ProtectedRoute>} />
            <Route path="/student/inquiries" element={<ProtectedRoute roles={["ROLE_STUDENT"]}><StudentInquiriesPage /></ProtectedRoute>} />
            <Route path="/student/favorites" element={<ProtectedRoute roles={["ROLE_STUDENT"]}><StudentFavoritesPage /></ProtectedRoute>} />
            <Route path="/profile/view/:role/:id" element={<ProtectedRoute roles={["ROLE_STUDENT", "ROLE_LANDLORD"]}><ProfileViewPage /></ProtectedRoute>} />

            {/* Landlord Routes */}
            <Route path="/landlord" element={<ProtectedRoute roles={["ROLE_LANDLORD"]}><LandlordDashboardPage /></ProtectedRoute>} />
            <Route path="/landlord/profile" element={
              <ProtectedRoute roles={["ROLE_LANDLORD"]}>
              <LandlordProfile />
              </ProtectedRoute>} />
            <Route path="/landlord/add-property" element={<ProtectedRoute roles={["ROLE_LANDLORD"]}><AddProperty /></ProtectedRoute>} />
            <Route path="/landlord/account" element={<ProtectedRoute roles={["ROLE_LANDLORD"]}><LandlordAccount /></ProtectedRoute>} />
            <Route path="/landlord/message" element={<ProtectedRoute roles={["ROLE_LANDLORD"]}><Navigate to="/landlord/messages" replace /></ProtectedRoute>} />
            <Route path="/landlord/messages" element={<ProtectedRoute roles={["ROLE_LANDLORD"]}><LandlordMessages /></ProtectedRoute>} />
            <Route path="/landlord/:propertyId/verify-documents/" element={<ProtectedRoute roles={["ROLE_LANDLORD"]}><PropertyDocuments /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute roles={["ROLE_ADMIN"]}><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/accounts" element={<ProtectedRoute roles={["ROLE_ADMIN"]}><AdminAccounts /></ProtectedRoute>} />
            <Route path="/admin/messaging" element={<ProtectedRoute roles={["ROLE_ADMIN"]}><AdminMessaging /></ProtectedRoute>} />
            <Route path="/admin/properties" element={<ProtectedRoute roles={["ROLE_ADMIN"]}><AdminProperties /></ProtectedRoute>} />

            {/* Admin Routes

            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="/accounts" element={<AdminAccounts />} />
            <Route path="/messaging" element={<AdminMessaging />} />
            <Route path="/admin-properties" element={<AdminProperties />} />
*/}

            {/* 404 Page */}
            <Route path="*" element={<div className="text-center mt-20 text-2xl">Page Not Found</div>} />
          </Routes>

          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
