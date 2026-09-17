import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  lightText?: boolean;
  className?: string;
}

export const AttendxLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  lightText = false,
  className = '',
}) => {
  const iconDimensions = {
    sm: { w: 28, h: 28 },
    md: { w: 38, h: 38 },
    lg: { w: 56, h: 56 },
    hero: { w: 100, h: 100 },
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    hero: 'text-4xl tracking-wider',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Geometric A-X Logo */}
      <svg
        width={iconDimensions.w}
        height={iconDimensions.h}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-sm flex-shrink-0"
      >
        <defs>
          <linearGradient id="attendxGrad" x1="15" y1="15" x2="105" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF4136" />
            <stop offset="45%" stopColor="#EA3546" />
            <stop offset="100%" stopColor="#4A1515" />
          </linearGradient>
          <linearGradient id="attendxCross" x1="45" y1="35" x2="110" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EA3546" />
            <stop offset="100%" stopColor="#300A0A" />
          </linearGradient>
        </defs>

        {/* Outer triangle 'A' left diagonal and crossbar */}
        <path
          d="M 58 16 L 16 92 L 34 92 L 58 46 L 82 92 L 100 92 Z"
          fill="url(#attendxGrad)"
        />
        {/* Modern intersection cross forming 'X' */}
        <path
          d="M 40 82 L 86 38 L 104 46 L 58 90 Z"
          fill="url(#attendxCross)"
        />
        {/* Base inner connector */}
        <polygon points="38,82 78,82 66,62 50,62" fill="url(#attendxGrad)" />
      </svg>

      {showText && (
        <div className="flex items-baseline font-serif">
          <span
            className={`font-black font-serif tracking-tight ${
              lightText ? 'text-white' : 'text-[#1E2024]'
            } ${textSize}`}
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}
          >
            ATTEND
          </span>
          <span
            className={`font-serif italic font-bold ml-0.5 ${
              lightText ? 'text-red-200' : 'text-[#1E2024]'
            } ${textSize}`}
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            x
          </span>
        </div>
      )}
    </div>
  );
};
