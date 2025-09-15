import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Building, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const LandlordSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    confirmPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phoneNumber || !formData.confirmPhone) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to create your landlord account.",
        variant: "destructive"
      });
      return;
    }

    if (formData.phoneNumber !== formData.confirmPhone) {
      toast({
        title: "Phone numbers don't match",
        description: "Please ensure both phone number fields match.",
        variant: "destructive"
      });
      return;
    }

    // Basic phone number validation
    const phoneRegex = /^(\+263|0)[0-9]{9}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid Zimbabwean phone number (e.g., +263771234567 or 0771234567).",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store landlord data in localStorage (in production, this would be sent to backend)
      const landlordData = {
        id: Date.now(),
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        role: 'landlord',
        verified: false,
        createdAt: new Date().toISOString(),
        status: 'pending_verification'
      };

      // Store in localStorage
      const existingLandlords = JSON.parse(localStorage.getItem('landlords') || '[]');
      existingLandlords.push(landlordData);
      localStorage.setItem('landlords', JSON.stringify(existingLandlords));

      toast({
        title: "Account created successfully!",
        description: "Please check your phone for an OTP to verify your account.",
      });

      // Redirect to login page
      navigate('/landlord/login', { 
        state: { 
          phoneNumber: formData.phoneNumber,
          message: 'Account created! Please verify with OTP.' 
        }
      });

    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Building,
      title: "List Your Properties",
      description: "Easily add and manage your accommodation listings with photos and detailed descriptions."
    },
    {
      icon: User,
      title: "Connect with Students",
      description: "Reach thousands of students looking for quality accommodation near universities."
    },
    {
      icon: CheckCircle,
      title: "Verified Platform",
      description: "Join a trusted platform where all listings are verified for quality and safety."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Landlord Signup - Campus Key Zimbabwe</title>
        <meta name="description" content="Join Campus Key Zimbabwe as a landlord. List your properties and connect with students looking for quality accommodation near universities." />
        <meta property="og:title" content="Landlord Signup - Campus Key Zimbabwe" />
        <meta property="og:description" content="Join Campus Key Zimbabwe as a landlord. List your properties and connect with students looking for quality accommodation near universities." />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="campus-hero-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Join as a Landlord
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              List your properties and connect with students looking for quality accommodation
            </motion.p>
          </div>
        </section>

        {/* Signup Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="campus-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl campus-text-gradient text-center">
                      Create Your Landlord Account
                    </CardTitle>
                    <p className="text-gray-600 text-center">
                      Join thousands of landlords already using our platform
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+263 77 123 4567"
                            className="pl-10"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          We'll send an OTP to this number for verification
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            name="confirmPhone"
                            value={formData.confirmPhone}
                            onChange={handleInputChange}
                            placeholder="Confirm your phone number"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>1. We'll send an OTP to your phone number</li>
                          <li>2. Verify your account with the OTP</li>
                          <li>3. Complete your profile and start listing properties</li>
                          <li>4. Our team will review and approve your listings</li>
                        </ul>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-800 hover:bg-blue-900"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Creating Account..."
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={() => navigate('/landlord/login')}
                            className="text-blue-800 hover:underline font-medium"
                          >
                            Sign in here
                          </button>
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold campus-text-gradient mb-6">
                    Why Choose Campus Key Zimbabwe?
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Join the leading platform for student accommodation in Zimbabwe and 
                    connect with thousands of students looking for quality housing.
                  </p>
                </div>

                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 campus-gradient rounded-full flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    Success Stories
                  </h3>
                  <p className="text-green-700 text-sm mb-3">
                    "Since joining Campus Key Zimbabwe, I've been able to keep my properties 
                    fully occupied with reliable student tenants. The platform makes it easy 
                    to manage listings and communicate with potential tenants."
                  </p>
                  <p className="text-green-600 font-medium text-sm">
                    - Mary Chikwanha, Property Owner
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
                Platform Features for Landlords
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to manage your properties effectively
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Easy Listing Management",
                  description: "Add, edit, and manage your property listings with our intuitive dashboard",
                  icon: "📝"
                },
                {
                  title: "Photo Gallery",
                  description: "Upload multiple high-quality photos to showcase your properties",
                  icon: "📸"
                },
                {
                  title: "Application Tracking",
                  description: "Track and manage student applications for your properties",
                  icon: "📋"
                },
                {
                  title: "Communication Tools",
                  description: "Built-in messaging system to communicate with potential tenants",
                  icon: "💬"
                },
                {
                  title: "Analytics & Insights",
                  description: "View statistics on property views, inquiries, and performance",
                  icon: "📊"
                },
                {
                  title: "Verification Badge",
                  description: "Get verified status to build trust with students",
                  icon: "✅"
                },
                {
                  title: "Mobile Friendly",
                  description: "Manage your listings on the go with our mobile-optimized platform",
                  icon: "📱"
                },
                {
                  title: "Support Team",
                  description: "Dedicated support team to help you succeed on our platform",
                  icon: "🤝"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full campus-hover-lift">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LandlordSignupPage;