
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Phone, FileText, Key, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const stepsData = [
  {
    icon: Search,
    title: "Search & Filter",
    description: "Use our advanced search to find properties near your university. Filter by price, amenities, and property type.",
    tips: [
      "Start your search early - good properties go fast",
      "Use location filters to find places near your campus",
      "Set a realistic budget including utilities and transport"
    ]
  },
  {
    icon: Shield,
    title: "Verify & Research",
    description: "Check property verification status and read reviews from other students. Research the neighborhood and landlord.",
    tips: [
      "Look for the verified badge on listings",
      "Read all reviews carefully",
      "Check the landlord's rating and response time"
    ]
  },
  {
    icon: Phone,
    title: "Contact & View",
    description: "Contact the landlord to arrange a viewing. Always view the property in person before making any commitments.",
    tips: [
      "Ask questions about utilities, internet, and house rules",
      "Take photos during your visit",
      "Bring a friend for safety and a second opinion"
    ]
  },
  {
    icon: FileText,
    title: "Apply & Document",
    description: "Submit your application with required documents. Keep copies of all agreements and communications.",
    tips: [
      "Have your documents ready: ID, student card, references",
      "Read the lease agreement carefully",
      "Keep records of all payments and communications"
    ]
  },
  {
    icon: Key,
    title: "Move In",
    description: "Complete the move-in process, do a property inspection, and settle into your new home.",
    tips: [
      "Document any existing damage with photos",
      "Test all appliances and utilities",
      "Get emergency contact numbers from your landlord"
    ]
  }
];

const StepByStepGuide = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
          How to Find Your Perfect Student Home
        </h2>
        <p className="text-xl text-gray-600">
          Follow these 5 simple steps to secure quality accommodation
        </p>
      </motion.div>

      <div className="space-y-12">
        {stepsData.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col lg:flex-row items-center gap-8 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="lg:w-1/2">
              <Card className="campus-hover-lift">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 campus-gradient rounded-full flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <Badge className="mb-2">Step {index + 1}</Badge>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Pro Tips:</h4>
                    <ul className="space-y-1">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:w-1/2">
               <img  
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
                alt={`Step ${index + 1}: ${step.title}`} src="https://images.unsplash.com/photo-1694057335747-1e9ed6dbd877" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StepByStepGuide;
