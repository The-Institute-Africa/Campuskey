import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users, Database, Settings } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPage = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, apply for accommodation, or contact us. This includes your name, email address, phone number, student ID, university information, and any other information you choose to provide."
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect certain information about your use of our platform, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed. We may also collect information about your interactions with our emails and notifications."
        },
        {
          subtitle: "Location Information",
          text: "With your consent, we may collect information about your location to help you find accommodation near your university or preferred areas. You can disable location sharing through your device settings at any time."
        }
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our services; process accommodation applications; facilitate communication between students and landlords; and provide customer support."
        },
        {
          subtitle: "Communication",
          text: "We may use your information to send you technical notices, updates, security alerts, and support messages; respond to your comments and questions; and communicate about new features, services, and events."
        },
        {
          subtitle: "Safety and Security",
          text: "We use your information to verify user identities, detect and prevent fraud, abuse, and other harmful activities; ensure the safety and security of our platform and users; and comply with legal obligations."
        }
      ]
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: [
        {
          subtitle: "With Landlords",
          text: "When you apply for accommodation or express interest in a property, we share relevant information with the landlord, including your name, contact information, student status, and any application details you provide."
        },
        {
          subtitle: "Service Providers",
          text: "We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service. These providers are bound by confidentiality agreements."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required to do so by law or in response to valid requests by public authorities, such as a court or government agency, or to protect our rights, property, or safety, or that of our users or others."
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we securely delete or anonymize it."
        },
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the security of your account credentials. We recommend using a strong, unique password and enabling two-factor authentication when available. Notify us immediately of any unauthorized access to your account."
        }
      ]
    },
    {
      icon: Settings,
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Access and Update",
          text: "You can access and update your personal information through your account settings. If you need assistance accessing or updating your information, please contact our support team."
        },
        {
          subtitle: "Data Portability",
          text: "You have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format. You may also request that we transfer this information to another service provider where technically feasible."
        },
        {
          subtitle: "Deletion",
          text: "You may request deletion of your personal information, subject to certain exceptions such as legal obligations or legitimate business interests. Note that deleting your account may limit your ability to use our services."
        }
      ]
    },
    {
      icon: Shield,
      title: "Privacy Rights",
      content: [
        {
          subtitle: "Consent",
          text: "By using our services, you consent to the collection, use, and sharing of your information as described in this Privacy Policy. You may withdraw your consent at any time, though this may affect your ability to use certain features."
        },
        {
          subtitle: "Marketing Communications",
          text: "You may opt out of receiving promotional emails from us by following the unsubscribe instructions in those emails or by contacting us directly. Even if you opt out, we may still send you non-promotional communications related to your account or our services."
        },
        {
          subtitle: "Cookies and Tracking",
          text: "We use cookies and similar technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences, though disabling cookies may affect the functionality of our services."
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Campus Key Zimbabwe</title>
        <meta name="description" content="Learn how Campus Key Zimbabwe protects your privacy and handles your personal information. Read our comprehensive privacy policy for students and landlords." />
        <meta property="og:title" content="Privacy Policy - Campus Key Zimbabwe" />
        <meta property="og:description" content="Learn how Campus Key Zimbabwe protects your privacy and handles your personal information. Read our comprehensive privacy policy for students and landlords." />
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
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                Our Commitment to Your Privacy
              </h2>
              <div className="prose prose-lg mx-auto text-gray-700">
                <p>
                  At Campus Key Zimbabwe, we are committed to protecting your privacy and ensuring the security 
                  of your personal information. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you use our platform.
                </p>
                <p>
                  We understand that finding accommodation is a personal process, and we take our responsibility 
                  to protect your data seriously. This policy applies to all users of our platform, including 
                  students, landlords, and visitors to our website.
                </p>
                <p>
                  By using Campus Key Zimbabwe, you agree to the collection and use of information in accordance 
                  with this policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Sections */}
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

        {/* Additional Information */}
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
                    Additional Privacy Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Children's Privacy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Our services are not intended for individuals under the age of 18. We do not knowingly 
                      collect personal information from children under 18. If you are a parent or guardian and 
                      believe your child has provided us with personal information, please contact us immediately.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      International Data Transfers
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Your information may be transferred to and processed in countries other than Zimbabwe. 
                      We ensure that such transfers comply with applicable data protection laws and that 
                      appropriate safeguards are in place to protect your information.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Third-Party Links
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Our platform may contain links to third-party websites or services. We are not responsible 
                      for the privacy practices of these third parties. We encourage you to read their privacy 
                      policies before providing any personal information.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Changes to This Policy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We may update this Privacy Policy from time to time. We will notify you of any material 
                      changes by posting the new policy on this page and updating the "Last updated" date. 
                      We encourage you to review this policy periodically.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Contact Us
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                    </p>
                    <div className="mt-3 space-y-1 text-gray-700">
                      <p>Email: privacy@campuskeyzim.com</p>
                      <p>Phone: +263 77 123 4567</p>
                      <p>Address: 123 University Avenue, Harare, Zimbabwe</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">
                      Your Privacy Matters
                    </h3>
                    <p className="text-green-700">
                      We are committed to maintaining the trust you place in us. If you have any concerns about 
                      how we handle your personal information, please don't hesitate to reach out to our privacy 
                      team. We're here to help and ensure your privacy is protected.
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

export default PrivacyPage;