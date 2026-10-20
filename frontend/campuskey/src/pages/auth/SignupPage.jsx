import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Phone,
  User as UserIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

import { AuthSignup } from './api/auth.signup.api';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (!accountType) {
      toast({
        title: 'Select Account Role',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
  username,
  email,
  password,
  role: [accountType.toLowerCase()],
};

console.log("Signup payload →", payload);

      await AuthSignup({
        username,
        email,
        password,
        role: accountType.toLowerCase(),
      });

      toast({
        title: 'Signup Successful',
        description: 'You can now log in',
      });



      navigate('/login');
    } catch (error) {
      toast({
        title: 'Signup Failed',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Student Signup - CampusKey Zimbabwe</title>
        <meta
          name="description"
          content="Create a student account on Campus Key Zimbabwe to find your perfect accommodation."
        />
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
                <CardTitle className="text-3xl campus-text-gradient">
                  Create Account
                </CardTitle>
                <CardDescription>
                  Join our community to find your next home.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSignup} className="space-y-6">
                  {/* Username */}
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Username"
                      className="pl-10"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  {/* Email */}
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

                  {/* Role */}
                  <div>
                    <label className="block mb-1 font-medium">
                      Account Role
                    </label>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      required
                    >
                      <option value="">Select role</option>
                      <option value="student">Student</option>
                      <option value="landlord">Landlord</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder="Create a Password"
                      className="pl-10"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {passwordVisible ? <Eye /> : <EyeOff />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      className="pl-10"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {confirmPasswordVisible ? <Eye /> : <EyeOff />}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-800 hover:bg-blue-900 text-lg py-6 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      'Signing Up...'
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5 mr-2" />
                        Sign Up
                      </>
                    )}
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:underline"
                  >
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

export default SignupPage;
