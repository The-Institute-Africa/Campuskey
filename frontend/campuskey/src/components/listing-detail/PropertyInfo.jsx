
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
            {listing.amenities.map((propertyAmenity) => {
              const Icon = amenityIcons[propertyAmenity];
              return (
                <div key={propertyAmenity} className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-green-600" />
                  <span>{amenityLabels[propertyAmenity]}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features & Inclusions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {listing.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>{feature}</span>
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
            {listing.propertyRules.map((propertyRule, index) => (
              <div key={index} className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[hsl(var(--alert-main))] mt-0.5" />
                <span>{propertyRule}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
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
      </Card>
    </div>
  );
};

export default PropertyInfo;
