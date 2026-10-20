
import React from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SafetyNotice = () => {
  return (
    <Card className="border-[hsl(var(--alert-main))] bg-[hsl(var(--alert-light))]">
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <Shield className="h-5 w-5 text-[hsl(var(--alert-main))] mt-0.5" />
          <div>
            <div className="font-semibold text-[hsl(var(--alert-dark))] mb-1">Safety First</div>
            <div className="text-sm text-[hsl(var(--alert-dark))]">
              Always verify property details in person before making any payments.
              Campus Key Zimbabwe verifies all listings, but we recommend viewing
              the property before committing.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyNotice;
