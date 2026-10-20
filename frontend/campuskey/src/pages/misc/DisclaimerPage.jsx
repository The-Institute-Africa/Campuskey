import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, FileText, Users, Home, Scale } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DisclaimerPage = () => {
  const sections = [
    {
      icon: AlertTriangle,
      title: "General Disclaimer",
      content: [
        {
          subtitle: "Information Accuracy",
          text: "The information on this website is provided on an 'as is' basis. While we make every effort to ensure that the information on our platform is accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website."
        },
        {
          subtitle: "Use at Your Own Risk",
          text: "Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website."
        }
      ]
    },
    {
      icon: Home,
      title: "Property Listings Disclaimer",
      content: [
        {
          subtitle: "Third-Party Content",
          text: "Property listings on our platform are provided by third-party landlords and property owners. While we verify listings to the best of our ability, we do not guarantee the accuracy of property descriptions, photos, pricing, availability, or any other information provided by landlords."
        },
        {
          subtitle: "Property Condition",
          text: "We strongly recommend that all users visit properties in person before making any commitments. Campus Key Zimbabwe is not responsible for any discrepancies between online listings and actual property conditions, or for any issues that may arise from property rentals."
        },
        {
          subtitle: "Availability",
          text: "Property availability is subject to change without notice. Listings may become unavailable between the time you view them and when you attempt to apply. We are not responsible for any inconvenience caused by changes in property availability."
        }
      ]
    },
    {
      icon: Users,
      title: "User Interactions",
      content: [
        {
          subtitle: "Third-Party Relationships",
          text: "Campus Key Zimbabwe facilitates connections between students and landlords but is not a party to any rental agreements or transactions. We do not guarantee the behavior, reliability, or trustworthiness of any users on our platform."
        },
        {
          subtitle: "Communication",
          text: "All communications between users are conducted independently. We are not responsible for the content of messages exchanged between users or for any agreements made outside of our platform."
        },
        {
          subtitle: "Disputes",
          text: "Any disputes arising between users should be resolved directly between the parties involved. While we may provide assistance in facilitating communication, we are not responsible for resolving disputes or enforcing agreements."
        }
      ]
    },
    {
      icon: Shield,
      title: "Safety and Security",
      content: [
        {
          subtitle: "Personal Safety",
          text: "Users are responsible for their own safety when viewing properties, meeting with landlords, or engaging in any activities related to accommodation searches. We recommend always informing someone of your whereabouts and bringing a friend when viewing properties."
        },
        {
          subtitle: "Financial Security",
          text: "Users should exercise caution when making any financial transactions. We recommend using secure payment methods and obtaining proper receipts for all payments. Be wary of requests for unusual payment methods or upfront payments before viewing properties."
        },
        {
          subtitle: "Identity Verification",
          text: "While we make efforts to verify user identities, we cannot guarantee that all users are who they claim to be. Users should take appropriate precautions when sharing personal information or meeting with other users."
        }
      ]
    },
    {
      icon: Scale,
      title: "Legal Disclaimer",
      content: [
        {
          subtitle: "Legal Advice",
          text: "Information provided on our platform does not constitute legal advice. Users should consult with qualified legal professionals regarding any legal matters related to rental agreements, tenant rights, or property law."
        },
        {
          subtitle: "Compliance",
          text: "Users are responsible for ensuring their use of our platform and any resulting agreements comply with all applicable local, national, and international laws and regulations."
        },
        {
          subtitle: "Jurisdiction",
          text: "This disclaimer is governed by the laws of Zimbabwe. Any disputes arising from the use of our platform will be subject to the exclusive jurisdiction of the courts of Zimbabwe."
        }
      ]
    },
    {
      icon: FileText,
      title: "Service Limitations",
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to maintain continuous service availability but cannot guarantee uninterrupted access to our platform. We may need to suspend or limit access for maintenance, updates, or other operational reasons."
        },
        {
          subtitle: "Technical Issues",
          text: "We are not responsible for any technical issues, including but not limited to server downtime, data loss, or connectivity problems that may affect your use of our platform."
        },
        {
          subtitle: "Third-Party Services",
          text: "Our platform may integrate with third-party services (payment processors, mapping services, etc.). We are not responsible for the availability, accuracy, or reliability of these third-party services."
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Disclaimer - Campus Key Zimbabwe</title>
        <meta name="description" content="Read important disclaimers about using Campus Key Zimbabwe. Understand limitations, responsibilities, and legal information for our student accommodation platform." />
        <meta property="og:title" content="Disclaimer - Campus Key Zimbabwe" />
        <meta property="og:description" content="Read important disclaimers about using Campus Key Zimbabwe. Understand limitations, responsibilities, and legal information for our student accommodation platform." />
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
              Disclaimer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Important information about the use of our platform and services
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
                Important Notice
              </h2>
              <div className="prose prose-lg mx-auto text-gray-700">
                <p>
                  This disclaimer governs your use of Campus Key Zimbabwe. By using our platform,
                  you accept this disclaimer in full. If you disagree with any part of this disclaimer,
                  you must not use our platform.
                </p>
                <p>
                  Campus Key Zimbabwe is a platform that connects students with accommodation providers.
                  We facilitate these connections but are not responsible for the actual rental agreements,
                  property conditions, or interactions between users.
                </p>
                <p>
                  Please read this disclaimer carefully and ensure you understand your rights and
                  responsibilities when using our services.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Disclaimer Sections */}
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

        {/* Important Reminders */}
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
                    Important Reminders for Users
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[hsl(var(--alert-light))] p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-[hsl(var(--alert-dark))] mb-3">
                        For Students
                      </h3>
                      <ul className="text-[hsl(var(--alert-dark))] space-y-2 text-sm">
                        <li>• Always view properties in person before committing</li>
                        <li>• Verify landlord credentials and property ownership</li>
                        <li>• Read all agreements carefully before signing</li>
                        <li>• Keep records of all communications and payments</li>
                        <li>• Report suspicious activities immediately</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        For Landlords
                      </h3>
                      <ul className="text-blue-700 space-y-2 text-sm">
                        <li>• Provide accurate property information</li>
                        <li>• Respond to inquiries promptly and professionally</li>
                        <li>• Comply with all applicable housing laws</li>
                        <li>• Maintain properties to advertised standards</li>
                        <li>• Use secure payment methods</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">
                      Red Flags to Watch For
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="text-red-700 space-y-1 text-sm">
                        <li>• Requests for payment before viewing</li>
                        <li>• Unusually low prices for premium properties</li>
                        <li>• Pressure to sign agreements immediately</li>
                        <li>• Requests for unusual payment methods</li>
                      </ul>
                      <ul className="text-red-700 space-y-1 text-sm">
                        <li>• Landlords who won't meet in person</li>
                        <li>• Properties with no verification badge</li>
                        <li>• Poor communication or evasive answers</li>
                        <li>• Requests for personal documents upfront</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Contact Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      If you have any questions about this disclaimer or need to report any issues,
                      please contact us:
                    </p>
                    <div className="space-y-1 text-gray-700">
                      <p>Email: legal@campuskeyzim.com</p>
                      <p>Phone: +263 77 123 4567</p>
                      <p>Emergency: +263 71 987 6543</p>
                      <p>Address: 123 University Avenue, Harare, Zimbabwe</p>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Acknowledgment
                    </h3>
                    <p className="text-gray-700">
                      By using Campus Key Zimbabwe, you acknowledge that you have read, understood,
                      and agree to be bound by this disclaimer. You also acknowledge that you use
                      our platform at your own risk and that we have made you aware of the limitations
                      of our services.
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

export default DisclaimerPage;
