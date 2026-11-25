// Server component — no 'use client' needed (no interactivity, pure HTML output)
import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function OptimizedImage({ src, alt, className, priority, ...props }: OptimizedImageProps) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' } : {})}
      {...props}
    />
  );
}

/**
 * Utility function to ensure clean HTML image rendering
 */
export function optimizeHtmlImages(html: string): string {
  return html || '';
}
