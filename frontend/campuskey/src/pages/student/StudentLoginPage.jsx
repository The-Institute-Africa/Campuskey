import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Phone, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useAuth } from '@/contexts/AuthContext';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.601-3.33-11.303-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.332,34.899,44,29.825,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

const StudentLoginPage = () => {
  const [loginType, setLoginType] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/student/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const credentials = loginType === 'email'
        ? { email, password }
        : { phone, otp };

      const result = await login(credentials);

      if (result.success) {
        toast({ title: "Login Successful!", description: "Redirecting..." });
        navigate(from, { replace: true });
      } if (!result.success) {
        console.error("Login failed:", {
          message: result.message,
          credentials: loginType === 'email' ? { email } : { phone, otp },
          response: result
        });
        toast({ title: "Login Failed", description: result.message, variant: "destructive" });
      }

    } catch (err) {
      console.error("Unexpected error during login:", err); // <-- logs unexpected errors
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = () => {
    toast({ title: "🚧 Feature in development", description: "OTP functionality coming soon!" });
    setOtpSent(true);
  };

  const handleGoogleLogin = () => {
    toast({ title: "🚧 Feature in development", description: "Google login coming soon!" });
  };

  return (
    <>
      <Helmet>
        <title>Student Login - Campus Key Zimbabwe</title>
        <meta
          name="description"
          content="Login to your Campus Key Zimbabwe student account. Access your applications, favorite listings, and manage your profile."
        />
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
                <CardTitle className="text-3xl campus-text-gradient">Student Login</CardTitle>
                <CardDescription>Welcome back! Access your account to continue your search.</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email / Phone toggle */}
                  <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                    <Button
                      type="button"
                      onClick={() => setLoginType('email')}
                      className={`w-full ${loginType === 'email' ? 'bg-white dark:bg-gray-700 shadow' : 'bg-transparent text-gray-500'}`}
                      variant="ghost"
                    >
                      Email
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setLoginType('phone')}
                      className={`w-full ${loginType === 'phone' ? 'bg-white dark:bg-gray-700 shadow' : 'bg-transparent text-gray-500'}`}
                      variant="ghost"
                    >
                      Phone (OTP)
                    </Button>
                  </div>

                  {/* Email login */}
                  {loginType === 'email' ? (
                    <>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
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
                          aria-label={passwordVisible ? "Hide password" : "Show password"}
                        >
                          {passwordVisible ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="tel"
                          placeholder="e.g., 0771234567"
                          className="pl-10"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleSendOtp}
                      >
                        Send OTP
                      </Button>
                      {otpSent && (
                        <div className="relative mt-4">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            type="text"
                            placeholder="Enter OTP"
                            className="pl-10"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Forgot password */}
                  <div className="flex items-center justify-between text-sm">
                    <Link to="/student/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
                  </div>

                  {/* Login button */}
                  <Button
                    type="submit"
                    className="w-full bg-blue-800 hover:bg-blue-900 text-lg py-6 flex justify-center items-center"
                    disabled={loading}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    {loading ? "Logging in..." : "Login"}
                  </Button>

                  {/* Or continue with */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    onClick={handleGoogleLogin}
                  >
                    <GoogleIcon />
                    <span className="ml-2">Sign in with Google</span>
                  </Button>

                  <p className="mt-6 text-center text-sm">
                    Don't have an account?{' '}
                    <Link to="/student/signup" className="font-semibold text-blue-600 hover:underline">
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

export default StudentLoginPage;
