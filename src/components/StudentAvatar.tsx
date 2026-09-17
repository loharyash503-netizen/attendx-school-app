import React from 'react';

interface StudentAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-36 h-36',
  }[size];

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center bg-[#FFF5F5] select-none ${sizeClasses} ${className}`}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle radial background glow */}
          <radialGradient id="avatarBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF0F0" />
            <stop offset="100%" stopColor="#FFE0E0" />
          </radialGradient>
          {/* Hoodie Red Gradient */}
          <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF3644" />
            <stop offset="100%" stopColor="#D91E2E" />
          </linearGradient>
          {/* Inner Hood Dark Red */}
          <linearGradient id="innerHood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B31523" />
            <stop offset="100%" stopColor="#8A0C16" />
          </linearGradient>
          {/* Skin Tone */}
          <linearGradient id="skinTone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAD3B4" />
            <stop offset="100%" stopColor="#EAB991" />
          </linearGradient>
          {/* Hair Gradient */}
          <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D201A" />
            <stop offset="100%" stopColor="#140D09" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="80" cy="80" r="80" fill="url(#avatarBg)" />

        {/* Red Outer Hood behind neck */}
        <path
          d="M38 120 C38 88, 122 88, 122 120 L136 160 L24 160 Z"
          fill="url(#innerHood)"
        />

        {/* Neck */}
        <path d="M68 96 L92 96 L92 116 L68 116 Z" fill="url(#skinTone)" />
        {/* Neck shadow */}
        <path d="M68 96 C74 103, 86 103, 92 96 L92 101 C86 107, 74 107, 68 101 Z" fill="#D9A177" />

        {/* Red Hoodie Shoulders and Body */}
        <path
          d="M20 160 C24 126, 48 112, 64 116 L80 128 L96 116 C112 112, 136 126, 140 160 Z"
          fill="url(#hoodieGrad)"
        />

        {/* Hoodie Collar / Drawstring Band */}
        <path
          d="M58 116 C68 132, 92 132, 102 116 C94 126, 66 126, 58 116 Z"
          fill="#B31523"
        />

        {/* White Drawstrings */}
        <path d="M72 126 C72 138, 71 146, 71 152" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M88 126 C88 138, 89 146, 89 152" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="71" cy="153" r="1.5" fill="#E2E8F0" />
        <circle cx="89" cy="153" r="1.5" fill="#E2E8F0" />

        {/* Face Base */}
        <path
          d="M52 64 C52 46, 108 46, 108 64 C108 86, 96 104, 80 104 C64 104, 52 86, 52 64 Z"
          fill="url(#skinTone)"
        />

        {/* Ears */}
        <ellipse cx="50" cy="68" rx="5" ry="7" fill="url(#skinTone)" />
        <ellipse cx="110" cy="68" rx="5" ry="7" fill="url(#skinTone)" />
        <path d="M51 66 C49 68, 51 71, 52 70" stroke="#D9A177" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M109 66 C111 68, 109 71, 108 70" stroke="#D9A177" strokeWidth="1.2" strokeLinecap="round" />

        {/* Eyebrows */}
        <path d="M59 56 Q67 52 73 55" stroke="#1A110B" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M87 55 Q93 52 101 56" stroke="#1A110B" strokeWidth="2.8" strokeLinecap="round" />

        {/* Eyes */}
        <ellipse cx="66" cy="65" rx="3.5" ry="4.5" fill="#1C140E" />
        <ellipse cx="94" cy="65" rx="3.5" ry="4.5" fill="#1C140E" />
        {/* Eye catchlights */}
        <circle cx="67.5" cy="63.5" r="1.2" fill="#FFFFFF" />
        <circle cx="95.5" cy="63.5" r="1.2" fill="#FFFFFF" />

        {/* Round Glasses */}
        {/* Left lens frame */}
        <circle cx="66" cy="66" r="12" stroke="#18181B" strokeWidth="2.6" fill="#FFFFFF" fillOpacity="0.12" />
        {/* Right lens frame */}
        <circle cx="94" cy="66" r="12" stroke="#18181B" strokeWidth="2.6" fill="#FFFFFF" fillOpacity="0.12" />
        {/* Bridge */}
        <path d="M78 65 Q80 63 82 65" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" />
        {/* Left temple */}
        <path d="M54 65 L49 63" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
        {/* Right temple */}
        <path d="M106 65 L111 63" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />

        {/* Nose */}
        <path d="M80 69 Q82 76 79 78" stroke="#D49972" strokeWidth="1.8" strokeLinecap="round" />

        {/* Friendly Smile */}
        <path
          d="M72 84 Q80 91 88 84"
          stroke="#9F2B35"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="#FFFFFF"
        />

        {/* Black Wavy Hair */}
        <path
          d="M48 56 C44 38, 62 26, 80 26 C98 26, 116 38, 112 56 C110 50, 104 42, 94 40 C84 38, 76 42, 68 40 C60 42, 54 48, 48 56 Z"
          fill="url(#hairGrad)"
        />
        {/* Front Hair Bangs */}
        <path
          d="M52 50 C58 45, 68 45, 74 48 C76 43, 84 43, 90 47 C96 44, 104 46, 108 52 C104 46, 98 42, 88 43 C80 40, 72 42, 64 43 C58 44, 54 46, 52 50 Z"
          fill="#1C130D"
        />
        <path
          d="M60 46 C66 41, 74 42, 79 47 C77 42, 70 40, 60 46 Z"
          fill="#3B2A22"
        />
      </svg>
    </div>
  );
};
