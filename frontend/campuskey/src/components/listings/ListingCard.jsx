
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Wifi, Car, Shield, Users, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  security: Shield,
  kitchen: Home,
  study_room: Users,
  gym: Users,
  laundry: Home,
  garden: Home,
  pool: Users
};

const amenityLabels = {
  wifi: 'WiFi',
  parking: 'Parking',
  security: 'Security',
  kitchen: 'Kitchen',
  study_room: 'Study Room',
  gym: 'Gym',
  laundry: 'Laundry',
  garden: 'Garden',
  pool: 'Pool'
};

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <Card className="campus-hover-lift overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <img 
          className="w-full h-full object-cover"
          alt={`${listing.title} accommodation`}
         src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-green-600 text-white">
            <Star className="h-3 w-3 mr-1" />
            {listing.rating}
          </Badge>
        </div>
        <div className="absolute top-4 left-4">
          <Badge variant="outline" className="bg-white">
            ${listing.price}/month
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg">{listing.title}</CardTitle>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {listing.location}
          </div>
          <span>{listing.distance}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-4">
            {listing.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {listing.amenities.slice(0, 3).map((amenity) => {
              const Icon = amenityIcons[amenity];
              return (
                <Badge key={amenity} variant="outline" className="text-xs flex items-center gap-1">
                  {Icon && <Icon className="h-3 w-3" />}
                  {amenityLabels[amenity]}
                </Badge>
              );
            })}
            {listing.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{listing.amenities.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>by {listing.landlord}</span>
            <span>{listing.reviews} reviews</span>
          </div>
        </div>
        
        <Button 
          className="w-full bg-blue-800 hover:bg-blue-900 mt-auto"
          onClick={() => navigate(`/listing/${listing.id}`)}
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
