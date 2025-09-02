
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Home, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const quickTipsData = [
  {
    icon: Clock,
    title: "Start Early",
    tip: "Begin your search 2-3 months before you need to move in"
  },
  {
    icon: Users,
    title: "Get References",
    tip: "Have academic and personal references ready for applications"
  },
  {
    icon: Home,
    title: "Visit in Person",
    tip: "Never commit to a property without seeing it first"
  },
  {
    icon: FileText,
    title: "Read Everything",
    tip: "Carefully review all contracts and agreements before signing"
  }
];

const QuickTips = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl lg:text-4xl font-bold campus-text-gradient mb-4">
          Quick Tips for Success
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickTipsData.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="text-center h-full campus-hover-lift">
              <CardContent className="p-6">
                <div className="w-12 h-12 campus-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.tip}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default QuickTips;
