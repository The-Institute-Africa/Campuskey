import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Users, Shield, Clock, ArrowRight, Building, Home } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { fetchProperties, getPropertyImageUrl, fetchPropertyAmenities, fetchPropertyUtilities } from './student/api/student.api';
import AnimatedBackground from '@/components/AnimatedBackground';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  const [amenities, setAmenities] = useState([]);
  const [utilities, setUtilities] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [propsData, amenitiesData, utilitiesData] = await Promise.all([
          fetchProperties(),
          fetchPropertyAmenities(),
          fetchPropertyUtilities(),
        ]);

        setProperties(Array.isArray(propsData) ? propsData : []);
        setAmenities(Array.isArray(amenitiesData) ? amenitiesData : []);
        setUtilities(Array.isArray(utilitiesData) ? utilitiesData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const featuredListings = properties.slice(0, 3);
  
  const handleSearch = () => {
    if (!searchLocation) {
      toast({
        title: "Please enter a location",
        description: "Enter a location to search for accommodation.",
        variant: "destructive",
      });
      return;
    }

    const params = new URLSearchParams();
    if (searchLocation) params.append('location', searchLocation);
    if (priceRange) params.append('price', priceRange);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <>
      <Helmet>
        <title>Campus Key Zimbabwe - Find Student Accommodation</title>
        <meta
          name="description"
          content="Find quality student accommodation near Zimbabwe's top universities. Connect with verified landlords and secure your perfect student housing today."
        />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="relative campus-hero-bg py-20 lg:py-32 overflow-hidden">
          <AnimatedBackground />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
            >
              Find Your Perfect <span className="block text-green-400">Student Home</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto"
            >
              Discover quality accommodation near Zimbabwe's top universities. Safe, affordable, and verified properties for students.
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

            {loading ? (
              <p className="text-center text-gray-600">Loading properties...</p>
            ) : featuredListings.length === 0 ? (
              <p className="text-center text-gray-500">No featured listings available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredListings.map((listing, index) => (
                  <motion.div
                    key={listing.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card className="campus-hover-lift overflow-hidden">
                      <div className="relative h-48">
                        <img
                          className="w-full h-full object-cover"
                          alt={`${listing.title || 'Property'} accommodation`}
                          src={getPropertyImageUrl(listing) }
                        />
                        {listing.rating && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-green-600 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              {listing.rating}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardHeader>
                        <CardTitle className="text-lg">{listing.name || "Untitled Property"}</CardTitle>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {listing.location || "Unknown Location"}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-blue-800">
                            {listing.price ? `$${listing.price}` : "Price not set"}/month
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4">
                          {Array.isArray(listing.amenities) &&
                            listing.amenities.map((a, i) => (
                              <Badge key={`amenity-${i}`} variant="outline" className="text-xs">
                                {a.name}
                              </Badge>
                            ))}

                          {Array.isArray(listing.utilities) &&
                            listing.utilities.map((u, i) => (
                              <Badge key={`utility-${i}`} variant="outline" className="text-xs">
                                {u.name}
                              </Badge>
                            ))}
                        </div>

                        <Button
                          className="w-full bg-blue-800 hover:bg-blue-900"
                          onClick={() => navigate(`/property/${listing.slug}`)}
                        >
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/properties')}
                className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
              >
                View All Listings
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
