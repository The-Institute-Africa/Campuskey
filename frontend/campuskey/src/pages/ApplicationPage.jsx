import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, FileText, Send, Building } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const ApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock listing data
  const listing = {
    id: parseInt(id),
    title: "Modern Studio Apartment",
    location: "Near UZ Campus",
    landlord: "John Mukamuri"
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.studentId) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would submit to a backend
    console.log("Application Submitted:", { listingId: id, ...formData });

    toast({
      title: "Application Submitted!",
      description: "The landlord has been notified. You will receive an update soon.",
    });

    setIsSubmitting(false);
    navigate(`/listing/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>Apply for Accommodation - Campus Key Zimbabwe</title>
        <meta name="description" content={`Apply for ${listing.title}. Fill out the application form to secure your student housing.`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="campus-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 campus-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl">Accommodation Application</CardTitle>
                <CardDescription className="text-lg">
                  You are applying for: <span className="font-semibold text-blue-800">{listing.title}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input name="fullName" placeholder="Your Full Name" className="pl-10" onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input name="email" type="email" placeholder="your.email@example.com" className="pl-10" onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input name="phone" placeholder="+263 77 123 4567" className="pl-10" onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Student ID Number *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input name="studentId" placeholder="Your Student ID" className="pl-10" onChange={handleInputChange} required />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message to Landlord (Optional)</label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Introduce yourself, mention your course, year of study, etc."
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="bg-[hsl(var(--alert-light))] border-l-4 border-[hsl(var(--alert-main))] p-4">
                    <p className="text-sm text-[hsl(var(--alert-dark))]">
                      Submitting this application does not guarantee accommodation. The landlord will review your application and contact you.
                    </p>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => navigate(`/listing/${id}`)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-800 hover:bg-blue-900" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                      <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
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

export default ApplicationPage;
