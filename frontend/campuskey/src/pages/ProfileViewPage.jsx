import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { getRelatedProfile } from '@/api/profile.api';

const ProfileViewPage = () => {
  const { role, id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getRelatedProfile(role.toUpperCase(), id)
      .then(setProfile)
      .catch((requestError) => setError(
        requestError.response?.data?.message || 'This profile is not available to your account.'
      ));
  }, [role, id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl space-y-4 px-4">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Card className="space-y-4 p-6">
            {error ? <p role="alert">{error}</p> : !profile ? (
              <p role="status">Loading profile…</p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Shared because you have an inquiry or booking with this account.
                </p>
                <dl className="space-y-3">
                  <div><dt className="text-sm text-muted-foreground">Name</dt><dd className="font-medium">{profile.name}</dd></div>
                  <div><dt className="text-sm text-muted-foreground">Contact number</dt><dd className="font-medium">{profile.contact || 'Not provided'}</dd></div>
                </dl>
              </>
            )}
            <Button variant="outline" asChild><Link to={role.toUpperCase() === 'STUDENT' ? '/landlord/messages' : '/student/inquiries'}>Back to conversations</Link></Button>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileViewPage;
