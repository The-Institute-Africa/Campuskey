import  { useState } from 'react';
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
import { User, Phone, Upload, FileText } from 'lucide-react';

import { applyLandlord } from './api/landlordApply.api'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/pages/auth/api/store/auth.store';
import { CheckProfile } from '@/pages/auth/api/checkProfile.api';

const LandlordProfile = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  // Text Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idDocument, setIdDocument] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use FormData for File Uploads
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('idNumber', idNumber);

      if (idDocument) formData.append('file', idDocument);

      await applyLandlord(formData);
      setUser(await CheckProfile());

      toast({
        title: 'Now wait for account profile approval',
        description: 'Your information and documents have been saved.',
      });
      navigate('/landlord', { replace: true });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Account Details - Campus Key Zimbabwe</title>
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
                Create Account Profile
              </h1>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User size={20} /> Personal Information
                    </CardTitle>
                    <CardDescription>Update your profile photo and details.</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Contact Number</Label>
                          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="idNumber">ID/Passport Number</Label>
                          <Input id="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Physical Address</Label>
                        <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                      </div>

                      {/* ID Document Upload */}
                      <div className="space-y-2">
                        <Label htmlFor="idDoc">Verification Document (ID or Passport Scan)</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center gap-2 bg-gray-50/50">
                          <FileText className="text-gray-400" size={32} />
                          <Input
                            id="idDoc"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="max-w-xs"
                            onChange={(e) => setIdDocument(e.target.files[0])}
                            required
                          />
                          <p className="text-xs text-gray-500">PDF, JPG, or PNG (Max 5MB)</p>
                        </div>
                      </div>

                      <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                        {loading ? 'Sending Application...' : 'Apply'}
                      </Button>
                    </form>
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