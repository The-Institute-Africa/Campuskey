
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const amenityLabels = {
  wifi: 'WiFi',
  parking: 'Parking',
  security: 'Security',
  kitchen: 'Kitchen',
  study_room: 'Study Room',
  gym: 'Gym',
  laundry: 'Laundry',
  garden: 'Garden',
  pool: 'Pool'
};

const ListingsFilterPanel = ({ filters, onFilterChange, onAmenityToggle, onClearFilters, resultsCount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-gray-50 border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <Select value={filters.priceRange} onValueChange={(value) => onFilterChange('priceRange', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any price</SelectItem>
                <SelectItem value="0-100">$0 - $100</SelectItem>
                <SelectItem value="100-200">$100 - $200</SelectItem>
                <SelectItem value="200-300">$200 - $300</SelectItem>
                <SelectItem value="300-Infinity">$300+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <Select value={filters.propertyType} onValueChange={(value) => onFilterChange('propertyType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any type</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="shared">Shared House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="residence">Campus Residence</SelectItem>
                <SelectItem value="private">Private Room</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(amenityLabels).map(([key, label]) => (
                <Button
                  key={key}
                  variant={filters.amenities.includes(key) ? "default" : "outline"}
                  size="sm"
                  onClick={() => onAmenityToggle(key)}
                  className="text-xs"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Button variant="link" onClick={onClearFilters} className="p-0 h-auto text-blue-800">
            Clear All Filters
          </Button>
          <span className="text-sm font-semibold text-gray-700">
            {resultsCount} properties found
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingsFilterPanel;
