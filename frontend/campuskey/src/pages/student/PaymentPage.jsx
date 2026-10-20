import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

const PaymentPage = () => (
  <>
    <Helmet>
      <title>Online Payments Unavailable - CampusKey Zimbabwe</title>
      <meta name="description" content="CampusKey does not currently process rent or deposit payments." />
    </Helmet>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12">
        <Card className="w-full max-w-xl">
          <CardHeader className="text-center">
            <ShieldAlert className="mx-auto h-12 w-12 text-amber-600" />
            <CardTitle>Online payments are not available</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              CampusKey does not collect rent or deposits. Do not enter card, mobile money, or banking details here.
              Send a booking request or inquiry to contact the landlord and arrange next steps directly.
            </p>
            <Button asChild><Link to="/properties">Browse properties</Link></Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  </>
);

export default PaymentPage;
