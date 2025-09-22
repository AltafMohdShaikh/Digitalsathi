import React from 'react';

const HeroSection = ({ 
  title, 
  subtitle, 
  icons = [], 
  iconColor = "text-blue-500",
  gradientFrom = "#2563EB",
  gradientTo = "#1E40AF"
}) => {
  return (
    <div className="relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      ></div>
      <div className="relative text-center py-20 px-4">
        {/* Dynamic Icons */}
        {icons.map((IconComponent, index) => {
          const positions = [
            "top-4 right-4 opacity-20 transform rotate-12",
            "bottom-4 left-4 opacity-20 transform -rotate-12", 
            "top-8 left-8 opacity-15 transform rotate-45",
            "bottom-8 right-8 opacity-15 transform -rotate-30",
            "top-12 left-1/3 opacity-12 transform rotate-90 hidden lg:block",
            "bottom-12 right-1/4 opacity-12 transform -rotate-45 hidden lg:block",
            "top-16 right-1/3 opacity-10 transform rotate-60 hidden lg:block",
            "bottom-16 left-1/4 opacity-10 transform -rotate-60 hidden lg:block",
            "top-20 left-1/2 opacity-10 transform rotate-15 hidden lg:block",
            "bottom-20 right-1/2 opacity-10 transform -rotate-15 hidden lg:block",
            "top-6 left-16 opacity-8 transform rotate-75 hidden lg:block",
            "bottom-6 right-16 opacity-8 transform -rotate-75 hidden lg:block",
            "top-24 right-20 opacity-8 transform rotate-30 hidden lg:block",
            "bottom-24 left-20 opacity-8 transform -rotate-30 hidden lg:block",
            "top-28 left-24 opacity-6 transform rotate-120 hidden lg:block",
            "bottom-28 right-24 opacity-6 transform -rotate-120 hidden lg:block"
          ];
          
          const sizes = [64, 60, 56, 52, 48, 44, 40, 36, 32, 28, 24, 24, 20, 20, 16, 16];
          
          return (
            <div key={index} className={`absolute ${positions[index % positions.length]}`}>
              <IconComponent size={sizes[index % sizes.length]} className={iconColor} />
            </div>
          );
        })}
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-6xl font-bold mb-6 text-[var(--color-text)]">
            {title}
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto text-[var(--color-text-secondary)]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;