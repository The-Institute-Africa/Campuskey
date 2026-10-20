import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Shield, Users, AlertTriangle } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsPage = () => {
  const sections = [
    {
      icon: FileText,
      title: "Terms of Service",
      content: [
        {
          subtitle: "Acceptance of Terms",
          text: "By accessing and using Campus Key Zimbabwe, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content."
        },
        {
          subtitle: "Use License",
          text: "Permission is granted to temporarily download one copy of the materials on Campus Key Zimbabwe's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse engineer any software contained on the website; or remove any copyright or other proprietary notations from the materials."
        },
        {
          subtitle: "User Accounts",
          text: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You agree not to disclose your password to any third party."
        }
      ]
    },
    {
      icon: Shield,
      title: "Privacy & Data Protection",
      content: [
        {
          subtitle: "Information Collection",
          text: "We collect information you provide directly to us, such as when you create an account, make a booking, or contact us. This may include your name, email address, phone number, student information, and payment details."
        },
        {
          subtitle: "Information Use",
          text: "We use the information we collect to provide, maintain, and improve our services; process transactions; send you technical notices and support messages; and communicate with you about products, services, and events."
        },
        {
          subtitle: "Information Sharing",
          text: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with landlords when you apply for accommodation, and with service providers who assist us in operating our website."
        }
      ]
    },
    {
      icon: Users,
      title: "User Responsibilities",
      content: [
        {
          subtitle: "Student Users",
          text: "Students must provide accurate information when creating accounts and applying for accommodation. You agree to use the platform only for legitimate accommodation searches and to treat all communications with landlords professionally and respectfully."
        },
        {
          subtitle: "Landlord Users",
          text: "Landlords must provide accurate property information and maintain current listings. You agree to respond to student inquiries promptly and to comply with all applicable housing laws and regulations. All properties must meet basic safety and habitability standards."
        },
        {
          subtitle: "Prohibited Activities",
          text: "Users may not use the platform for any unlawful purpose or to solicit others to perform unlawful acts; violate any international, federal, provincial, or local laws or regulations; infringe upon or violate our intellectual property rights or the intellectual property rights of others; harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate; or submit false or misleading information."
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "Disclaimers & Limitations",
      content: [
        {
          subtitle: "Service Availability",
          text: "Campus Key Zimbabwe does not guarantee that the service will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the service, resulting in interruptions, delays, or errors."
        },
        {
          subtitle: "Property Verification",
          text: "While we make reasonable efforts to verify property listings and landlord credentials, we cannot guarantee the accuracy of all information provided. Users are encouraged to verify property details independently and to visit properties in person before making commitments."
        },
        {
          subtitle: "Limitation of Liability",
          text: "In no event shall Campus Key Zimbabwe, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service."
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Campus Key Zimbabwe</title>
        <meta name="description" content="Read the terms and conditions for using Campus Key Zimbabwe. Understand your rights and responsibilities when using our student accommodation platform." />
        <meta property="og:title" content="Terms & Conditions - Campus Key Zimbabwe" />
        <meta property="og:description" content="Read the terms and conditions for using Campus Key Zimbabwe. Understand your rights and responsibilities when using our student accommodation platform." />
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
              Terms & Conditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Please read these terms carefully before using our platform
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6"
            >
              <p className="text-gray-300">Last updated: January 2024</p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold campus-text-gradient mb-6">
                Welcome to Campus Key Zimbabwe
              </h2>
              <div className="prose prose-lg mx-auto text-gray-700">
                <p>
                  These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship
                  with Campus Key Zimbabwe website and services (the "Service") operated by Campus Key Zimbabwe ("us", "we", or "our").
                </p>
                <p>
                  Your access to and use of the Service is conditioned on your acceptance of and compliance
                  with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                </p>
                <p>
                  By accessing or using our Service you agree to be bound by these Terms. If you disagree
                  with any part of these terms then you may not access the Service.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {sections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                >
                  <Card className="campus-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 campus-gradient rounded-full flex items-center justify-center">
                          <section.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl">{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-3">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.subtitle}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Terms */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl campus-text-gradient">
                    Additional Important Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Termination
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We may terminate or suspend your account and bar access to the Service immediately,
                      without prior notice or liability, under our sole discretion, for any reason whatsoever
                      and without limitation, including but not limited to a breach of the Terms. If you wish
                      to terminate your account, you may simply discontinue using the Service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Governing Law
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      These Terms shall be interpreted and governed by the laws of Zimbabwe, without regard
                      to its conflict of law provisions. Our failure to enforce any right or provision of
                      these Terms will not be considered a waiver of those rights.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Changes to Terms
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                      If a revision is material, we will provide at least 30 days notice prior to any new terms
                      taking effect. What constitutes a material change will be determined at our sole discretion.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Contact Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about these Terms and Conditions, please contact us at:
                    </p>
                    <div className="mt-3 space-y-1 text-gray-700">
                      <p>Email: legal@campuskeyzim.com</p>
                      <p>Phone: +263 77 459 2474</p>
                      <p>Address: National University of Science and Technology, Bulawayo, Zimbabwe</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                      Agreement Acknowledgment
                    </h3>
                    <p className="text-blue-700">
                      By using Campus Key Zimbabwe, you acknowledge that you have read these Terms and Conditions,
                      understand them, and agree to be bound by them. If you do not agree to these Terms and Conditions,
                      you are not authorized to use our Service.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TermsPage;
