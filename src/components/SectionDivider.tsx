import React from 'react';

interface SectionDividerProps {
  /** Optional variant: 'contained' wraps within max-w-7xl, 'full' spans edge to edge, 'narrow' is compact */
  variant?: 'contained' | 'full' | 'narrow';
  /** Optional subtle center diamond or dot for editorial flair */
  withAccent?: boolean;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'contained',
  withAccent = false,
  className = '',
}) => {
  const containerWidth =
    variant === 'full'
      ? 'w-full px-0'
      : variant === 'narrow'
      ? 'max-w-3xl mx-auto px-5 sm:px-8'
      : 'max-w-7xl mx-auto px-5 sm:px-8';

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`relative w-full flex items-center justify-center my-2 sm:my-4 ${className}`}
    >
      <div className={`w-full ${containerWidth} relative`}>
        {/* Subtle, thin hairline respecting dark & light theme borders */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#262623] to-transparent light:via-[#E3E0D8]" />

        {/* Optional subtle editorial accent node */}
        {withAccent && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B89B72]/70 rounded-[1px] shadow-[0_0_6px_rgba(184,155,114,0.3)]" />
          </div>
        )}
      </div>
    </div>
  );
};
