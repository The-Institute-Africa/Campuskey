import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  PlusCircle,
  Building,
  Eye,
  Star,
  MessageSquare,
  User,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

import { useAuth } from '@/pages/auth/api/store/auth.store';
import { fetchDashboardStats, fetchPropertyByLandlord } from "./api/landlord.api";


const LandlordDashboardPage = () => {
  const { token,user, logout } = useAuth();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [landlordStats, setLandlordStats] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
  if (!token || !user) return;

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, propertyData] = await Promise.all([
        fetchDashboardStats(),
        fetchPropertyByLandlord()
      ]);

      setLandlordStats(statsData);
      setProperties(propertyData);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Could not load your properties."
      });
    } finally {
      setLoading(false);
    }
  };

  loadDashboardData();
}, [token, user]);


  const stats = landlordStats ? [
    { title: "Total Properties", value: landlordStats.totalListings, icon: Building },
    { title: "Total Views", value: landlordStats.totalViews, icon: Eye },
    { title: "New Properties", value: landlordStats.newListingsThisMonth, icon: MessageSquare },
    { title: "Average Rating", value: landlordStats.averageRating.toFixed(1), icon: Star },
  ] : [];

  const renderStatusBadge = (property) => {
    const status = property.verification?.status;

    if (!status) {
      return (
        <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
          <AlertCircle className="h-3 w-3" />
          UNVERIFIED
        </span>
      );
    }

    if (status === "VERIFIED") {
      return (
        <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3" />
          VERIFIED
        </span>
      );
    }

    if (status === "REJECTED") {
      return (
        <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          <XCircle className="h-3 w-3" />
          REJECTED
        </span>
      );
    }

    if (status === "PENDING") {
      return (
        <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3" />
          PENDING
        </span>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Landlord Dashboard - Campus Key Zimbabwe</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
                <p className="text-gray-600">Here's your dashboard</p>
              </div>

              <Link to="/landlord/add-property">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row justify-between">
                    <CardTitle className="text-sm">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Properties */}
            <Card>
              <CardHeader>
                <CardTitle>My Properties</CardTitle>
                <CardDescription>Manage your listings</CardDescription>
              </CardHeader>

              <CardContent>
                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : properties.length === 0 ? (
                  <p className="text-center text-gray-500">No properties yet.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {properties.map(property => (
                      <div
                        key={property.id}
                        className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                      >
                        {/* Image + Badge */}
                        <div className="relative">
                          <img
                            src={property.images?.[0]?.imageUrl || "/placeholder.jpg"}
                            alt={property.name}
                            className="w-full h-40 object-cover rounded-xl"
                          />
                          {renderStatusBadge(property)}
                        </div>

                        <h3 className="text-lg font-semibold mt-3">{property.name}</h3>
                        <p className="text-gray-500">{property.address}</p>
                        <p className="font-medium mt-1">${property.price}/month</p>

                        {/* Action Buttons */}
                        <div className="mt-4 space-y-2">
                          {property.verification?.status === "VERIFIED" && (
                            <Link to={`/landlord/edit-property/${property.id}`}>
                              <Button variant="outline" className="w-full">
                                Edit
                              </Button>
                            </Link>
                          )}

                          {property.verification?.status === "REJECTED" && (
                            <Link to={`/landlord/${property.id}/verify-documents/`}>
                              <Button variant="destructive" className="w-full">
                                Reapply Verification
                              </Button>
                            </Link>
                          )}

                          {!property.verification && (
                            <Link to={`/landlord/${property.id}/verify-documents/`}>
                              <Button className="w-full">
                                Apply Verification
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandlordDashboardPage;
