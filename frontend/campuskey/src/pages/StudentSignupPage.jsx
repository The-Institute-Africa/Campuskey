import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, UserPlus, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useAuth } from '@/contexts/AuthContext';

const StudentSignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please check your passwords and try again.",
        variant: "destructive",
      });
      return;
    }

    const userData = {
      name,
      email,
      password, // In a real app, you'd hash this!
      role: 'student',
    };
    
    const result = signup(userData);

    if (result.success) {
      toast({
        title: "Signup Successful!",
        description: "Welcome! You are now logged in and being redirected.",
      });
      navigate('/student/dashboard');
    } else {
      toast({
        title: "Signup Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Student Signup - Campus Key Zimbabwe</title>
        <meta name="description" content="Create a student account on Campus Key Zimbabwe to find your perfect accommodation." />
      </Helmet>

      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <AnimatedBackground />
        </div>

        <Header />

        <main className="relative flex items-center justify-center min-h-[calc(100vh-128px)] px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="campus-card shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl campus-text-gradient">Create Student Account</CardTitle>
                <CardDescription>
                  Join our community to find your next home.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      type="text" 
                      placeholder="Full Name" 
                      className="pl-10" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
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
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      type={passwordVisible ? "text" : "password"} 
                      placeholder="Create a Password" 
                      className="pl-10" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-3 h-5 w-5 text-gray-400"
                    >
                      {passwordVisible ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      type={confirmPasswordVisible ? "text" : "password"} 
                      placeholder="Confirm Password" 
                      className="pl-10" 
                      required 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      className="absolute right-3 top-3 h-5 w-5 text-gray-400"
                    >
                      {confirmPasswordVisible ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-lg py-6">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Sign Up
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/student/login" className="font-semibold text-blue-600 hover:underline">
                    Log in
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

export default StudentSignupPage;