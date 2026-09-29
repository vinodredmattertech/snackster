/**
 * EXAMPLE: How to implement OptimizedImage component
 * Copy these patterns to update your components
 */

// ============================================
// EXAMPLE 1: Product Cards Component
// ============================================

import OptimizedImage from './OptimizedImage';
import { IMAGE_SIZES } from '../config/imageConfig';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <OptimizedImage
        src={product.productFeaturedImage.url}
        alt={product.productName}
        className="product-image"
        sizes={IMAGE_SIZES.productCard}
        loading="lazy"
        responsive={true}
      />
      <h3>{product.productName}</h3>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Product Gallery
// ============================================

function ProductGallery({ images }) {
  return (
    <div className="gallery">
      {images.map((image, idx) => (
        <OptimizedImage
          key={idx}
          src={image.url}
          alt={`Product image ${idx + 1}`}
          sizes={IMAGE_SIZES.product}
          loading="lazy"
          responsive={true}
        />
      ))}
    </div>
  );
}

// ============================================
// EXAMPLE 3: Available-On Logos
// ============================================

function AvailableOnLogos({ logos }) {
  return (
    <div className="available-on">
      {logos.map((logo, idx) => (
        <OptimizedImage
          key={idx}
          src={logo.imageSrc}
          alt={`Available on ${logo.name}`}
          width="54"
          height="54"
          sizes={IMAGE_SIZES.logo}
          loading="lazy"
        />
      ))}
    </div>
  );
}

// ============================================
// EXAMPLE 4: Hero/Banner Image
// ============================================

function HeroBanner({ heroImage }) {
  return (
    <section className="hero">
      <OptimizedImage
        src={heroImage}
        alt="Hero banner"
        sizes={IMAGE_SIZES.hero}
        loading="eager"  // Hero images should load eagerly
        responsive={true}
      />
    </section>
  );
}

// ============================================
// EXAMPLE 5: Manual URL Optimization (without component)
// ============================================

function optimizeContentfulUrl(url, options = {}) {
  if (!url || !url.includes('ctfassets.net')) {
    return url;
  }

  const {
    format = 'webp',        // 'avif' | 'webp' | 'png'
    quality = 70,           // 1-100
    width = 'auto',         // number or 'auto'
    progressive = true,
  } = options;

  const separator = url.includes('?') ? '&' : '?';
  let optimized = `${url}${separator}fm=${format}&q=${quality}`;

  if (width !== 'auto') {
    optimized += `&w=${width}`;
  }

  if (progressive) {
    optimized += '&fl=progressive';
  }

  return optimized;
}

// Usage:
const optimizedUrl = optimizeContentfulUrl(
  'https://images.ctfassets.net/.../image.png',
  { format: 'webp', quality: 70, width: 800 }
);
// Result: https://images.ctfassets.net/.../image.png?fm=webp&q=70&w=800&fl=progressive

// ============================================
// EXAMPLE 6: Complete Product Page Update
// ============================================

import React from 'react';
import OptimizedImage from '../components/OptimizedImage';
import { IMAGE_SIZES } from '../config/imageConfig';

function ProductPage() {
  const products = [
    {
      id: 1,
      name: 'Chicken Nuggets',
      image: 'https://images.ctfassets.net/xpevfus5shq2/.../nuggets.png',
    },
    // ... more products
  ];

  return (
    <div className="products-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          {/* Product Image - Will load as WebP/AVIF with proper sizing */}
          <OptimizedImage
            src={product.image}
            alt={product.name}
            className="product-image"
            sizes={IMAGE_SIZES.productCard}
            loading="lazy"
            responsive={true}
            style={{ width: '100%', height: 'auto' }}
          />
          <h2>{product.name}</h2>
        </article>
      ))}
    </div>
  );
}

// ============================================
// BENEFITS OF THIS APPROACH
// ============================================

/*
✅ Automatic Format Selection:
   - Modern browsers get AVIF (20% smaller than PNG)
   - Fallback to WebP (25% smaller than PNG)
   - Old browsers get PNG (universal support)

✅ Responsive Images:
   - Different sizes for different viewports
   - srcSet automatically handles pixel density
   - Saves bandwidth on mobile devices

✅ Lazy Loading:
   - Images load only when visible
   - Reduces initial page load time
   - Improves Core Web Vitals

✅ Contentful Optimization:
   - Real-time image transformation
   - No build-time processing needed
   - Automatic quality optimization

EXPECTED RESULTS:
- 70-80% reduction in image sizes
- 30-50% improvement in LCP (Largest Contentful Paint)
- ~800ms faster page load
- Lighthouse Performance score +30-40 points
*/

// ============================================
// MIGRATION CHECKLIST
// ============================================

/*
Components to Update:
[ ] src/components/productCards.jsx
[ ] src/components/ProductPage.jsx
[ ] src/components/productDescriptionPage.jsx
[ ] src/components/productDescriptionPage.jsx (gallery)
[ ] src/components/Hero.jsx (hero image)
[ ] src/components/animatedSlider.jsx
[ ] src/pages/LandingPageHyd.jsx
[ ] src/pages/LandingPageBang.jsx
[ ] src/pages/LandingPageMumbai.jsx
[ ] All brand/logo components

Quick Implementation:
1. Replace <img> with <OptimizedImage>
2. Add sizes prop for responsive images
3. Set responsive={true} for Contentful images
4. Test in Chrome DevTools (check Network tab for WebP)
5. Run Lighthouse audit to verify improvements
*/

export {
  ProductCard,
  ProductGallery,
  AvailableOnLogos,
  HeroBanner,
  optimizeContentfulUrl,
  ProductPage,
};
