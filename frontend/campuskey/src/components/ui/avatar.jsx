import React from 'react';

export const Avatar = ({ src, alt, className }) => (
  <div className={`rounded-full overflow-hidden ${className}`}>
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

export const AvatarFallback = ({ children }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white rounded-full">
    {children}
  </div>
);

export const AvatarImage = ({ src, alt, className }) => (
    <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />
);
