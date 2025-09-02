
import React from 'react';
import { User, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const LandlordInfo = ({ landlord }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Landlord Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold flex items-center gap-2">
                {landlord.name}
                {landlord.verified && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </div>
              <div className="text-sm text-gray-600">
                {landlord.responseTime}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Rating</div>
              <div className="font-semibold flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                {landlord.rating}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Properties</div>
              <div className="font-semibold">{landlord.properties}</div>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => toast({
              title: "🚧 Feature Coming Soon!",
              description: "Landlord profiles will be available soon! 🚀",
            })}
          >
            View Landlord Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandlordInfo;
