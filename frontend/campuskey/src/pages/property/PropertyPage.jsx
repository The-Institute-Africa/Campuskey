import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/pages/auth/api/store/auth.store';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ListingCard from '@/components/property/PropertyCard';
import ListingsSearchHeader from '@/components/property/PropertySearchHeader';
import ListingsFilterPanel from '@/components/property/PropertyFilterPanel';
import NoListingsFound from '@/components/property/NoPropertyFound';
import {
  fetchProperties,
} from '../student/api/student.api';
import { getFavorites } from '@/api/favorites.api';

const PropertyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [favoritesError, setFavoritesError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const propsData = await fetchProperties();
      setProperties(Array.isArray(propsData) ? propsData : []);
      if (user?.roles?.includes('ROLE_STUDENT')) {
        try {
          const favoritesData = await getFavorites();
          setFavoriteIds(Array.isArray(favoritesData) ? favoritesData.map((property) => property.id) : []);
          setFavoritesError('');
        } catch (error) {
          setFavoriteIds([]);
          setFavoritesError(error.response?.data?.message || 'Your saved properties could not be loaded.');
        }
      } else {
        setFavoriteIds([]);
        setFavoritesError('');
      }
    } catch (error) {
      setLoadError(error.response?.data?.message || 'Properties could not be loaded. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.roles]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // State synced with searchParams
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    priceRange: searchParams.get('price') || '',
    propertyType: searchParams.get('type') || '',
    amenities: searchParams.getAll('amenities') || [],
  });
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = {};

    if (filters.location) params.location = filters.location;
    if (filters.priceRange) params.price = filters.priceRange;
    if (filters.propertyType) params.type = filters.propertyType;
    if (filters.amenities.length > 0) params.amenities = filters.amenities;
    if (sortBy) params.sort = sortBy;

    setSearchParams(params);
  }, [filters, sortBy, setSearchParams]);

  // Filtering logic
  const filteredListings = useMemo(() => {
    let filtered = [...properties];

   if (filters.location) {
  const searchTerm = filters.location.toLowerCase();
  filtered = filtered.filter((listing) =>
    (listing.address?.toLowerCase().includes(searchTerm) ||
     listing.location?.toLowerCase().includes(searchTerm) ||
     listing.university?.toLowerCase().includes(searchTerm) ||
    listing.name?.toLowerCase().includes(searchTerm))
  );
}

    if (filters.priceRange) {
      const [minStr, maxStr] = filters.priceRange.replace('+', '-').split('-');
      const min = parseInt(minStr);
      const max = maxStr && Number.isFinite(parseInt(maxStr)) ? parseInt(maxStr) : Infinity;
      filtered = filtered.filter(
        (listing) => listing.price >= min && listing.price <= max
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(
        (listing) => listing.propertyType === filters.propertyType
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter((listing) =>
        filters.amenities.every((amenity) =>
          (listing.amenities || []).some(
            (a) => (typeof a === 'string' ? a : a.name) === amenity
          )
        )
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        break;
    }

    return filtered;
  }, [filters, sortBy, properties]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (propertyAmenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(propertyAmenity)
        ? prev.amenities.filter((a) => a !== propertyAmenity)
        : [...prev.amenities, propertyAmenity],
    }));
  };

  const handleFavoriteChange = (propertyId, isFavorite) => {
    setFavoriteIds((current) => isFavorite
      ? [...new Set([...current, propertyId])]
      : current.filter((id) => id !== propertyId));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: '',
      propertyType: '',
      amenities: [],
    });
    setSortBy('newest');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Student Accommodation Listings - Campus Key Zimbabwe</title>
        <meta
          name="description"
          content="Browse verified student accommodation near Zimbabwe's universities. Find apartments, shared houses, and campus residences with our advanced search filters."
        />
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
            {favoritesError && (
              <p role="status" className="mb-4 text-center text-sm text-amber-700">{favoritesError}</p>
            )}
            {loadError ? (
              <div className="py-16 text-center">
                <p role="alert" className="mb-4 text-gray-700">{loadError}</p>
                <button className="text-blue-800 underline" onClick={loadData}>Try again</button>
              </div>
            ) : filteredListings.length === 0 ? (
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
                    <ListingCard
                      listing={listing}
                      isFavorite={favoriteIds.includes(listing.id)}
                      onFavoriteChange={handleFavoriteChange}
                    />
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

export default PropertyPage;
