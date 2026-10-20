
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NoPropertyFound = ({ onClearFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="w-24 h-24 campus-gradient rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="h-12 w-12 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">No properties found</h3>
      <p className="text-gray-600 mb-6">
        Try adjusting your search criteria or clearing some filters
      </p>
      <Button onClick={onClearFilters} className="bg-blue-800 hover:bg-blue-900">
        Clear Filters
      </Button>
    </motion.div>
  );
};

export default NoPropertyFound;
