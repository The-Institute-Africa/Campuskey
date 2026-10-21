import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Target, Eye, Award, Shield, Heart } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We verify all properties and landlords to ensure student safety and peace of mind."
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every decision we make prioritizes the needs and wellbeing of students."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building connections between students, landlords, and the broader university community."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to providing the highest quality service and accommodation standards."
    }
  ];

  const team = [
    {
      name: "Ashly K Mandimutsira",
      role: "CEO & Founder of CampusKey and Loop",
      image: "Ashly K Mandimutsira",
      description: "Leads the vision and growth of CampusKey and Loop."
    },
    {
      name: "Talent Chiradza",
      role: "Former Founder & Frontend Developer",
      image: "Talent Chiradza",
      description: "Contributed to CampusKey as a founder and frontend developer."
    },
    {
      name: "The Institute",
      role: "Student Organization",
      image: "The Institute student organization",
      description: "A student organization supporting student-led ideas and initiatives."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - CampusKey Zimbabwe</title>
        <meta name="description" content="Learn about Campus Key Zimbabwe's mission to connect students with quality accommodation. Discover our story, values, and commitment to student housing." />
        <meta property="og:title" content="About Us - Campus Key Zimbabwe" />
        <meta property="og:description" content="Learn about Campus Key Zimbabwe's mission to connect students with quality accommodation. Discover our story, values, and commitment to student housing." />
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
              About Campus Key Zimbabwe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Connecting students with quality accommodation across Zimbabwe's universities
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <Target className="h-8 w-8 text-blue-800 mr-3" />
                      <h2 className="text-3xl font-bold campus-text-gradient">Our Mission</h2>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      To revolutionize student accommodation in Zimbabwe by creating a trusted platform
                      that connects students with verified, quality housing options near their universities.
                      We strive to make the accommodation search process simple, safe, and stress-free.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <Eye className="h-8 w-8 text-green-600 mr-3" />
                      <h2 className="text-3xl font-bold campus-text-gradient">Our Vision</h2>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      To become Zimbabwe's leading student accommodation platform, where every student
                      can easily find safe, affordable, and comfortable housing that enhances their
                      university experience and academic success.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                  alt="Students studying together in comfortable accommodation"
                 src="https://images.unsplash.com/photo-1684216515816-5e26dc01991d" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-6">Our Story</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Campus Key Zimbabwe was born from personal experience. As university students, our founders
                  faced the same challenges that thousands of students encounter every year - finding safe,
                  affordable, and quality accommodation near their campus.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  After hours of sifting through unreliable listings, dealing with unverified landlords,
                  and encountering accommodation scams, they realized there had to be a better way.
                  We launched Campus Key Zimbabwe with a clear mission:
                   to create a trusted platform where student safety and satisfaction come first.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we're proud to serve students across Zimbabwe's major universities, connecting them
                  with verified landlords and quality accommodation options. Our platform has helped thousands
                  of students find their perfect home away from home.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">The principles that guide everything we do</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full campus-hover-lift">
                    <CardHeader>
                      <div className="w-16 h-16 campus-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600">The passionate people behind CampusKey Zimbabwe</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="text-center campus-hover-lift">
                    <CardHeader>
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          alt={`${member.name} profile photo`}
                         src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                      </div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <p className="text-blue-800 font-semibold">{member.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 campus-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Impact</h2>
              <p className="text-xl text-gray-200">Making a difference in student accommodation</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">5,000+</div>
                <div className="text-gray-200">Students Helped</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">1,200+</div>
                <div className="text-gray-200">Verified Properties</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-200">Trusted Landlords</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">15+</div>
                <div className="text-gray-200">University Areas</div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
