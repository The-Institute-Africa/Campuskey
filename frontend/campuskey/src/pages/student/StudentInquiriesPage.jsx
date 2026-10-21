import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { closeInquiry, getStudentInquiries } from '@/api/inquiry.api';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const StudentInquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [closingId, setClosingId] = useState(null);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setInquiries(await getStudentInquiries());
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not load your inquiries.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInquiries();
  }, [loadInquiries]);

  const handleClose = async (inquiryId) => {
    setClosingId(inquiryId);
    try {
      const updated = await closeInquiry(inquiryId);
      setInquiries((current) => current.map((inquiry) => inquiry.id === inquiryId ? updated : inquiry));
    } catch (requestError) {
      toast({
        title: 'Could not close inquiry',
        description: requestError.response?.data?.message || requestError.message,
        variant: 'destructive',
      });
    } finally {
      setClosingId(null);
    }
  };

  return (
    <>
      <Helmet><title>My Inquiries - CampusKey Zimbabwe</title></Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-12 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl space-y-4 px-4">
            <h1 className="mb-8 text-center text-3xl font-bold">My landlord inquiries</h1>
            {loading ? (
              <p role="status" className="py-12 text-center text-muted-foreground">Loading inquiries…</p>
            ) : error ? (
              <Card className="p-8 text-center">
                <p role="alert">{error}</p>
                <Button className="mt-4" onClick={loadInquiries}>Try again</Button>
              </Card>
            ) : inquiries.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">You have not contacted a landlord yet.</Card>
            ) : inquiries.map((inquiry) => (
              <Card key={inquiry.id} className="space-y-3 p-6">
                <div className="flex flex-wrap justify-between gap-2">
                  <h2 className="font-semibold">{inquiry.propertyName}</h2>
                  {inquiry.landlordId && <Link className="text-sm underline" to={`/profile/view/landlord/${inquiry.landlordId}`}>View landlord profile</Link>}
                  <span className="text-sm text-muted-foreground">{inquiry.status}</span>
                </div>
                <p className="whitespace-pre-wrap">{inquiry.message}</p>
                {inquiry.response && (
                  <div className="rounded-md bg-muted p-4">
                    <p className="mb-1 text-sm font-semibold">Landlord response</p>
                    <p className="whitespace-pre-wrap">{inquiry.response}</p>
                  </div>
                )}
                {inquiry.status !== 'CLOSED' && (
                  <Button
                    variant="outline"
                    disabled={closingId === inquiry.id}
                    onClick={() => handleClose(inquiry.id)}
                  >
                    {closingId === inquiry.id ? 'Closing…' : 'Close inquiry'}
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default StudentInquiriesPage;
