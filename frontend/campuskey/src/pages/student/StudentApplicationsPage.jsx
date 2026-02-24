import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Search, Clock, CheckCircle, XCircle } from 'lucide-react';

const mockApplications = [
  { id: 1, title: 'Modern Studio in Avondale', date: '2025-08-15', status: 'Pending' },
  { id: 2, title: '2-Bedroom Flat in Mount Pleasant', date: '2025-08-10', status: 'Approved' },
  { id: 3, title: 'Single Room in a Cottage, Belgravia', date: '2025-08-05', status: 'Rejected' },
  { id: 4, title: 'Spacious Apartment near UZ', date: '2025-07-20', status: 'Approved' },
];

const statusStyles = {
  Pending: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
  Approved: 'bg-green-500/20 text-green-700 dark:text-green-400',
  Rejected: 'bg-red-500/20 text-red-700 dark:text-red-400',
};

const statusIcons = {
    Pending: <Clock size={16} />,
    Approved: <CheckCircle size={16} />,
    Rejected: <XCircle size={16} />,
}

const StudentApplicationsPage = () => {
  return (
    <>
      <Helmet>
        <title>My Applications - Campus Key Zimbabwe</title>
        <meta name="description" content="Track your accommodation applications on Campus Key Zimbabwe." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Applications</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                    Here's a list of all your submitted applications and their current status.
                </p>
              </div>

              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockApplications.length > 0 ? (
                      mockApplications.map((app, index) => (
                        <motion.li
                          key={app.id}
                          className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex-grow">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{app.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Applied on: {app.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                             <Badge className={`flex items-center gap-1.5 ${statusStyles[app.status]}`}>
                                {statusIcons[app.status]}
                                {app.status}
                             </Badge>
                             <Button variant="outline" size="sm" asChild>
                                <Link to={`/listing/${app.id}`}>View Listing</Link>
                             </Button>
                          </div>
                        </motion.li>
                      ))
                    ) : (
                      <div className="text-center py-20 px-6">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">No applications yet</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                          You haven't applied to any listings. Start your search to find a place!
                        </p>
                        <div className="mt-6">
                          <Button asChild>
                            <Link to="/listings">
                              <Search className="mr-2 h-4 w-4" /> Browse Listings
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StudentApplicationsPage;