import React, { useState } from 'react';

/** Image with picsum fallback when Unsplash/CDN fails */
export const SafeImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackSeed?: string;
  loading?: 'lazy' | 'eager';
}> = ({ src, alt, className, fallbackSeed = 'baniyas', loading = 'lazy' }) => {
  const [failed, setFailed] = useState(false);
  const fallback = `https://picsum.photos/seed/${encodeURIComponent(fallbackSeed)}/800/1000`;

  return (
    <img
      src={failed ? fallback : src}
      alt={alt}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
};
