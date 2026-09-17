import React from 'react';
import { StudentInfo } from '../types';

interface StudentAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  student?: StudentInfo;
  gender?: string;
}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  size = 'md',
  className = '',
  student,
  gender,
}) => {
  const isFemale =
    gender?.toUpperCase() === 'FEMALE' || student?.gender?.toUpperCase() === 'FEMALE';

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
          <radialGradient id={`avatarBg-${isFemale ? 'f' : 'm'}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF0F0" />
            <stop offset="100%" stopColor="#FFE0E0" />
          </radialGradient>
          <linearGradient id={`hoodieGrad-${isFemale ? 'f' : 'm'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF3644" />
            <stop offset="100%" stopColor="#D91E2E" />
          </linearGradient>
          <linearGradient id={`innerHood-${isFemale ? 'f' : 'm'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B31523" />
            <stop offset="100%" stopColor="#8A0C16" />
          </linearGradient>
          <linearGradient id={`skinTone-${isFemale ? 'f' : 'm'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAD3B4" />
            <stop offset="100%" stopColor="#EAB991" />
          </linearGradient>
          <linearGradient id={`hairGrad-${isFemale ? 'f' : 'm'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D201A" />
            <stop offset="100%" stopColor="#140D09" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="80" cy="80" r="80" fill={`url(#avatarBg-${isFemale ? 'f' : 'm'})`} />

        {/* Hair behind neck for female avatar */}
        {isFemale && (
          <path
            d="M32 80 C26 120, 36 150, 48 160 L112 160 C124 150, 134 120, 128 80 Z"
            fill={`url(#hairGrad-${isFemale ? 'f' : 'm'})`}
          />
        )}

        {/* Red Outer Hood behind neck */}
        <path
          d="M38 120 C38 88, 122 88, 122 120 L136 160 L24 160 Z"
          fill={`url(#innerHood-${isFemale ? 'f' : 'm'})`}
        />

        {/* Neck */}
        <path d="M68 96 L92 96 L92 116 L68 116 Z" fill={`url(#skinTone-${isFemale ? 'f' : 'm'})`} />
        {/* Neck shadow */}
        <path d="M68 96 C74 103, 86 103, 92 96 L92 101 C86 107, 74 107, 68 101 Z" fill="#D9A177" />

        {/* Red Hoodie Shoulders and Body */}
        <path
          d="M20 160 C24 126, 48 112, 64 116 L80 128 L96 116 C112 112, 136 126, 140 160 Z"
          fill={`url(#hoodieGrad-${isFemale ? 'f' : 'm'})`}
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
          fill={`url(#skinTone-${isFemale ? 'f' : 'm'})`}
        />

        {/* Ears */}
        <ellipse cx="50" cy="68" rx="5" ry="7" fill={`url(#skinTone-${isFemale ? 'f' : 'm'})`} />
        <ellipse cx="110" cy="68" rx="5" ry="7" fill={`url(#skinTone-${isFemale ? 'f' : 'm'})`} />
        <path d="M51 66 C49 68, 51 71, 52 70" stroke="#D9A177" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M109 66 C111 68, 109 71, 108 70" stroke="#D9A177" strokeWidth="1.2" strokeLinecap="round" />

        {/* Female Earrings */}
        {isFemale && (
          <>
            <circle cx="50" cy="74" r="2" fill="#FF3644" />
            <circle cx="110" cy="74" r="2" fill="#FF3644" />
          </>
        )}

        {/* Eyebrows */}
        <path d="M59 56 Q67 52 73 55" stroke="#1A110B" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M87 55 Q93 52 101 56" stroke="#1A110B" strokeWidth="2.4" strokeLinecap="round" />

        {/* Eyes */}
        <ellipse cx="66" cy="65" rx="3.5" ry="4.5" fill="#1C140E" />
        <ellipse cx="94" cy="65" rx="3.5" ry="4.5" fill="#1C140E" />
        {/* Eye catchlights */}
        <circle cx="67.5" cy="63.5" r="1.2" fill="#FFFFFF" />
        <circle cx="95.5" cy="63.5" r="1.2" fill="#FFFFFF" />

        {/* Eyelashes for female */}
        {isFemale && (
          <>
            <path d="M62 62 L60 60" stroke="#1C140E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M98 62 L100 60" stroke="#1C140E" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}

        {/* Male Glasses vs Female Soft Cheeks */}
        {!isFemale ? (
          <>
            {/* Round Glasses */}
            <circle cx="66" cy="66" r="12" stroke="#18181B" strokeWidth="2.6" fill="#FFFFFF" fillOpacity="0.12" />
            <circle cx="94" cy="66" r="12" stroke="#18181B" strokeWidth="2.6" fill="#FFFFFF" fillOpacity="0.12" />
            <path d="M78 65 Q80 63 82 65" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M54 65 L49 63" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
            <path d="M106 65 L111 63" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Rosy Cheeks */}
            <ellipse cx="60" cy="74" rx="4.5" ry="2.5" fill="#FF8A95" fillOpacity="0.5" />
            <ellipse cx="100" cy="74" rx="4.5" ry="2.5" fill="#FF8A95" fillOpacity="0.5" />
          </>
        )}

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

        {/* Hair */}
        {!isFemale ? (
          <>
            {/* Male Wavy Hair */}
            <path
              d="M48 56 C44 38, 62 26, 80 26 C98 26, 116 38, 112 56 C110 50, 104 42, 94 40 C84 38, 76 42, 68 40 C60 42, 54 48, 48 56 Z"
              fill={`url(#hairGrad-${isFemale ? 'f' : 'm'})`}
            />
            <path
              d="M52 50 C58 45, 68 45, 74 48 C76 43, 84 43, 90 47 C96 44, 104 46, 108 52 C104 46, 98 42, 88 43 C80 40, 72 42, 64 43 C58 44, 54 46, 52 50 Z"
              fill="#1C130D"
            />
          </>
        ) : (
          <>
            {/* Female Side Parting & Hairband */}
            <path
              d="M46 58 C44 34, 62 24, 80 24 C98 24, 116 34, 114 58 C112 46, 102 36, 88 36 C74 36, 56 44, 46 58 Z"
              fill={`url(#hairGrad-${isFemale ? 'f' : 'm'})`}
            />
            {/* Red Hairband */}
            <path
              d="M48 50 C52 32, 108 32, 112 50"
              stroke="#FF3644"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Soft front bangs */}
            <path
              d="M52 52 C60 44, 76 45, 84 50 C80 44, 70 42, 54 46 Z"
              fill="#1C130D"
            />
          </>
        )}
      </svg>
    </div>
  );
};
