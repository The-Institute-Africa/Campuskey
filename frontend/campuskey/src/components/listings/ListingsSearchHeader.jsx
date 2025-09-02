
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ListingsSearchHeader = ({ location, onLocationChange, sortBy, onSortByChange, showFilters, onShowFiltersChange }) => {
  return (
    <section className="bg-white border-b py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full lg:max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by location, university, or area..."
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
          
          <div className="flex gap-3 w-full lg:w-auto">
            <Button
              variant="outline"
              onClick={() => onShowFiltersChange(!showFilters)}
              className="flex items-center gap-2 flex-1 lg:flex-none"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <Select value={sortBy} onValueChange={onSortByChange}>
              <SelectTrigger className="w-40 flex-1 lg:flex-none">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingsSearchHeader;
