
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleResetRequest = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Reset Requested",
      description: "If an account exists for this email, a reset link has been sent.",
    });

    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - Campus Key Zimbabwe</title>
        <meta name="description" content="Reset your Campus Key Zimbabwe student account password." />
      </Helmet>

      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <AnimatedBackground />
        </div>

        <Header />

        <main className="relative flex items-center justify-center min-h-[calc(100vh-128px)] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="campus-card shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl campus-text-gradient">Forgot Password?</CardTitle>
                <CardDescription>
                  Enter your email and we'll send you a link to reset your password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetRequest} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-lg py-6">
                    <Send className="h-5 w-5 mr-2" />
                    Send Reset Link
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm">
                  Remembered your password?{' '}
                  <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                    Back to Login
                  </Link>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
