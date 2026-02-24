import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import PropertyCard from '@/components/property/PropertyCard';
import { mockListings as allListings } from '@/data/mockListings';
import { Button } from '@/components/ui/button';
import { Heart, Search } from 'lucide-react';

const StudentFavoritesPage = () => {
  const [favoriteListings, setFavoriteListings] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch this from a user profile API.
    // For now, we'll simulate it by grabbing a few mock listings.
    // Let's assume the user has favorited listings with IDs 1, 3, and 5.
    const favoriteIds = [1, 3, 5];
    const favorites = allListings.filter(listing => favoriteIds.includes(listing.id));
    setFavoriteListings(favorites);
  }, []);

  return (
    <>
      <Helmet>
        <title>My Favorite Listings - Campus Key Zimbabwe</title>
        <meta name="description" content="View your saved favorite listings on Campus Key Zimbabwe." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 text-center">
                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Favorite Listings</h1>
                 <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                    Your saved properties, all in one place.
                 </p>
              </div>

              {favoriteListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteListings.map((listing, index) => (
                     <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <ListingCard listing={listing} />
                     </motion.div>
                  ))}
                </div>
              ) : (
                 <div className="text-center py-20 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <Heart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">No favorites saved yet</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                      Click the heart icon on any listing to save it here.
                    </p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link to="/listings">
                          <Search className="mr-2 h-4 w-4" /> Find Your Perfect Place
                        </Link>
                      </Button>
                    </div>
                  </div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StudentFavoritesPage;
