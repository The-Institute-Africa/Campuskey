import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail,
  HelpCircle, Users, Home, Shield, DollarSign, FileText, Key
} from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    {
      icon: Search,
      title: "Finding Accommodation",
      description: "How to search and filter properties",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Safety & Verification",
      description: "Property verification and safety tips",
      color: "green"
    },
    {
      icon: DollarSign,
      title: "Payments & Pricing",
      description: "Rent, deposits, and payment methods",
      color: "orange"
    },
    {
      icon: FileText,
      title: "Applications & Contracts",
      description: "How to apply and lease agreements",
      color: "purple"
    },
    {
      icon: Users,
      title: "Landlord Relations",
      description: "Communicating with property owners",
      color: "red"
    },
    {
      icon: Key,
      title: "Moving In/Out",
      description: "Move-in process and inspections",
      color: "indigo"
    }
  ];

  const faqs = [
    {
      category: "Finding Accommodation",
      question: "How do I search for accommodation on Campus Key Zimbabwe?",
      answer: "Use our search bar on the homepage to enter your preferred location or university. You can then filter results by price range, property type, and amenities. Our advanced filters help you find exactly what you're looking for."
    },
    {
      category: "Finding Accommodation",
      question: "What areas do you cover?",
      answer: "We cover accommodation near all major universities in Zimbabwe including University of Zimbabwe (UZ), Midlands State University (MSU), National University of Science & Technology (NUST), and many others."
    },
    {
      category: "Safety & Verification",
      question: "How do you verify properties and landlords?",
      answer: "Our team physically inspects all properties, verifies landlord credentials, checks property ownership documents, and ensures compliance with safety standards. Verified properties display a verification badge."
    },
    {
      category: "Safety & Verification",
      question: "What should I do if I encounter a suspicious listing?",
      answer: "Report it immediately through our contact form or WhatsApp. Never make payments before viewing a property in person. Look for our verification badges and read reviews from other students."
    },
    {
      category: "Payments & Pricing",
      question: "How much deposit do I need to pay?",
      answer: "The deposit amount depends on the property owner and usually serves to secure your accommodation. Always ensure you  read lease agreement before making any payment."
    },
    {
      category: "Payments & Pricing",
      question: "Are utilities included in the rent?",
      answer: "This varies by property. Each listing clearly states what's included in the rent. Some properties include water and electricity, while others charge separately. Always clarify this before signing a lease."
    },
    {
      category: "Applications & Contracts",
      question: "What documents do I need to apply for accommodation?",
      answer: "Typically you'll need: valid ID, student registration card, proof of enrollment, references (academic or personal), and proof of income or financial support. Some landlords may require additional documents."
    },
    {
      category: "Applications & Contracts",
      question: "How long does the application process take?",
      answer: "Most applications are processed within 24-48 hours. However, this can vary depending on the landlord's response time and document verification. We recommend applying early for your preferred properties."
    },
    {
      category: "Landlord Relations",
      question: "How do I contact a landlord?",
      answer: "Each listing has contact options including phone and WhatsApp. Click the contact buttons on the property page. We recommend using our platform's messaging system to keep records of all communications."
    },
    {
      category: "Landlord Relations",
      question: "What if I have issues with my landlord?",
      answer: "Contact our support team immediately. We mediate between students and landlords to resolve disputes fairly. Keep records of all communications and document any issues with photos or propertyVideos."
    },
    {
      category: "Moving In/Out",
      question: "What should I check during move-in inspection?",
      answer: "Document the condition of all rooms, appliances, and fixtures with photos. Test all utilities, check for any damage, and ensure everything mentioned in the lease is present. Report any issues immediately."
    },
    {
      category: "Moving In/Out",
      question: "How do I get my deposit back when moving out?",
      answer: "Ensure the property is in the same condition as when you moved in (normal wear and tear excepted). Give proper notice as required by your lease, and do a final inspection with your landlord."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      orange: "bg-[hsl(var(--alert-light))] text-[hsl(var(--alert-dark))] border-[hsl(var(--alert-main))]",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      red: "bg-red-100 text-red-800 border-red-200",
      indigo: "bg-indigo-100 text-indigo-800 border-indigo-200"
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      <Helmet>
        <title>Help Center - Campus Key Zimbabwe</title>
        <meta name="description" content="Get help with finding student accommodation in Zimbabwe. Browse our FAQ, contact support, and find answers to common questions about housing, payments, and applications." />
        <meta property="og:title" content="Help Center - Campus Key Zimbabwe" />
        <meta property="og:description" content="Get help with finding student accommodation in Zimbabwe. Browse our FAQ, contact support, and find answers to common questions about housing, payments, and applications." />
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
              How Can We Help You?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto mb-8"
            >
              Find answers to common questions or get in touch with our support team
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for help topics, questions, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
                Browse Help Topics
              </h2>
              <p className="text-xl text-gray-600">
                Find answers organized by category
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="campus-hover-lift cursor-pointer h-full">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(category.color)}`}>
                        <category.icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-center text-lg">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center">{category.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {searchQuery ? `${filteredFaqs.length} results found` : 'Common questions and answers'}
              </p>
            </motion.div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                          <CardTitle className="text-left text-lg font-medium">
                            {faq.question}
                          </CardTitle>
                        </div>
                        {expandedFaq === index ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>

                    {expandedFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredFaqs.length === 0 && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any answers matching "{searchQuery}". Try different keywords or contact our support team.
                </p>
                <Button onClick={() => setSearchQuery('')} variant="outline">
                  Clear Search
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
                Still Need Help?
              </h2>
              <p className="text-xl text-gray-600">
                Our support team is here to assist you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="text-center campus-hover-lift">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle>WhatsApp Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Get instant help via WhatsApp. Usually respond within minutes.
                    </p>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        const phoneNumber = "263774592474";
                        const message = "Hi! I need help with Campus Key Zimbabwe.";
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="text-center campus-hover-lift">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle>Phone Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Call us directly for immediate assistance. Available 8AM - 6PM.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      onClick={() => window.location.href = 'tel:+263774592474'}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call +263 77 459 2474
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="text-center campus-hover-lift">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle>Email Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Send us a detailed message. We respond within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                      onClick={() => window.location.href = '/contact'}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
                Quick Links
              </h2>
              <p className="text-xl text-gray-600">
                Helpful resources and guides
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Student Guide",
                  description: "Complete guide to finding accommodation",
                  link: "/student-guide",
                  icon: HelpCircle
                },
                {
                  title: "Browse Listings",
                  description: "Search available properties",
                  link: "/listings",
                  icon: Home
                },
                {
                  title: "Safety Tips",
                  description: "Stay safe while house hunting",
                  link: "/student-guide#safety",
                  icon: Shield
                },
                {
                  title: "Contact Us",
                  description: "Get in touch with our team",
                  link: "/contact",
                  icon: MessageCircle
                }
              ].map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="campus-hover-lift cursor-pointer h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 campus-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <link.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2">{link.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{link.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = link.link}
                      >
                        Learn More
                      </Button>
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

export default HelpCenterPage;
