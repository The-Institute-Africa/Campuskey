import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, FileText, Settings, Search } from 'lucide-react';

import { useAuth } from './api/index';

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();


  const dashboardItems = [
    {
      title: "My Favorite Listings",
      description: "View and manage your saved properties.",
      icon: Heart,
      action: () => navigate('/student/favorites'),
      color: "text-red-500",
    },
    {
      title: "My Applications",
      description: "Track the status of your accommodation applications.",
      icon: FileText,
      action: () => navigate('/student/applications'),
      color: "text-blue-500",
    },
    {
      title: "Account Settings",
      description: "Update your profile and contact information.",
      icon: Settings,
      action: () => navigate('/student/settings'),
      color: "text-gray-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Student Dashboard - Campus Key Zimbabwe</title>
        <meta name="description" content="Manage your account, view favorite listings, and track applications on your Campus Key Zimbabwe student dashboard." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome, {user?.name || 'Student'}!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  This is your personal dashboard. Let's find your perfect place.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Dashboard Cards */}
                {dashboardItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col justify-between campus-hover-lift">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-opacity-10 ${item.color.replace('text-', 'bg-')}`}>
                            <item.icon className={`h-6 w-6 ${item.color}`} />
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {item.description}
                        </p>
                        <Button onClick={item.action} variant="outline" className="w-full">
                          Go to {item.title}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8"
              >
                <Card className="campus-gradient text-white">
                  <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h2 className="text-2xl font-bold">Ready to find your new home?</h2>
                      <p className="opacity-90">
                        Browse hundreds of verified listings near your campus now.
                      </p>
                    </div>
                    <Button
                      size="lg"
                      onClick={() => navigate('/listings')}
                      className="bg-white text-blue-800 hover:bg-gray-100 flex-shrink-0"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Start Searching
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StudentDashboardPage;
