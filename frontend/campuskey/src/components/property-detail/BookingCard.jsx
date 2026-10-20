import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { createBooking } from '@/api/booking.api';
import { createInquiry } from '@/api/inquiry.api';
import { useAuth } from '@/pages/auth/api/store/auth.store';

const BookingCard = ({ listing }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const startRequest = (requestMode) => {
    if (!user?.roles?.includes('ROLE_STUDENT')) {
      toast({
        title: 'Student sign-in required',
        description: 'Sign in with a student account to contact landlords.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    setMode(requestMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!listing?.id) {
      toast({ title: 'Unable to submit', description: 'This listing is missing its property ID.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'booking') {
        await createBooking(listing.id, { startDate, endDate, message });
        toast({ title: 'Booking request sent', description: 'The landlord can now review your request.' });
      } else {
        await createInquiry(listing.id, message);
        toast({ title: 'Message sent', description: 'Your inquiry has been sent to the landlord.' });
      }
      setMode(null);
      setStartDate('');
      setEndDate('');
      setMessage('');
    } catch (error) {
      toast({
        title: 'Request failed',
        description: error.response?.data?.message || error.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="sticky top-6 campus-shadow">
      <CardHeader>
        <CardTitle className="text-center">Book This Property</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-800">${listing.price}</div>
          <div className="text-gray-600">per month</div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Availability:</span>
            <span className="font-medium">{listing.availability || 'Contact landlord'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Deposit:</span>
            <span className="font-medium">${listing.propertyDeposit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Lease Term:</span>
            <span className="font-medium">Negotiable</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-gray-600">Utilities:</span>
            <span className="flex flex-wrap justify-end gap-1">
              {Array.isArray(listing.utilities) && listing.utilities.map((utility) => (
                <Badge key={utility.id ?? utility.name} variant="outline" className="text-xs">
                  {utility.name}
                </Badge>
              ))}
            </span>
          </div>
        </div>

        {mode ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <h3 className="font-semibold">{mode === 'booking' ? 'Request a booking' : 'Ask the landlord'}</h3>
            {mode === 'booking' && (
              <>
                <div className="space-y-1">
                  <Label htmlFor="booking-start">Move-in date</Label>
                  <Input id="booking-start" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="booking-end">Move-out date</Label>
                  <Input id="booking-end" type="date" min={startDate || undefined} value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
                </div>
              </>
            )}
            <div className="space-y-1">
              <Label htmlFor="landlord-message">{mode === 'booking' ? 'Message (optional)' : 'Your message'}</Label>
              <Textarea
                id="landlord-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={mode === 'booking' ? 1000 : 2000}
                required={mode === 'inquiry'}
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Sending…' : mode === 'booking' ? 'Send booking request' : 'Send inquiry'}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => setMode(null)} disabled={submitting}>
              Cancel
            </Button>
          </form>
        ) : (
          <div className="space-y-3">
            <Button className="w-full bg-blue-800 hover:bg-blue-900" onClick={() => startRequest('booking')}>
              Request to Book
            </Button>
            <Button className="w-full" variant="outline" onClick={() => startRequest('inquiry')}>
              Ask the Landlord
            </Button>
            <Button className="w-full" variant="ghost" onClick={() => navigate('/student/applications')}>
              View my booking requests
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              No payment is collected through CampusKey for this request.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
