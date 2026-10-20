import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { getLandlordInquiries, respondToInquiry } from '@/api/inquiry.api';

const LandlordMessages = () => {
  const [inquiries, setInquiries] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submittingId, setSubmittingId] = useState(null);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setInquiries(await getLandlordInquiries());
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not load inquiries.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInquiries();
  }, [loadInquiries]);

  const submitResponse = async (event, inquiryId) => {
    event.preventDefault();
    const response = responses[inquiryId]?.trim();
    if (!response) return;

    setSubmittingId(inquiryId);
    try {
      const updated = await respondToInquiry(inquiryId, response);
      setInquiries((current) => current.map((inquiry) => inquiry.id === inquiryId ? updated : inquiry));
      toast({ title: 'Reply sent' });
    } catch (requestError) {
      toast({
        title: 'Could not send reply',
        description: requestError.response?.data?.message || requestError.message,
        variant: 'destructive',
      });
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link to="/landlord">
            <Button variant="ghost" size="icon" aria-label="Back to dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Student inquiries</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl space-y-4 px-4 py-8">
        {loading ? (
          <p role="status" className="text-center text-muted-foreground">Loading inquiries…</p>
        ) : error ? (
          <Card className="p-8 text-center">
            <p role="alert">{error}</p>
            <Button className="mt-4" onClick={loadInquiries}>Try again</Button>
          </Card>
        ) : inquiries.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">No inquiries yet</h2>
            <p className="text-muted-foreground">Student messages about your listings will appear here.</p>
          </Card>
        ) : inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="space-y-4 p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold">{inquiry.studentName}</h2>
                <p className="text-sm text-muted-foreground">{inquiry.propertyName}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>{new Date(inquiry.createdAt).toLocaleString()}</p>
                <p className="font-medium">{inquiry.status}</p>
              </div>
            </div>
            <p className="whitespace-pre-wrap">{inquiry.message}</p>
            {inquiry.response ? (
              <div className="rounded-md bg-muted p-4">
                <p className="mb-1 text-sm font-semibold">Your reply</p>
                <p className="whitespace-pre-wrap">{inquiry.response}</p>
              </div>
            ) : inquiry.status === 'OPEN' ? (
              <form onSubmit={(event) => submitResponse(event, inquiry.id)} className="space-y-3">
                <Textarea
                  aria-label={`Reply to ${inquiry.studentName}`}
                  value={responses[inquiry.id] || ''}
                  onChange={(event) => setResponses((current) => ({ ...current, [inquiry.id]: event.target.value }))}
                  maxLength={2000}
                  required
                />
                <Button type="submit" disabled={submittingId === inquiry.id}>
                  {submittingId === inquiry.id ? 'Sending…' : 'Send reply'}
                </Button>
              </form>
            ) : null}
          </Card>
        ))}
      </main>
    </div>
  );
};

export default LandlordMessages;
