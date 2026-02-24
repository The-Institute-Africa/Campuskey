import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { User, Mail, Lock, Trash2, Phone, MapPin, CreditCard } from 'lucide-react';


import { useAuth } from '@/pages/auth/api/store/auth.store';
import { deleteAccount, updateProfilePassword } from '@/pages/auth/index';

const LandlordProfile = () => {
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  console.log(user?.name);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


  /* =========================
     CHANGE PASSWORD
  ========================== */
  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: '🚧 Feature in development',
      description: 'Password changing will be available soon!',
    });
  };

  /* =========================
     DELETE ACCOUNT
  ========================== */
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    try {
      const responseMessage = await deleteAccount();

      toast({
        title: 'Account Deleted',
        description: responseMessage || 'Your account was deleted successfully.',
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } catch (error) {
      toast({
        title: 'Error Deleting Account',
        description: error.message || 'Something went wrong.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Account Settings - Campus Key Zimbabwe</title>
        <meta
          name="description"
          content="Manage your account settings on Campus Key Zimbabwe."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Account Settings
              </h1>

              <div className="space-y-8">
                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User size={20} /> Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal and contact details here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="apply to change details"></Label>
                    <Button>Apply to update Profile</Button>
                  </CardContent>
                </Card>

                {/* Change Password */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock size={20} /> Change Password
                    </CardTitle>
                    <CardDescription>
                      Update your password for better security.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) =>
                            setCurrentPassword(e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirm-new-password">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-new-password"
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        />
                      </div>

                      <Button type="submit">Update Password</Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-500/50 dark:border-red-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-500">
                      <Trash2 size={20} /> Danger Zone
                    </CardTitle>
                    <CardDescription>
                      This action is permanent and cannot be undone.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                      Deleting your account will permanently remove all your
                      data, including your listings and applications.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Delete My Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandlordProfile;
