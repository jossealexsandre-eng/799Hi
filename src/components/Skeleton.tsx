import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'rounded' | 'circular';
}

/**
 * Reusable Base Skeleton Component
 * Provides smooth pulse and shimmer animation respecting theme colors
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
}) => {
  const variantClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'rounded'
      ? 'rounded-lg'
      : 'rounded-none';

  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer bg-[#1A1A18] light:bg-[#EAE8E2] border border-[#242421]/50 light:border-[#DFDBD2] ${variantClass} ${className}`}
    />
  );
};

/**
 * Reusable Skeleton for Portfolio Section
 */
export const PortfolioSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
      {/* Featured Big Project Card Skeleton */}
      <div className="md:col-span-2 rounded-3xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] overflow-hidden min-h-[460px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Visual Showcase Half */}
          <div className="lg:col-span-7 bg-[#0E0E0D] light:bg-[#F5F3ED] p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#282825] light:border-[#E3E0D8]">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>

            {/* Center Browser Mockup */}
            <div className="my-8 rounded-2xl bg-[#181816] light:bg-[#EAE7DF] border border-[#282825] light:border-[#DDD9D0] p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton variant="circular" className="w-3 h-3" />
                <Skeleton variant="circular" className="w-3 h-3" />
                <Skeleton variant="circular" className="w-3 h-3" />
                <Skeleton className="w-32 h-3.5 ml-2" />
              </div>
              <Skeleton className="w-3/4 h-8" />
              <Skeleton className="w-full h-24" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="w-20 h-7 rounded-full" />
                <Skeleton className="w-24 h-7 rounded-full" />
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between">
              <Skeleton className="w-40 h-5" />
              <Skeleton className="w-28 h-5" />
            </div>
          </div>

          {/* Details Half */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
              <Skeleton className="w-4/5 h-8 mb-4" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-5/6 h-4 mb-6" />

              <div className="space-y-3 mb-8">
                <Skeleton className="w-full h-10 rounded-xl" />
                <Skeleton className="w-full h-10 rounded-xl" />
                <Skeleton className="w-full h-10 rounded-xl" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#282825] light:border-[#E3E0D8]">
              <div className="flex gap-2">
                <Skeleton className="w-16 h-6 rounded-md" />
                <Skeleton className="w-20 h-6 rounded-md" />
              </div>
              <Skeleton className="w-32 h-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Project Cards Skeleton */}
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-3xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] p-8 flex flex-col justify-between min-h-[320px]"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-20 h-5 rounded-full" />
            </div>
            <Skeleton className="w-2/3 h-7 mb-3" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-4/5 h-4 mb-6" />
          </div>

          <div className="pt-6 border-t border-[#282825] light:border-[#E3E0D8] flex items-center justify-between">
            <Skeleton className="w-28 h-5" />
            <Skeleton variant="circular" className="w-8 h-8" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Reusable Skeleton for Pricing Section
 */
export const PricingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
      {[0, 1, 2, 3].map((index) => {
        const isFeatured = index === 1;

        return (
          <div
            key={index}
            className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all ${
              isFeatured
                ? 'bg-[#181816] light:bg-[#FFFFFF] border-2 border-[#B89B72]/40 shadow-xl'
                : 'bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8]'
            }`}
          >
            {/* Featured Badge Placeholder */}
            {isFeatured && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Skeleton className="w-28 h-6 rounded-full" />
              </div>
            )}

            <div>
              {/* Header */}
              <div className="mb-6">
                <Skeleton className="w-24 h-5 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>

              {/* Price Tag */}
              <div className="mb-6 pb-6 border-b border-[#282825] light:border-[#E3E0D8]">
                <Skeleton className="w-32 h-9 mb-2" />
                <Skeleton className="w-24 h-3.5" />
              </div>

              {/* Feature Bullets */}
              <div className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <Skeleton variant="circular" className="w-4 h-4 shrink-0" />
                    <Skeleton className={`h-3.5 ${item % 2 === 0 ? 'w-4/5' : 'w-3/5'}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-2">
              <Skeleton className="w-full h-11 rounded-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
