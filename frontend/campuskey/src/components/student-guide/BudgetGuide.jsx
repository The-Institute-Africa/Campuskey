
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const budgetGuideData = [
  { category: "Rent", percentage: "50-60%", description: "Monthly accommodation cost" },
  { category: "Utilities", percentage: "10-15%", description: "Water, electricity, internet" },
  { category: "Transport", percentage: "10-15%", description: "Getting to/from campus" },
  { category: "Food", percentage: "15-20%", description: "Groceries and meals" },
  { category: "Emergency Fund", percentage: "5-10%", description: "Unexpected expenses" }
];

const BudgetGuide = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
          Budget Planning Guide
        </h2>
        <p className="text-xl text-gray-600">
          How to allocate your accommodation budget effectively
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                Recommended Budget Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetGuideData.map((item) => (
                  <div key={item.category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{item.category}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                    <Badge variant="outline" className="text-lg font-bold">
                      {item.percentage}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Budget Tips:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Always have 2-3 months rent saved as emergency fund</li>
                  <li>• Factor in one-time costs: deposit, moving expenses</li>
                  <li>• Consider shared accommodation to reduce costs</li>
                  <li>• Look for properties with utilities included</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img  
            className="rounded-2xl shadow-lg w-full h-96 object-cover"
            alt="Students planning budget for accommodation" src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default BudgetGuide;
