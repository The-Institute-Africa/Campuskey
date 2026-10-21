import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and message are required.",
        variant: "destructive"
      });
      return;
    }

    // Store message in localStorage (in production, this would be sent to a backend)
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    const newMessage = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    messages.push(newMessage);
    localStorage.setItem('contact_messages', JSON.stringify(messages));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+263 78 030 1896", "+27 74 573 0455"],
      description: "Call us Monday to Friday, 8AM - 6PM"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@campuskey.co.zw"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["Bulawayo, Zimbabwe"],
      description: "Visit us during business hours"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 8AM - 6PM", "Saturday: 9AM - 2PM"],
      description: "Closed on Sundays and public holidays"
    }
  ];

  const handleWhatsAppContact = () => {
    const phoneNumber = "263780301896";
    const message = "Hi! I'm interested in CampusKey Zimbabwe services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Campus Key Zimbabwe</title>
        <meta name="description" content="Get in touch with Campus Key Zimbabwe. Contact us for student accommodation inquiries, support, or partnership opportunities." />
        <meta property="og:title" content="Contact Us - Campus Key Zimbabwe" />
        <meta property="og:description" content="Get in touch with Campus Key Zimbabwe. Contact us for student accommodation inquiries, support, or partnership opportunities." />
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
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              We're here to help! Get in touch with any questions about student accommodation
            </motion.p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full campus-hover-lift">
                    <CardHeader>
                      <div className="w-16 h-16 campus-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <info.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="font-semibold text-gray-800">{detail}</p>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Quick Actions */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="campus-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl campus-text-gradient">Send us a Message</CardTitle>
                    <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name *
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What is this about?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us how we can help you..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-800 hover:bg-blue-900"
                        size="lg"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold campus-text-gradient mb-6">Quick Actions</h2>
                  <p className="text-gray-600 mb-8">
                    Need immediate assistance? Try these quick options to get help faster.
                  </p>
                </div>

                <Card className="campus-hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
                      <div>
                        <h3 className="text-xl font-semibold">WhatsApp Support</h3>
                        <p className="text-gray-600">Get instant help via WhatsApp</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleWhatsAppContact}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </CardContent>
                </Card>

                <Card className="campus-hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Phone className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-xl font-semibold">Call Us Directly</h3>
                        <p className="text-gray-600">Speak with our support team</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => window.location.href = 'tel:+263780301896'}
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Call +263 78 030 1896
                    </Button>
                  </CardContent>
                </Card>

                <Card className="campus-hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Mail className="h-8 w-8 text-purple-600 mr-3" />
                      <div>
                        <h3 className="text-xl font-semibold">Email Support</h3>
                        <p className="text-gray-600">Send us an email directly</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => window.location.href = 'mailto:info@campuskey.co.zw'}
                      variant="outline"
                      className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Email Us
                    </Button>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Emergency Contact</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    For urgent accommodation issues or safety concerns, call our 24/7 emergency line:
                  </p>
                  <p className="text-xl font-bold text-blue-800">+263 78 030 1896</p>
                  <p className="text-xl font-bold text-blue-800">+27 74 573 0455</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do I list my property?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Sign up as a landlord, verify your phone number, and submit your property details.
                      Our team will review and approve your listing within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is the platform free for students?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes! Students can search, view listings, and contact landlords completely free.
                      We only charge landlords a small fee for listing their properties.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How are properties verified?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our team physically inspects properties, verifies landlord credentials,
                      and ensures all listings meet our safety and quality standards.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What if I have issues with my accommodation?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Contact our support team immediately. We mediate between students and landlords
                      to resolve issues quickly and fairly.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
