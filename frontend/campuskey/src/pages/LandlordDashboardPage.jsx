
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { PlusCircle, Building, Eye, Star, MessageSquare, User, LogOut } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const LandlordDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'landlord') {
    navigate('/landlord/login');
    toast({
      title: "Access Denied",
      description: "You must be logged in as a landlord to view this page.",
      variant: "destructive"
    });
    return null;
  }

  const handleAction = (feature) => {
    toast({
      title: `🚧 ${feature} Coming Soon!`,
      description: "This feature is under construction. Stay tuned! 🚀",
    });
  };

  const stats = [
    { title: "Total Listings", value: "5", icon: Building, change: "+1 this month" },
    { title: "Total Views", value: "12,450", icon: Eye, change: "+15% this month" },
    { title: "New Messages", value: "8", icon: MessageSquare, change: "+3 today" },
    { title: "Average Rating", value: "4.7", icon: Star, change: "+0.1 this month" },
  ];

  return (
    <>
      <Helmet>
        <title>Landlord Dashboard - Campus Key Zimbabwe</title>
        <meta name="description" content="Manage your properties, view stats, and connect with students on your Campus Key Zimbabwe landlord dashboard." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.fullName}!</h1>
                <p className="text-gray-600">Here's your landlord dashboard overview.</p>
              </div>
              <Button onClick={() => handleAction('Add New Listing')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="campus-hover-lift">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* My Listings */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>My Listings</CardTitle>
                  <CardDescription>Manage your active and pending properties.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700">No listings yet</h3>
                    <p className="text-gray-500 mb-4">Add your first property to get started.</p>
                    <Button onClick={() => handleAction('Add First Listing')}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add First Listing
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleAction('Edit Profile')}>
                      <User className="h-4 w-4 mr-2" /> Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleAction('View Messages')}>
                      <MessageSquare className="h-4 w-4 mr-2" /> View Messages
                    </Button>
                    <Button variant="destructive" className="w-full justify-start" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-700 mb-4">
                      Check out our Landlord Guide or contact our support team for assistance.
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/help')}>
                      Go to Help Center
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandlordDashboardPage;
