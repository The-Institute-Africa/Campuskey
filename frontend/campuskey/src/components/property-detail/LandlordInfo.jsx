import React from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LandlordInfo = ({ landlord }) => {
  const phone = landlord?.contact == null ? '' : String(landlord.contact).replace(/[^\d+]/g, '');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Landlord Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold">{landlord?.name || 'Landlord'}</p>
            {phone && <p className="text-sm text-gray-600">{phone}</p>}
          </div>
        </div>
        {phone ? (
          <Button asChild variant="outline" className="w-full">
            <a href={`tel:${phone}`}>Call landlord</a>
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Use the booking request or inquiry form to contact the landlord.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LandlordInfo;
