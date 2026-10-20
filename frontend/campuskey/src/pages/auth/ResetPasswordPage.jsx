import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import API from '@/api/api';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!token) {
      toast({ title: 'Invalid reset link', description: 'Request a new password reset link.', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const response = await API.post('/auth/public/reset-password', { token, password });
      setComplete(true);
      toast({ title: 'Password updated', description: response.data.message });
    } catch (error) {
      toast({
        title: 'Password reset failed',
        description: error.response?.data?.message || 'The reset link may have expired. Request a new one.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet><title>Reset Password - CampusKey Zimbabwe</title></Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Reset your password</CardTitle>
              <CardDescription>Choose a new password with at least 8 characters.</CardDescription>
            </CardHeader>
            <CardContent>
              {complete ? (
                <div className="space-y-4 text-center">
                  <p role="status">Your password has been updated.</p>
                  <Button asChild><Link to="/login">Sign in</Link></Button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <Input
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={128}
                    required
                    placeholder="New password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Input
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={128}
                    required
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                  <Button type="submit" className="w-full" disabled={submitting || !token}>
                    {submitting ? 'Updating…' : 'Update password'}
                  </Button>
                  {!token && <p role="alert" className="text-sm text-destructive">Reset token is missing. Request a new link.</p>}
                </form>
              )}
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ResetPasswordPage;
