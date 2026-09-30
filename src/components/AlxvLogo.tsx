import React from 'react';
import { motion } from 'framer-motion';

interface AlxvLogoProps {
  className?: string;
  color?: string;
  glow?: boolean;
  animate?: boolean;
}

export const AlxvLogo: React.FC<AlxvLogoProps> = ({
  className = 'w-auto h-10',
  color = '#E5191B',
  glow = false,
  animate = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className} ${
        glow ? 'filter drop-shadow-[0_0_18px_rgba(229,25,27,0.65)]' : ''
      }`}
    >
      <svg
        viewBox="0 0 500 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-full max-w-full overflow-visible"
      >
        <defs>
          {/* Subtle glow filter if enabled */}
          <filter id="alxv-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          initial={animate ? { opacity: 0, scale: 0.92 } : undefined}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          fill={color}
          filter={glow ? 'url(#alxv-glow)' : undefined}
        >
          {/* Letter 'a' with bold organic counter */}
          <path
            d="M 132 105
               C 85 105 52 136 52 182
               C 52 228 85 258 132 258
               C 156 258 175 246 186 230
               L 186 258
               L 218 258
               L 218 105
               L 186 105
               L 186 132
               C 175 116 156 105 132 105 Z
               M 136 136
               C 160 136 186 156 186 182
               C 186 208 160 227 136 227
               C 112 227 88 208 88 182
               C 88 156 112 136 136 136 Z"
          />

          {/* Letter 'l' with tall ascender curving to the right */}
          <path
            d="M 186 258
               L 220 258
               L 220 120
               C 220 72 236 40 268 28
               C 250 34 232 50 220 74
               L 220 105
               L 186 105
               Z"
          />

          {/* Letter 'x' with symmetrical hourglass waist */}
          {/* Left hourglass curved wing */}
          <path
            d="M 232 105
               L 272 105
               C 272 142 258 168 244 182
               C 258 196 272 222 272 258
               L 232 258
               C 232 224 246 198 256 182
               C 246 166 232 140 232 105 Z"
          />
          {/* Right hourglass curved wing */}
          <path
            d="M 322 105
               L 282 105
               C 282 142 296 168 310 182
               C 296 196 282 222 282 258
               L 322 258
               C 322 224 308 198 298 182
               C 308 166 322 140 322 105 Z"
          />

          {/* Letter 'v' with smooth drop & flared right wing */}
          <path
            d="M 328 105
               L 362 105
               C 362 152 344 195 328 226
               C 342 245 365 258 392 258
               L 392 245
               C 370 245 352 234 340 216
               C 356 186 374 148 374 105
               L 340 105
               C 334 135 326 168 316 195
               L 328 105 Z"
          />
          <path
            d="M 380 105
               L 416 105
               C 416 150 404 195 380 232
               L 362 216
               C 380 182 390 145 390 105
               Z"
          />
        </motion.g>

        {/* Subtitle: CREATIVE LABS. */}
        <motion.text
          initial={animate ? { opacity: 0, y: 10 } : undefined}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
          x="250"
          y="294"
          textAnchor="middle"
          fill={color}
          fontFamily="'Inter', -apple-system, sans-serif"
          fontSize="17"
          fontWeight="800"
          letterSpacing="5"
        >
          CREATIVE LABS.
        </motion.text>
      </svg>
    </div>
  );
};
