
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Building, UserCheck, UserX, MessageSquare, BarChart } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // This is a placeholder for real admin check
  const isAdmin = user && user.role === 'admin';

  if (!isAdmin) {
    navigate('/');
    toast({
      title: "Access Denied",
      description: "You do not have permission to view the admin dashboard.",
      variant: "destructive"
    });
    return null;
  }

  const handleAction = (feature) => {
    toast({
      title: `🚧 ${feature} Feature Not Implemented`,
      description: "This admin functionality is for demonstration purposes only. 🚀",
    });
  };

  const adminActions = [
    { title: "Approve Listings", icon: Building, description: "Review and approve new property listings." },
    { title: "Manage Applications", icon: UserCheck, description: "Oversee ResCampus applications." },
    { title: "Ban Landlords", icon: UserX, description: "Manage fraudulent or problematic landlords." },
    { title: "View Messages", icon: MessageSquare, description: "Monitor support messages and inquiries." },
    { title: "Site Analytics", icon: BarChart, description: "View website usage and performance data." },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Campus Key Zimbabwe</title>
        <meta name="description" content="Admin dashboard for managing Campus Key Zimbabwe platform." />
      </Helmet>

      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Platform Management & Oversight</p>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Shield className="h-6 w-6" />
                <span className="font-semibold">Admin Access</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminActions.map((action, index) => (
                <Card key={index} className="campus-hover-lift cursor-pointer" onClick={() => handleAction(action.title)}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <action.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle>{action.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{action.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Items requiring immediate attention.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <UserCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">All Clear!</h3>
                  <p className="text-gray-500">There are no pending items requiring approval at this time.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboardPage;
