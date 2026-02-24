import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useAuth } from '../auth/api/store/auth.store';

const StudentLandlordLoginPage = () => {
  const [loginSide, setLoginSide] = useState('student'); // lowercase
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login({ username, password });

      if (!result.success) {
        toast({
          title: "Login Failed",
          description: result.message,
          variant: "destructive",
        });
        return;
      }

      const roles = result.user?.roles ?? [];

      console.log(roles);
      toast({ title: "Login Successful!", description: "Redirecting..." });
      // ROLE-BASED REDIRECT
      if (roles.includes("ROLE_STUDENT")) {
        navigate("/student", { replace: true });
    
      } else if (roles.includes("ROLE_LANDLORD")) {
        navigate("/landlord", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast({
        title: "Login Error",
        description: "Unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {loginSide === 'student' ? "Student" : "Landlord"} Login - Campus Key Zimbabwe
        </title>
      </Helmet>

      <div className="relative min-h-screen">
        <AnimatedBackground />
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
                <CardTitle className="text-3xl campus-text-gradient">
                  {loginSide === 'student' ? "Student Login" : "Landlord Login"}
                </CardTitle>
                <CardDescription>
                  Welcome back! Access your account to continue.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">

                  {/* Toggle */}
                  <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                    <Button
                      type="button"
                      onClick={() => setLoginSide('student')}
                      className={`w-full ${loginSide === 'student'
                        ? 'bg-white dark:bg-gray-700 shadow'
                        : 'bg-transparent text-gray-500'
                      }`}
                      variant="ghost"
                    >
                      Student
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setLoginSide('landlord')}
                      className={`w-full ${loginSide === 'landlord'
                        ? 'bg-white dark:bg-gray-700 shadow'
                        : 'bg-transparent text-gray-500'
                      }`}
                      variant="ghost"
                    >
                      Landlord
                    </Button>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="tkt_carter"
                      className="pl-10"
                      required
                      autoComplete="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Your Password"
                      className="pl-10"
                      required
                      autoComplete="current-password"
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

                  {/* Forgot password */}
                  <div className="text-sm text-right">
                    <Link
                      to={`/${loginSide}/forgot-password`}
                      className="text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-blue-800 hover:bg-blue-900 text-lg py-6"
                    disabled={loading}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    {loading ? "Logging in..." : "Login"}
                  </Button>

                  <p className="mt-6 text-center text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
                      Sign up
                    </Link>
                  </p>

                </form>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StudentLandlordLoginPage;
