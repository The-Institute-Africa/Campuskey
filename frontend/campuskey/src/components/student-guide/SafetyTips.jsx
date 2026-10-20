
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const safetyTipsData = [
  {
    icon: AlertTriangle,
    title: "Red Flags to Avoid",
    items: [
      "Landlords asking for full payment before viewing",
      "Properties with no verification badge",
      "Deals that seem too good to be true",
      "Pressure to sign immediately without reading",
      "Requests for payment via untraceable methods"
    ]
  },
  {
    icon: CheckCircle,
    title: "Green Flags to Look For",
    items: [
      "Verified landlord with good ratings",
      "Clear, detailed property descriptions",
      "Responsive communication from landlord",
      "Proper lease agreements and receipts",
      "Positive reviews from previous tenants"
    ]
  }
];

const SafetyTips = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
          Stay Safe While House Hunting
        </h2>
        <p className="text-xl text-gray-600">
          Know what to look for and what to avoid
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {safetyTipsData.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className={`h-full ${
              section.icon === AlertTriangle ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <section.icon className={`h-8 w-8 ${
                    section.icon === AlertTriangle ? 'text-red-600' : 'text-green-600'
                  }`} />
                  <CardTitle className={`text-xl ${
                    section.icon === AlertTriangle ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {section.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        section.icon === AlertTriangle ? 'bg-red-500' : 'bg-green-500'
                      }`} />
                      <span className={`text-sm ${
                        section.icon === AlertTriangle ? 'text-red-700' : 'text-green-700'
                      }`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SafetyTips;
