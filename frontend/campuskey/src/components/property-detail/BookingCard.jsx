
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
const BookingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleApplyForAccommodation = () => {
    navigate(`/apply/${property.slug}`);
  };

  const handleContactLandlord = () => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "Direct landlord contact will be available soon! 🚀",
    });
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = listing.landlord.phone.replace(/\D/g, '');
    const message = `Hi! I'm interested in your property: ${listing.title} at ${listing.location}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="sticky top-6 campus-shadow">
      <CardHeader>
        <CardTitle className="text-center">Book This Property</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-800">${listing.price}</div>
          <div className="text-gray-600">per month</div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Availability:</span>
            <span className="font-medium">{listing.availability}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Deposit:</span>
            <span className="font-medium">${listing.propertyDeposit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Lease Term:</span>
            <span className="font-medium">Negotiable</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Utilities:</span>
            <span className="font-medium">
            {Array.isArray(listing.utilities) &&
              listing.utilities.map((u, i) => (
                <Badge key={`utility-${i}`} variant="outline" className="text-xs">
                  {u.name}
                </Badge>
              ))}
              </span>

          </div>
        </div>
        <div className="space-y-3">
          <Button
            className="w-full bg-blue-800 hover:bg-blue-900"
            onClick={handleApplyForAccommodation}
          >
            Apply for This Property
          </Button>
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            variant="outline"
            className="w-full"
            onClick={() => toast({
              title: "🚧 Feature Coming Soon!",
              description: "Landlord profiles will be available soon! 🚀",
            })}
          >
            Pay Online
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={handleContactLandlord}
              className="flex items-center gap-1"
            >
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button
              variant="outline"
              onClick={handleWhatsAppContact}
              className="flex items-center gap-1 text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
