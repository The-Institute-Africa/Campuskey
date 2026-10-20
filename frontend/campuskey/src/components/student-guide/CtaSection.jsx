
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 campus-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Search?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Use our platform to find verified, quality accommodation near your university
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-800 hover:bg-gray-100"
              onClick={() => navigate('/properties')}
            >
              <Search className="h-5 w-5 mr-2" />
              Start Searching
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-800"
              onClick={() => navigate('/contact')}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Get Help
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
