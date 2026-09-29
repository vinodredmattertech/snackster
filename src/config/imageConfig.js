/**
 * Image Optimization Configuration
 * Defines responsive image breakpoints and optimization strategies
 */

export const IMAGE_BREAKPOINTS = {
  mobile: {
    width: 640,
    quality: 75,
  },
  tablet: {
    width: 1024,
    quality: 80,
  },
  desktop: {
    width: 1440,
    quality: 85,
  },
};

/**
 * Responsive sizes for different image contexts
 */
export const IMAGE_SIZES = {
  // Product images - displayed at different sizes across viewports
  product: '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw',
  
  // Product card images - smaller displays
  productCard: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw',
  
  // Hero/banner images - full width
  hero: '100vw',
  
  // Thumbnails - small fixed sizes
  thumbnail: '(max-width: 640px) 80px, 100px',
  
  // Available on logos - very small
  logo: '(max-width: 640px) 40px, 54px',
};

/**
 * Image optimization parameters for Contentful images
 * Contentful supports real-time image transformation
 */
export const CONTENTFUL_OPTIMIZATION = {
  // Quality levels for different formats
  quality: {
    avif: 65,    // AVIF can use lower quality due to better compression
    webp: 70,    // WebP quality
    jpeg: 80,    // JPEG quality (fallback)
    png: 90,     // PNG quality
  },

  // Format priority (Contentful will use the best available)
  formats: {
    primary: 'avif',    // Best compression (~20% smaller than WebP)
    secondary: 'webp',  // Good support (~25% smaller than PNG)
    fallback: 'png',    // Universal support
  },

  // Automatic width optimization
  autoWidth: true,

  // Progressive loading
  progressive: true,
};

/**
 * Local image optimization (for images in /public/images)
 * Requires build-time processing with tools like ImageMagick or sharp
 */
export const LOCAL_IMAGE_OPTIMIZATION = {
  // Supported formats to generate
  formats: ['original', 'webp', 'avif'],

  // Quality settings for each format
  quality: {
    webp: { quality: 70 },
    avif: { quality: 65 },
  },

  // Size variants to generate
  sizes: [320, 480, 640, 800, 1024, 1440],

  // Skip optimization for very small images (< 50KB)
  skipUnder: 50,

  // Maximum size limit for optimization (prevent huge files)
  maxSize: 5000,
};

/**
 * Cache busting and CDN configuration
 */
export const CDN_CONFIG = {
  // Contentful images
  contentful: {
    domain: 'images.ctfassets.net',
    cacheControl: 'public, max-age=31536000, immutable', // 1 year
  },

  // Local images
  local: {
    domain: 'www.snackster.co.in',
    cacheControl: 'public, max-age=31536000, immutable', // 1 year
  },
};

export default {
  IMAGE_BREAKPOINTS,
  IMAGE_SIZES,
  CONTENTFUL_OPTIMIZATION,
  LOCAL_IMAGE_OPTIMIZATION,
  CDN_CONFIG,
};
