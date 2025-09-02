
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Users, Shield, Clock, ArrowRight, Building, Home, Phone } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';

const HomePage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchLocation) {
      toast({
        title: "Please enter a location",
        description: "Enter a location to search for accommodation.",
        variant: "destructive"
      });
      return;
    }
    
    const params = new URLSearchParams();
    if (searchLocation) params.append('location', searchLocation);
    if (priceRange) params.append('price', priceRange);
    
    navigate(`/listings?${params.toString()}`);
  };

  const featuredListings = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      location: "Near UZ Campus",
      price: "$200/month",
      rating: 4.8,
      image: "Modern studio apartment with contemporary furnishings",
      features: ["WiFi", "Parking", "Security"]
    },
    {
      id: 2,
      title: "Shared House",
      location: "MSU Area",
      price: "$120/month",
      rating: 4.6,
      image: "Comfortable shared house with multiple bedrooms",
      features: ["Kitchen", "Laundry", "Garden"]
    },
    {
      id: 3,
      title: "Campus Residence",
      location: "NUST Vicinity",
      price: "$180/month",
      rating: 4.9,
      image: "Campus residence building with student facilities",
      features: ["Study Room", "Gym", "Cafeteria"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Campus Key Zimbabwe - Find Student Accommodation</title>
        <meta name="description" content="Find quality student accommodation near Zimbabwe's top universities. Connect with verified landlords and secure your perfect student housing today." />
        <meta property="og:title" content="Campus Key Zimbabwe - Find Student Accommodation" />
        <meta property="og:description" content="Find quality student accommodation near Zimbabwe's top universities. Connect with verified landlords and secure your perfect student housing today." />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="relative campus-hero-bg py-20 lg:py-32 overflow-hidden">
          <AnimatedBackground />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl lg:text-6xl font-bold text-white mb-6"
              >
                Find Your Perfect
                <span className="block text-green-400">Student Home</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto"
              >
                Discover quality accommodation near Zimbabwe's top universities. 
                Safe, affordable, and verified properties for students.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="campus-card rounded-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Enter location (e.g., UZ, MSU, NUST)"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                    
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Price Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-100">$0 - $100</SelectItem>
                        <SelectItem value="100-200">$100 - $200</SelectItem>
                        <SelectItem value="200-300">$200 - $300</SelectItem>
                        <SelectItem value="300+">$300+</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      onClick={handleSearch}
                      className="h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
                Why Choose Campus Key Zimbabwe?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We make finding student accommodation simple, safe, and stress-free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 campus-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Verified Properties</h3>
                <p className="text-gray-600">
                  All listings are verified and approved by our team to ensure quality and safety
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 campus-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Trusted Community</h3>
                <p className="text-gray-600">
                  Connect with verified landlords and join a community of students
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 campus-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Quick & Easy</h3>
                <p className="text-gray-600">
                  Find and apply for accommodation in minutes with our streamlined process
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
                Featured Accommodation
              </h2>
              <p className="text-xl text-gray-600">
                Discover popular student housing options
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="campus-hover-lift overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        className="w-full h-full object-cover"
                        alt={`${listing.title} accommodation`}
                       src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-600 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          {listing.rating}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {listing.location}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-blue-800">{listing.price}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {listing.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full bg-blue-800 hover:bg-blue-900"
                        onClick={() => navigate(`/listing/${listing.id}`)}
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/listings')}
                className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
              >
                View All Listings
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 campus-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Find Your Student Home?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have found their perfect accommodation through Campus Key Zimbabwe
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-800 hover:bg-gray-100"
                  onClick={() => navigate('/listings')}
                >
                  <Home className="h-5 w-5 mr-2" />
                  Find Accommodation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-black hover:bg-white hover:text-blue-800"
                  onClick={() => navigate('/landlord/signup')}
                >
                  <Building className="h-5 w-5 mr-2" />
                  List Your Property
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
