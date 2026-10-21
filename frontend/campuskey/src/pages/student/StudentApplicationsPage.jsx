import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Search } from 'lucide-react';
import { cancelBooking, getStudentBookings } from '@/api/booking.api';
import { toast } from '@/components/ui/use-toast';

const StudentApplicationsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setBookings(await getStudentBookings());
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not load your booking requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleCancel = async (bookingId) => {
    setCancellingId(bookingId);
    try {
      const updated = await cancelBooking(bookingId);
      setBookings((current) => current.map((booking) => booking.id === bookingId ? updated : booking));
      toast({ title: 'Booking request cancelled' });
    } catch (requestError) {
      toast({
        title: 'Could not cancel request',
        description: requestError.response?.data?.message || requestError.message,
        variant: 'destructive',
      });
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Booking Requests - CampusKey Zimbabwe</title>
        <meta name="description" content="Review and manage your accommodation booking requests." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-12 dark:bg-gray-900">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Booking Requests</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                  Track requests you have sent to property landlords.
                </p>
              </div>

              {loading ? (
                <p role="status" className="py-12 text-center text-muted-foreground">Loading your requests…</p>
              ) : error ? (
                <Card className="p-8 text-center">
                  <p role="alert">{error}</p>
                  <Button className="mt-4" onClick={loadBookings}>Try again</Button>
                </Card>
              ) : bookings.length > 0 ? (
                <Card>
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.map((booking) => (
                      <li key={booking.id} className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                        <div className="flex-grow">
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{booking.propertyName}</h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Requested {new Date(booking.createdAt).toLocaleDateString()} · {booking.startDate} to {booking.endDate}
                          </p>
                          {booking.message && <p className="mt-2 whitespace-pre-wrap text-sm">{booking.message}</p>}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'}>{booking.status}</Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/property/${booking.propertySlug}`}>View listing</Link>
                          </Button>
                          {booking.landlordId && <Button variant="outline" size="sm" asChild>
                            <Link to={`/profile/view/landlord/${booking.landlordId}`}>Landlord profile</Link>
                          </Button>}
                          {booking.status === 'PENDING' && (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={cancellingId === booking.id}
                              onClick={() => handleCancel(booking.id)}
                            >
                              {cancellingId === booking.id ? 'Cancelling…' : 'Cancel request'}
                            </Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : (
                <Card className="px-6 py-20 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h2 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">No booking requests yet</h2>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">Browse listings to request accommodation.</p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/properties"><Search className="mr-2 h-4 w-4" />Browse listings</Link>
                    </Button>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default StudentApplicationsPage;
