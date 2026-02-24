import React from 'react';
import { Star, MapPin, CheckCircle, AlertCircle, Wifi, Car, Shield, Users, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  security: Shield,
  kitchen: Home,
  laundry: Users,
  study_room: Users,
  gym: Users,
  pool: Users,
  garden: Home
};

const amenityLabels = {
  wifi: 'WiFi',
  parking: 'Parking',
  security: 'Security',
  kitchen: 'Kitchen',
  laundry: 'Laundry',
  study_room: 'Study Room',
  gym: 'Gym',
  pool: 'Pool',
  garden: 'Garden'
};

const PropertyInfo = ({ listing }) => {
  return (
    <div className="lg:col-span-2 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{listing.title}</CardTitle>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {listing.location} • {listing.distance}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-semibold">{listing.rating}</span>
                  <span className="text-gray-600 ml-1">({listing.reviews} reviews)</span>
                </div>
                <Badge variant="outline">{listing.propertyType}</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-800">${listing.price}</div>
              <div className="text-gray-600">per month</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{listing.description}</p>
        </CardContent>
      </Card>

  <Card>
    <CardHeader>
      <CardTitle>Amenities</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

      {Array.isArray(listing.amenities) && listing.amenities.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {listing.amenities.map((item, i) => {
        const rawAmenity = typeof item === "string" ? item : item.name;
        const amenity = rawAmenity
          .toLowerCase()
          .replace(/[\s-]+/g, "_");
        const Icon = amenityIcons[amenity];
        const Label = amenityLabels[amenity] || rawAmenity;
        return (
          <div key={i} className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-green-600" />}
              {Label}
          </div>
        );
      })}
    </div>
  )}


      </div>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Features & Inclusions</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Array.isArray(listing.utilities) &&
          listing.utilities.map((u, i) => (
            <div key={`utility-${i}`} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>{u.name}</span>
            </div>
          ))}
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>House Rules</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">

        {Array.isArray(listing.rules) &&
          listing.rules.map((u, i) => (
            <div key={`rules-${i}`} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>{u.description}</span>
            </div>
          ))}
      </div>
    </CardContent>
  </Card>

     {/* <Card>
        <CardHeader>
          <CardTitle>Nearby Places</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {listing.nearbyPlaces.map((place, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{place.name}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {place.type}
                  </Badge>
                </div>
                <span className="text-gray-600">{place.distance}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default PropertyInfo;
