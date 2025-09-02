
import React, { useState } from 'react';
import { Heart, Share2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ImageGallery = ({ images, title }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Property removed from your favorites" : "Property saved to your favorites",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `Check out this accommodation: ${title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Property link copied to clipboard",
      });
    }
  };
  
  const mainImage = images[selectedImageIndex];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt={`${title} - Main image`}
               src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleFavorite}
                  className={`bg-white/90 ${isFavorited ? 'text-red-500' : 'text-gray-600'}`}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleShare}
                  className="bg-white/90 text-gray-600"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={`relative h-20 lg:h-auto lg:flex-1 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  className="w-full h-full object-cover"
                  alt={`${title} - Image ${index + 1}`}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                {index === 3 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      <Camera className="h-4 w-4 mr-1 inline" />
                      +{images.length - 4} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
