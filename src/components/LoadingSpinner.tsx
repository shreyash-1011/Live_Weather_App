
import React from 'react';
import { Cloud, Sun } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Animated weather icons */}
        <div className="animate-bounce">
          <Cloud className="text-white/80 w-16 h-16" />
        </div>
        <div className="absolute -top-2 -right-2 animate-pulse">
          <Sun className="text-yellow-300 w-8 h-8" />
        </div>
      </div>
      
      {/* Loading dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse animation-delay-0"></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse animation-delay-200"></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse animation-delay-400"></div>
      </div>
      
      <p className="text-white/80 text-lg font-medium">Getting weather data...</p>
    </div>
  );
};
