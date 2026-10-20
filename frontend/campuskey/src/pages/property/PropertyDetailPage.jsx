import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import ImageGallery from '@/components/property-detail/ImageGallery';
import PropertyInfo from '@/components/property-detail/PropertyInfo';
import BookingCard from '@/components/property-detail/BookingCard';
import LandlordInfo from '@/components/property-detail/LandlordInfo';
import SafetyNotice from '@/components/property-detail/SafetyNotice';
import { fetchPropertyBySlug } from '../student/api/student.api';
import { useAuth } from '../student/api/index';


const PropertyDetailPage = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPropertyData = async (slug,user) => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProperty = await fetchPropertyBySlug(slug,user?.token);
        setProperty(fetchedProperty);
      } catch (err) {
        console.error('Error fetching property data:', err);
        setError('Failed to load property. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadPropertyData(slug,user);
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (error || !property) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">{error || 'Listing not found'}</h1>
          <Button onClick={() => navigate('/properties')} className="mt-4">
            Back to Listings
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const fullListing = { ...property, images: property.images || [], landlord: property.landlord || {} , description: property.description || '' , title: property.title || '', location: property.location || '', price: property.price || '' , };

  return (
    <>
      <Helmet>
        <title>{fullListing.name} - Campus Key Zimbabwe</title>
        <meta
          name="description"
          content={`${fullListing.name} in ${fullListing.location}. $${fullListing.price}/month. ${fullListing.description?.substring(0, 150)}...`}
        />
        <meta property="og:title" content={`${fullListing.name} - Campus Key Zimbabwe`} />
        <meta
          property="og:description"
          content={`${fullListing.name} in ${fullListing.location}. $${fullListing.price}/month. ${fullListing.description?.substring(0, 150)}...`}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button
              variant="outline"
              onClick={() => navigate('/properties')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Button>
          </div>
        </div>

        <ImageGallery images={fullListing.images} title={fullListing.name} />

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <PropertyInfo listing={fullListing} />
             <div className="space-y-6">
                <BookingCard listing={fullListing} />
                <LandlordInfo landlord={fullListing.landlord} />
                <SafetyNotice />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PropertyDetailPage;
