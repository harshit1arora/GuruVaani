import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src="/guruvani-logo.svg" 
        alt="Guru Vani Logo" 
        className="w-full h-full object-contain" 
      />
    </div>
  );
};

export default Logo;