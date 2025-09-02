import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Phone, Lock, ArrowRight, RefreshCw } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const LandlordLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState(location.state?.phoneNumber || '');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Show message from signup if available
  useEffect(() => {
    if (location.state?.message) {
      toast({
        title: "Account Created!",
        description: location.state.message,
      });
    }
  }, [location.state]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast({
        title: "Please enter your phone number",
        description: "Phone number is required to send OTP.",
        variant: "destructive"
      });
      return;
    }

    // Basic phone number validation
    const phoneRegex = /^(\+263|0)[0-9]{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid Zimbabwean phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if landlord exists in localStorage
      const landlords = JSON.parse(localStorage.getItem('landlords') || '[]');
      const landlord = landlords.find(l => l.phoneNumber === phoneNumber);

      if (!landlord) {
        toast({
          title: "Account not found",
          description: "No landlord account found with this phone number. Please sign up first.",
          variant: "destructive"
        });
        return;
      }

      // Simulate sending OTP
      toast({
        title: "OTP sent!",
        description: `Verification code sent to ${phoneNumber}`,
      });

      setStep('otp');
      setCountdown(60); // 60 seconds countdown

    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: "There was an error sending the verification code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, accept any 6-digit OTP
      // In production, this would be verified against the backend
      if (otp === '123456' || otp.length === 6) {
        // Get landlord data from localStorage
        const landlords = JSON.parse(localStorage.getItem('landlords') || '[]');
        const landlord = landlords.find(l => l.phoneNumber === phoneNumber);

        if (landlord) {
          // Update landlord as verified
          landlord.verified = true;
          landlord.lastLogin = new Date().toISOString();
          localStorage.setItem('landlords', JSON.stringify(landlords));

          // Login the user
          login(landlord);

          toast({
            title: "Login successful!",
            description: "Welcome back to your landlord dashboard.",
          });

          navigate('/landlord/dashboard');
        } else {
          throw new Error('Landlord not found');
        }
      } else {
        toast({
          title: "Invalid OTP",
          description: "The verification code you entered is incorrect. Please try again.",
          variant: "destructive"
        });
      }

    } catch (error) {
      toast({
        title: "Login failed",
        description: "There was an error verifying your code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "OTP resent!",
        description: `New verification code sent to ${phoneNumber}`,
      });

      setCountdown(60);

    } catch (error) {
      toast({
        title: "Failed to resend OTP",
        description: "There was an error resending the verification code.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Landlord Login - Campus Key Zimbabwe</title>
        <meta name="description" content="Login to your landlord account on Campus Key Zimbabwe. Manage your property listings and connect with students." />
        <meta property="og:title" content="Landlord Login - Campus Key Zimbabwe" />
        <meta property="og:description" content="Login to your landlord account on Campus Key Zimbabwe. Manage your property listings and connect with students." />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="campus-hero-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Landlord Login
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Access your dashboard to manage properties and connect with students
            </motion.p>
          </div>
        </section>

        {/* Login Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="campus-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl campus-text-gradient text-center">
                    {step === 'phone' ? 'Enter Your Phone Number' : 'Verify Your Account'}
                  </CardTitle>
                  <p className="text-gray-600 text-center">
                    {step === 'phone' 
                      ? 'We\'ll send you a verification code' 
                      : `Enter the 6-digit code sent to ${phoneNumber}`
                    }
                  </p>
                </CardHeader>
                <CardContent>
                  {step === 'phone' ? (
                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+263 77 123 4567"
                            className="pl-10"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Enter the phone number you used to register
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-800 hover:bg-blue-900"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending OTP..."
                        ) : (
                          <>
                            Send Verification Code
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Verification Code
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="Enter 6-digit code"
                            className="pl-10 text-center text-lg tracking-widest"
                            maxLength={6}
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          For demo purposes, use: 123456
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-800 hover:bg-blue-900"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Verifying..."
                        ) : (
                          <>
                            Verify & Login
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                          Didn't receive the code?
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleResendOtp}
                          disabled={countdown > 0 || isSubmitting}
                          className="text-sm"
                        >
                          {countdown > 0 ? (
                            `Resend in ${countdown}s`
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Resend Code
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            setStep('phone');
                            setOtp('');
                            setCountdown(0);
                          }}
                          className="text-sm text-gray-600"
                        >
                          Change phone number
                        </Button>
                      </div>
                    </form>
                  )}

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link
                        to="/landlord/signup"
                        className="text-blue-800 hover:underline font-medium"
                      >
                        Sign up here
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold campus-text-gradient mb-6">
                Need Help?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="campus-hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">📞</div>
                    <h3 className="font-semibold mb-2">Call Support</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Get immediate help with login issues
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.href = 'tel:+263771234567'}
                    >
                      +263 77 123 4567
                    </Button>
                  </CardContent>
                </Card>

                <Card className="campus-hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">💬</div>
                    <h3 className="font-semibold mb-2">WhatsApp</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Chat with us for quick assistance
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const phoneNumber = "263771234567";
                        const message = "Hi! I need help with landlord login.";
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                    >
                      Chat Now
                    </Button>
                  </CardContent>
                </Card>

                <Card className="campus-hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">❓</div>
                    <h3 className="font-semibold mb-2">FAQ</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Find answers to common questions
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/help')}
                    >
                      View FAQ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LandlordLoginPage;