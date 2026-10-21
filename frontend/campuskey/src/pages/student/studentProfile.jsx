import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { createStudent } from '@/pages/student/api/studentRegister.api';
import { useAuth } from '@/pages/auth/api/store/auth.store';
import { CheckProfile } from '@/pages/auth/api/checkProfile.api';
import { getMyProfile, updateMyProfile } from '@/api/profile.api';
import ProfileAccountActions from '@/components/ProfileAccountActions';

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [fields, setFields] = useState({ name: '', studentNumber: '', contact: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  useEffect(() => {
    getMyProfile()
      .then((current) => {
        setProfile(current);
        setFields({
          name: current.name || '',
          studentNumber: current.studentNumber || '',
          contact: current.contact?.toString() || '',
          address: current.address || '',
        });
      })
      .catch(() => toast({
        title: 'Could not load your profile',
        description: 'Refresh the page and try again.',
        variant: 'destructive',
      }))
      .finally(() => setLoading(false));
  }, []);

  const setField = (key) => (event) => setFields((current) => ({ ...current, [key]: event.target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = {
        role: 'STUDENT',
        name: fields.name.trim(),
        studentNumber: fields.studentNumber.trim(),
        contact: fields.contact.trim(),
        address: fields.address.trim(),
      };
      const updated = profile?.name
        ? await updateMyProfile(payload)
        : await createStudent(payload.name, payload.studentNumber, payload.contact, payload.address)
          .then(() => getMyProfile());
      setProfile(updated);
      setFields({
        name: updated.name || '',
        studentNumber: updated.studentNumber || '',
        contact: updated.contact?.toString() || '',
        address: updated.address || '',
      });
      setUser(await CheckProfile());
      toast({ title: 'Profile saved', description: 'Your student profile is up to date.' });
      if (updated.complete) navigate('/student', { replace: true });
    } catch (error) {
      toast({
        title: 'Could not save profile',
        description: error.response?.data?.message || error.message || 'Check the required fields and try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Helmet><title>Student Profile - CampusKey Zimbabwe</title></Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-12 dark:bg-gray-900">
          <div className="mx-auto max-w-3xl space-y-6 px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle>{profile?.name ? 'Your student profile' : 'Complete your student profile'}</CardTitle>
                  <CardDescription>
                    {location.state?.message || 'Complete your name, student number, contact number, and address before sending inquiries or booking requests.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? <p role="status">Loading profile…</p> : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-name">Full name</Label>
                        <Input id="student-name" value={fields.name} onChange={setField('name')} required maxLength={160} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-number">Student number</Label>
                        <Input id="student-number" value={fields.studentNumber} onChange={setField('studentNumber')} required maxLength={100} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-contact">Contact number</Label>
                        <Input id="student-contact" type="tel" inputMode="numeric" value={fields.contact} onChange={setField('contact')} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-address">Address</Label>
                        <Input id="student-address" value={fields.address} onChange={setField('address')} required maxLength={255} />
                      </div>
                      <Button type="submit" disabled={saving || profile?.accountState === 'DELETED'}>
                        {saving ? 'Saving…' : profile?.name ? 'Update profile' : 'Save profile'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            {!loading && profile?.accountState !== 'DELETED' && (
              <Card><CardContent className="pt-6">
                <ProfileAccountActions
                  accountState={profile?.accountState}
                  onStateChange={(accountState) => setProfile((current) => ({ ...current, accountState }))}
                />
              </CardContent></Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default StudentProfile;
