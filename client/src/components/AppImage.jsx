import React, { useState, useEffect } from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  loading = "lazy",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    setImgSrc('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80');
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse rounded" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
}

export default Image;
