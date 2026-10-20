import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, Wifi, Car, Shield, Users, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/pages/auth/api/store/auth.store";
import { addFavorite, removeFavorite } from "@/api/favorites.api";
import { toast } from "@/components/ui/use-toast";
import {getPropertyImageUrl} from '@/pages/student/api/student.api';

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  security: Shield,
  kitchen: Home,
  study_room: Users,
  gym: Users,
  laundry: Home,
  garden: Home,
  pool: Users,
};

const amenityLabels = {
  wifi: "WiFi",
  parking: "Parking",
  security: "Security",
  kitchen: "Kitchen",
  study_room: "Study Room",
  gym: "Gym",
  laundry: "Laundry",
  garden: "Garden",
  pool: "Pool",
};

const PropertyCard = ({ listing, isFavorite = false, onFavoriteChange }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savingFavorite, setSavingFavorite] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const toggleFavorite = async (event) => {
    event.stopPropagation();
    if (!user?.roles?.includes("ROLE_STUDENT")) {
      toast({
        title: "Student sign-in required",
        description: "Sign in with a student account to save properties.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    setSavingFavorite(true);
    try {
      if (favorite) {
        await removeFavorite(listing.id);
        setFavorite(false);
        onFavoriteChange?.(listing.id, false);
      } else {
        await addFavorite(listing.id);
        setFavorite(true);
        onFavoriteChange?.(listing.id, true);
      }
    } catch (error) {
      toast({
        title: "Could not update favorites",
        description: error.response?.data?.message || error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingFavorite(false);
    }
  };

  return (
    <Card className="campus-hover-lift overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48">
        <img
          className="w-full h-full object-cover"
          alt={`${listing.name} accommodation`}
          src={getPropertyImageUrl(listing) }
        />
        {/* Price */}
        <div className="absolute top-4 left-4">
          <Badge variant="outline" className="bg-white">
            ${listing.price}/month
          </Badge>
        </div>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorite}
          disabled={savingFavorite}
          onClick={toggleFavorite}
          className="absolute right-4 top-4 rounded-full bg-white/90 hover:bg-white"
        >
          <Heart className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{listing.name}</CardTitle>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {listing.location}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-4">{listing.description}</p>

           Amenities
          <div className="flex flex-wrap gap-2 mb-4">
            {(listing.amenities || []).slice(0, 3).map((amenity) => {
              // handle both object {id, name} and plain string "wifi"
              const amenityName = typeof amenity === "string" ? amenity : amenity.name;
              const Icon = amenityIcons[amenityName];

              return (
                <Badge
                  key={typeof amenity === "string" ? amenity : amenity.id}
                  variant="outline"
                  className="text-xs flex items-center gap-1"
                >
                  {Icon && <Icon className="h-3 w-3" />}
                  {amenityLabels[amenityName] || amenityName}
                </Badge>
              );
            })}

            {listing.amenities && listing.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{listing.amenities.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>by {listing.landlord?.name || "Unknown Landlord"}</span>
          </div>
        </div>

        <Button
          className="w-full bg-blue-800 hover:bg-blue-900 mt-auto"
          onClick={() => navigate(`/property/${listing.slug}`)}
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
