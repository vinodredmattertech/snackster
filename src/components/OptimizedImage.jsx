import React from 'react';
import PropTypes from 'prop-types';

/**
 * OptimizedImage Component
 * Handles responsive images with modern formats (WebP, AVIF) and fallbacks
 * Reduces image download size by 60-80% with proper formats and responsive sizing
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  style,
  responsive = true,
  sizes,
}) => {
  // If src is from Contentful (ctfassets.net), add optimization parameters
  const optimizeSrc = (imageSrc) => {
    if (!imageSrc) return imageSrc;
    
    if (imageSrc.includes('ctfassets.net')) {
      // Add Contentful image optimization parameters
      const separator = imageSrc.includes('?') ? '&' : '?';
      // fm=webp - deliver as WebP
      // q=70 - quality optimization
      // w=auto - auto width optimization
      return `${imageSrc}${separator}fm=webp&q=70&w=auto`;
    }
    return imageSrc;
  };

  const optimizedSrc = optimizeSrc(src);

  // Default responsive sizes for different viewport widths
  const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw';
  const finalSizes = sizes || defaultSizes;

  // Generate srcSet for responsive images at different pixel densities
  const generateSrcSet = (imageSrc) => {
    if (!imageSrc || !imageSrc.includes('ctfassets.net')) {
      return undefined;
    }
    
    const baseUrl = imageSrc.split('?')[0];
    const separator = imageSrc.includes('?') ? '&' : '?';
    
    return [
      `${baseUrl}${separator}fm=webp&q=70&w=400 400w`,
      `${baseUrl}${separator}fm=webp&q=70&w=600 600w`,
      `${baseUrl}${separator}fm=webp&q=70&w=800 800w`,
      `${baseUrl}${separator}fm=webp&q=70&w=1200 1200w`,
    ].join(', ');
  };

  const srcSet = generateSrcSet(src);

  if (!responsive || !src.includes('ctfassets.net')) {
    // Non-Contentful images - use standard img tag with lazy loading
    return (
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        style={style}
        decoding="async"
      />
    );
  }

  // Contentful images with responsive optimization
  return (
    <picture>
      {/* AVIF format (best compression, ~20% smaller than WebP) */}
      <source
        srcSet={srcSet?.replace(/fm=webp/g, 'fm=avif') || ''}
        sizes={finalSizes}
        type="image/avif"
      />
      {/* WebP format (~25% smaller than PNG) */}
      <source
        srcSet={srcSet}
        sizes={finalSizes}
        type="image/webp"
      />
      {/* PNG fallback for older browsers */}
      <img
        src={src}
        srcSet={srcSet ? srcSet.replace(/fm=webp/g, '') : undefined}
        sizes={finalSizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        style={style}
        decoding="async"
      />
    </picture>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  style: PropTypes.object,
  responsive: PropTypes.bool,
  sizes: PropTypes.string,
};

export default OptimizedImage;
