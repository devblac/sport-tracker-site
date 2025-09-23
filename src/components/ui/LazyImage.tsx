import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../../utils/cn';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  loadingClassName?: string;
  errorClassName?: string;
  threshold?: number;
  rootMargin?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className,
  containerClassName,
  loadingClassName,
  errorClassName,
  threshold = 0.1,
  rootMargin = '50px',
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
    if (fallbackSrc) {
      setImageLoaded(true);
    }
  };

  const imageSrc = imageError && fallbackSrc ? fallbackSrc : src;

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', containerClassName)}
    >
      {inView && (
        <>
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div
              className={cn(
                'absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse',
                loadingClassName
              )}
            />
          )}

          {/* Actual image */}
          <img
            src={imageSrc}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'transition-opacity duration-300',
              imageLoaded ? 'opacity-100' : 'opacity-0',
              imageError && !fallbackSrc && 'hidden',
              className
            )}
            loading="lazy"
            {...props}
          />

          {/* Error state */}
          {imageError && !fallbackSrc && (
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
                errorClassName
              )}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📷</div>
                <div className="text-sm">Image not available</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
