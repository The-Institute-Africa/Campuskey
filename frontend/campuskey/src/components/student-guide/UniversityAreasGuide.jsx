
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const universityAreasData = [
  {
    name: "University of Zimbabwe (UZ)",
    areas: ["Mount Pleasant", "Avondale", "Borrowdale", "Hatfield"],
    averageRent: "$150-300",
    transport: "Kombis, buses, walking distance options available"
  },
  {
    name: "Midlands State University (MSU)",
    areas: ["Senga", "Mkoba", "Ridgemont", "Gweru CBD"],
    averageRent: "$80-200",
    transport: "Kombis, taxis, university transport"
  },
  {
    name: "National University of Science & Technology (NUST)",
    areas: ["Hillside", "Suburbs", "Kumalo", "Burnside"],
    averageRent: "$100-250",
    transport: "Kombis, buses, walking distance"
  }
];

const UniversityAreasGuide = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
          University Areas Guide
        </h2>
        <p className="text-xl text-gray-600">
          Popular accommodation areas near major universities
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {universityAreasData.map((university, index) => (
          <motion.div
            key={university.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="h-full campus-hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">{university.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Popular Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {university.areas.map((area) => (
                      <Badge key={area} variant="outline">{area}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Average Rent
                  </h4>
                  <p className="text-green-600 font-bold">{university.averageRent}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Transport Options
                  </h4>
                  <p className="text-sm text-gray-600">{university.transport}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UniversityAreasGuide;
