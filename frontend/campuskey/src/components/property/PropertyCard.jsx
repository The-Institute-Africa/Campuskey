import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, Wifi, Car, Shield, Users, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const PropertyCard = ({ listing }) => {
  const navigate = useNavigate();

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
