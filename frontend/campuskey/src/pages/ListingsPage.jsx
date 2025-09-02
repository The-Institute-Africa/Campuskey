
import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { mockListings } from '@/data/mockListings';
import ListingCard from '@/components/listings/ListingCard';
import ListingsSearchHeader from '@/components/listings/ListingsSearchHeader';
import ListingsFilterPanel from '@/components/listings/ListingsFilterPanel';
import NoListingsFound from '@/components/listings/NoListingsFound';

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    priceRange: searchParams.get('price') || '',
    propertyType: '',
    amenities: []
  });
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings = useMemo(() => {
    let filtered = [...mockListings];

    if (filters.location) {
      filtered = filtered.filter(listing => 
        listing.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        listing.distance.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.priceRange) {
      const [minStr, maxStr] = filters.priceRange.split('-');
      const min = parseInt(minStr);
      const max = maxStr ? parseInt(maxStr) : Infinity;
      filtered = filtered.filter(listing => listing.price >= min && listing.price <= max);
    }

    if (filters.propertyType) {
      filtered = filtered.filter(listing => listing.propertyType === filters.propertyType);
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(listing => 
        filters.amenities.every(amenity => listing.amenities.includes(amenity))
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: '',
      propertyType: '',
      amenities: []
    });
  };

  return (
    <>
      <Helmet>
        <title>Student Accommodation Listings - Campus Key Zimbabwe</title>
        <meta name="description" content="Browse verified student accommodation near Zimbabwe's universities. Find apartments, shared houses, and campus residences with our advanced search filters." />
        <meta property="og:title" content="Student Accommodation Listings - Campus Key Zimbabwe" />
        <meta property="og:description" content="Browse verified student accommodation near Zimbabwe's universities. Find apartments, shared houses, and campus residences with our advanced search filters." />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <ListingsSearchHeader
          location={filters.location}
          onLocationChange={(value) => handleFilterChange('location', value)}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          showFilters={showFilters}
          onShowFiltersChange={setShowFilters}
        />

        {showFilters && (
          <ListingsFilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onAmenityToggle={handleAmenityToggle}
            onClearFilters={clearFilters}
            resultsCount={filteredListings.length}
          />
        )}

        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredListings.length === 0 ? (
              <NoListingsFound onClearFilters={clearFilters} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredListings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ListingCard listing={listing} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ListingsPage;
