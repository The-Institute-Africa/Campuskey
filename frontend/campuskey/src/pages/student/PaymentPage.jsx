
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Shield, Building, User, ArrowLeft } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { mockListings } from '@/data/mockListings';

const PaynowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 20.8333C12.5 16.231 16.231 12.5 20.8333 12.5H79.1667C83.769 12.5 87.5 16.231 87.5 20.8333V79.1667C87.5 83.769 83.769 87.5 79.1667 87.5H20.8333C16.231 87.5 12.5 83.769 12.5 79.1667V20.8333Z" fill="#367CFF"></path>
        <path d="M50 33.3333V66.6667" stroke="white" strokeWidth="8.33333" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M37.5 45.8333L50 33.3333L62.5 45.8333" stroke="white" strokeWidth="8.33333" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

const EcoCashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#0066CC"/>
        <path d="M6 7.5L12 12L18 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 16.5L12 12L18 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const PaymentPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const listing = mockListings.find(l => l.id === parseInt(listingId));

  if (!listing) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Listing not found</h1>
          <Button onClick={() => navigate('/properties')} className="mt-4">Back to Listings</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "🚧 Payment Feature In Development",
      description: `This is a demo. In a real app, payment for ${listing.title} would be processed via ${paymentMethod}.`,
      duration: 5000
    });

    setIsProcessing(false);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paynow', name: 'Paynow', icon: PaynowIcon },
    { id: 'ecocash', name: 'EcoCash', icon: EcoCashIcon },
  ];

  return (
    <>
      <Helmet>
        <title>Payment for {listing.title} - Campus Key Zimbabwe</title>
        <meta name="description" content={`Complete your payment for ${listing.title} securely.`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <Button variant="outline" onClick={() => navigate(`/listing/${listingId}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Listing
              </Button>
            </div>

            <Card className="campus-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 campus-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl">Secure Payment</CardTitle>
                <CardDescription>
                  You are paying for one month's rent for your accommodation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Payment Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
                      <Card className="bg-gray-50">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 flex items-center"><Building className="h-4 w-4 mr-2" />Property</span>
                            <span className="font-medium text-right">{listing.title}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 flex items-center"><User className="h-4 w-4 mr-2" />Landlord</span>
                            <span className="font-medium">{listing.landlord}</span>
                          </div>
                          <div className="border-t my-2"></div>
                          <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total Amount</span>
                            <span className="text-blue-800">${listing.price}.00</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
                      <div className="space-y-2">
                        {paymentMethods.map(method => (
                          <Button
                            key={method.id}
                            variant={paymentMethod === method.id ? 'default' : 'outline'}
                            className="w-full justify-start"
                            onClick={() => setPaymentMethod(method.id)}
                          >
                            <method.icon className="h-5 w-5 mr-3" />
                            {method.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <div className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={paymentMethod}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {paymentMethod === 'card' && (
                          <form className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                              <Input placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <Input placeholder="MM / YY" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                <Input placeholder="123" />
                              </div>
                            </div>
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                               <Input placeholder="John Doe" />
                            </div>
                          </form>
                        )}
                        {paymentMethod === 'paynow' && (
                           <div className="text-center p-8 bg-gray-100 rounded-md">
                             <h3 className="font-semibold mb-2">Redirecting to Paynow...</h3>
                             <p className="text-sm text-gray-600">You will be redirected to the Paynow website to complete your payment securely.</p>
                           </div>
                        )}
                        {paymentMethod === 'ecocash' && (
                           <form className="space-y-4">
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">EcoCash Number</label>
                               <Input placeholder="e.g., 0771234567" />
                             </div>
                             <p className="text-xs text-gray-500">You will receive a prompt on your phone to enter your PIN to complete the transaction.</p>
                           </form>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <Button
                      onClick={handlePayment}
                      className="w-full text-lg py-6 bg-green-600 hover:bg-green-700"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Pay $${listing.price}`}
                    </Button>

                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Shield className="h-4 w-4 mr-2 text-green-600" />
                      <span>Secure payment powered by Stripe & Paynow</span>
                    </div>
                  </div>
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

// Minimal AnimatePresence to avoid errors if not installed
const AnimatePresence = ({ children }) => <>{children}</>;

export default PaymentPage;
