import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { User, Mail, Lock, Bell, Trash2 } from 'lucide-react';

const StudentAccountSettingsPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    toast({
      title: '🚧 Feature in development',
      description: 'Profile updating will be available soon!',
    });
  };

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

  const handleDeleteAccount = () => {
     toast({
      title: '🚧 Feature in development',
      description: 'Account deletion will be available soon!',
    });
  };

  return (
    <>
      <Helmet>
        <title>Account Settings - Campus Key Zimbabwe</title>
        <meta name="description" content="Manage your account settings on Campus Key Zimbabwe." />
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>

              <div className="space-y-8">
                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User size={20} /> Profile Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Change Password */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lock size={20} /> Change Password</CardTitle>
                    <CardDescription>Update your password for better security.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                      </div>
                       <div>
                        <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                        <Input id="confirm-new-password" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                      </div>
                      <Button type="submit">Update Password</Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Delete Account */}
                <Card className="border-red-500/50 dark:border-red-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-500"><Trash2 size={20} /> Danger Zone</CardTitle>
                    <CardDescription>This action is permanent and cannot be undone.</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Deleting your account will permanently remove all your data, including your applications and favorite listings.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount}>Delete My Account</Button>
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

export default StudentAccountSettingsPage;