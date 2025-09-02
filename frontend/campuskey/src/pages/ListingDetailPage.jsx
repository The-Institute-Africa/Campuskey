
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import ImageGallery from '@/components/listing-detail/ImageGallery';
import PropertyInfo from '@/components/listing-detail/PropertyInfo';
import BookingCard from '@/components/listing-detail/BookingCard';
import LandlordInfo from '@/components/listing-detail/LandlordInfo';
import SafetyNotice from '@/components/listing-detail/SafetyNotice';
import { mockListings } from '@/data/mockListings'; // Assume full details are here now

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the full listing data from mock data
  const listing = mockListings.find(l => l.id === parseInt(id));

  // In a real app, you would fetch this from an API, and handle loading/error states.
  if (!listing) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Listing not found</h1>
          <Button onClick={() => navigate('/listings')} className="mt-4">Back to Listings</Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Extend mock data if it doesn't have all details
  const fullListing = {
    ...listing,
    images: [
      "Modern studio apartment with contemporary furnishings and large windows",
      "Spacious living area with comfortable seating and study desk",
      "Fully equipped kitchen with modern appliances",
      "Clean bathroom with shower and modern fixtures",
      "Bedroom area with comfortable bed and storage space"
    ],
    features: [
      "Fully furnished", "High-speed WiFi included", "24/7 security", "Secure parking space",
      "Shared laundry facilities", "Study area with desk", "Air conditioning", "Water and electricity included"
    ],
    rules: [
      "No smoking inside the apartment", "No pets allowed", "Quiet hours: 10 PM - 7 AM",
      "Maximum 2 guests at a time", "Monthly rent due by 5th of each month"
    ],
    nearbyPlaces: [
      { name: "University of Zimbabwe", distance: "0.5km", type: "University" },
      { name: "Avondale Shopping Centre", distance: "1.2km", type: "Shopping" },
    ],
    availability: "Available from January 2024",
    deposit: `$${listing.price} (1 month rent)`,
    leaseTerm: "Minimum 6 months",
    utilities: "Water and electricity included"
  };

  return (
    <>
      <Helmet>
        <title>{fullListing.title} - Campus Key Zimbabwe</title>
        <meta name="description" content={`${fullListing.title} in ${fullListing.location}. $${fullListing.price}/month. ${fullListing.description.substring(0, 150)}...`} />
        <meta property="og:title" content={`${fullListing.title} - Campus Key Zimbabwe`} />
        <meta property="og:description" content={`${fullListing.title} in ${fullListing.location}. $${fullListing.price}/month. ${fullListing.description.substring(0, 150)}...`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button
              variant="outline"
              onClick={() => navigate('/listings')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Button>
          </div>
        </div>

        <ImageGallery images={fullListing.images} title={fullListing.title} />

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

export default ListingDetailPage;
