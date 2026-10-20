import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import PropertyCard from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Search } from 'lucide-react';
import { getFavorites } from '@/api/favorites.api';

const StudentFavoritesPage = () => {
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setFavoriteListings(await getFavorites());
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not load your saved listings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleFavoriteChange = (propertyId, isFavorite) => {
    if (!isFavorite) {
      setFavoriteListings((current) => current.filter((listing) => listing.id !== propertyId));
    }
  };

  return (
    <>
      <Helmet>
        <title>My Favorite Listings - CampusKey Zimbabwe</title>
        <meta name="description" content="View your saved favorite listings on CampusKey Zimbabwe." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-12 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Favorite Listings</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Your saved properties, all in one place.</p>
              </div>
              {loading ? (
                <p role="status" className="py-12 text-center text-muted-foreground">Loading favorites…</p>
              ) : error ? (
                <Card className="p-8 text-center">
                  <p role="alert">{error}</p>
                  <Button className="mt-4" onClick={loadFavorites}>Try again</Button>
                </Card>
              ) : favoriteListings.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {favoriteListings.map((listing, index) => (
                    <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                      <PropertyCard listing={listing} isFavorite onFavoriteChange={handleFavoriteChange} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="px-6 py-20 text-center">
                  <Heart className="mx-auto h-12 w-12 text-gray-400" />
                  <h2 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">No favorites saved yet</h2>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">Click the heart on a listing to save it here.</p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/properties"><Search className="mr-2 h-4 w-4" />Find a property</Link>
                    </Button>
                  </div>
                </Card>
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
