import React from 'react';

interface ParentAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ParentAvatar: React.FC<ParentAvatarProps> = ({ size = 'lg', className = '' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  }[size];

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center select-none shadow-md ${sizeClasses} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FFF6EB 0%, #FDE3C4 100%)',
        padding: '3px',
      }}
    >
      <div className="w-full h-full rounded-full overflow-hidden relative">
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Warm golden-amber backdrop */}
            <radialGradient id="parentBgGrad" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#F5B854" />
              <stop offset="65%" stopColor="#D98A28" />
              <stop offset="100%" stopColor="#BD6D17" />
            </radialGradient>

            {/* Skin Gradient */}
            <linearGradient id="parentSkinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F7C8A4" />
              <stop offset="50%" stopColor="#E9AC81" />
              <stop offset="100%" stopColor="#D99767" />
            </linearGradient>

            {/* Hair & Beard Dark Brown/Black */}
            <linearGradient id="darkHairGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#251F1D" />
              <stop offset="100%" stopColor="#141110" />
            </linearGradient>

            {/* Dark T-shirt */}
            <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E3035" />
              <stop offset="100%" stopColor="#1E2024" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle cx="80" cy="80" r="80" fill="url(#parentBgGrad)" />

          {/* Subtle background texture/vignette */}
          <circle cx="80" cy="80" r="76" stroke="#FEF08A" strokeOpacity="0.25" strokeWidth="2" fill="none" />

          {/* Body / Shoulders (Dark T-shirt) */}
          <path
            d="M26 160 C26 122, 54 116, 80 116 C106 116, 134 122, 134 160 Z"
            fill="url(#shirtGrad)"
          />

          {/* Crewneck collar */}
          <path
            d="M62 118 C66 126, 94 126, 98 118 C94 130, 66 130, 62 118 Z"
            fill="#3F4349"
          />

          {/* Neck */}
          <path
            d="M67 96 L67 120 C73 124, 87 124, 93 120 L93 96 Z"
            fill="url(#parentSkinGrad)"
          />
          {/* Neck shadow under beard */}
          <path
            d="M68 96 C74 104, 86 104, 92 96 L92 103 C86 108, 74 108, 68 103 Z"
            fill="#C98657"
            opacity="0.6"
          />

          {/* Ears */}
          <circle cx="49" cy="82" r="9" fill="url(#parentSkinGrad)" />
          <circle cx="111" cy="82" r="9" fill="url(#parentSkinGrad)" />
          <path d="M49 78 C47 81, 47 85, 50 86" stroke="#B87546" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M111 78 C113 81, 113 85, 110 86" stroke="#B87546" strokeWidth="1.5" strokeLinecap="round" />

          {/* Face Structure */}
          <path
            d="M52 64 C52 48, 108 48, 108 64 C108 86, 101 104, 80 106 C59 104, 52 86, 52 64 Z"
            fill="url(#parentSkinGrad)"
          />

          {/* Beard & Mustache - Matches reference image */}
          <path
            d="M52 72 C52 92, 60 107, 80 107 C100 107, 108 92, 108 72 C108 80, 105 98, 95 101 C90 102.5, 87 97, 80 97 C73 97, 70 102.5, 65 101 C55 98, 52 80, 52 72 Z"
            fill="url(#darkHairGrad)"
          />
          {/* Mustache */}
          <path
            d="M66 84 C71 80, 77 82, 80 84 C83 82, 89 80, 94 84 C91 88, 86 89, 80 87 C74 89, 69 88, 66 84 Z"
            fill="url(#darkHairGrad)"
          />
          {/* Lower lip shadow / soul patch */}
          <ellipse cx="80" cy="92" rx="3.5" ry="2" fill="url(#darkHairGrad)" />

          {/* Mouth */}
          <path d="M74 89 C77 91, 83 91, 86 89" stroke="#934D2E" strokeWidth="1.5" strokeLinecap="round" />

          {/* Nose */}
          <path
            d="M80 66 L77 79 C78.5 80.5, 81.5 80.5, 83 79"
            stroke="#BD7243"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Eyes */}
          {/* Left Eye */}
          <ellipse cx="68" cy="69" rx="5" ry="3.5" fill="#FFFFFF" />
          <circle cx="68.5" cy="69" r="2.5" fill="#251F1D" />
          <circle cx="69.5" cy="68" r="1" fill="#FFFFFF" />
          <path d="M63 68 C66 65, 71 65, 74 68" stroke="#251F1D" strokeWidth="1.5" strokeLinecap="round" />

          {/* Right Eye */}
          <ellipse cx="92" cy="69" rx="5" ry="3.5" fill="#FFFFFF" />
          <circle cx="91.5" cy="69" r="2.5" fill="#251F1D" />
          <circle cx="92.5" cy="68" r="1" fill="#FFFFFF" />
          <path d="M86 68 C89 65, 94 65, 97 68" stroke="#251F1D" strokeWidth="1.5" strokeLinecap="round" />

          {/* Eyebrows - Strong & Well Defined */}
          <path
            d="M61 63 C65 59, 72 60, 75 62"
            stroke="url(#darkHairGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M99 63 C95 59, 88 60, 85 62"
            stroke="url(#darkHairGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Hair - Voluminous modern pompadour/side-swept as seen in image */}
          <path
            d="M48 64 C47 48, 56 32, 78 30 C96 28, 110 36, 112 50 C114 60, 110 68, 110 70 C107 68, 107 58, 104 54 C98 48, 92 48, 80 50 C68 52, 60 55, 54 62 C50 66, 49 68, 48 64 Z"
            fill="url(#darkHairGrad)"
          />
          {/* Hair Texture Lines */}
          <path
            d="M60 40 C68 36, 80 34, 94 37"
            stroke="#3D3532"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M68 45 C78 41, 90 41, 102 46"
            stroke="#3D3532"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Sideburns */}
          <path d="M52 64 L53 74 L56 71 L55 64 Z" fill="url(#darkHairGrad)" />
          <path d="M108 64 L107 74 L104 71 L105 64 Z" fill="url(#darkHairGrad)" />
        </svg>
      </div>
    </div>
  );
};
