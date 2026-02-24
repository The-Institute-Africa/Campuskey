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
import { createStudent } from '@/pages/student/api/studentRegister.api';

const StudentProfile = () => {
  const [studentName, setStudentName] = useState('');
  const [studentContact, setStudentContact] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStudent(
        studentName,
        studentNumber,
        studentContact,
        address
      );

      toast({
        title: 'Profile created',
        description: 'Student profile saved successfully.',
      });

    } catch (error) {
      toast({
        title: 'Creation failed',
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
        <title>Profile Details - Campus Key Zimbabwe</title>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                  <CardDescription>Create your student profile</CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label>Student Number</Label>
                      <Input
                        value={studentNumber}
                        onChange={(e) => setStudentNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label>Contact Number</Label>
                      <Input
                        value={studentContact}
                        onChange={(e) => setStudentContact(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label>Address</Label>
                      <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <Button type="submit" onClick={() => navigate('/student')} disabled={loading}>
                      {loading ? 'Saving...' : 'Create Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StudentProfile;
