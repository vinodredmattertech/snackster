# Image Optimization Implementation Guide

## Current Status
- **Potential Savings**: ~27,266 KiB (26.6 MB)
- **Main Issues**:
  - PNG images not using modern formats (WebP/AVIF)
  - Large product images (4-5MB) displayed at small sizes (300x300px)
  - Missing responsive image srcsets
  - No automatic image optimization for Contentful images

## Quick Wins (Immediate - ~70% savings)

### 1. Enable Contentful Image Optimization
All images from `ctfassets.net` automatically get optimization:
```javascript
// Replace old image URLs with optimized versions
// Old: https://images.ctfassets.net/.../image.png
// New: https://images.ctfassets.net/.../image.png?fm=webp&q=70&w=auto

// Or use the OptimizedImage component:
import OptimizedImage from './components/OptimizedImage';

<OptimizedImage
  src="https://images.ctfassets.net/xpevfus5shq2/.../image.png"
  alt="Product"
  width="400"
  height="400"
/>
```

**Expected Savings**:
- PNG to WebP: ~25% reduction
- PNG to AVIF: ~45% reduction
- Proper sizing: ~60% reduction on oversized images
- **Combined: ~70-80% total reduction**

### 2. Priority Updates (Highest Impact)

#### Product Images (18.5 MB potential savings)
These are the largest files in your audit:
- Chicken Burger Patty: 4.7 MB → ~1.2 MB (75% savings)
- Chicken Seekh Kebab: 3.6 MB → ~900 KB (75% savings)
- Classic Chicken Nuggets: 3.5 MB → ~900 KB (75% savings)

**Update locations**:
- `src/components/productCards.jsx` - Product showcase cards
- `src/components/ProductPage.jsx` - Product listing
- `src/components/productDescriptionPage.jsx` - Product detail pages
- `src/pages/ProductDes.jsx` - Product description

#### Contentful Product Images (9.1 MB potential savings)
Each product image can be optimized automatically:
```javascript
// Add to any image from Contentful:
const optimizeContentfulUrl = (url) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}fm=webp&q=70&w=auto`;
};
```

## Implementation Steps

### Step 1: Update Image Components
Search and update all `<img>` tags from Contentful to use OptimizedImage:

```javascript
// BEFORE
<img 
  src={product.image}
  alt={product.name}
  className="product-image"
  loading="lazy"
/>

// AFTER
import OptimizedImage from '../OptimizedImage';

<OptimizedImage
  src={product.image}
  alt={product.name}
  className="product-image"
  loading="lazy"
  responsive={true}
/>
```

### Step 2: Optimize Local PNG Images
Files in `public/images/` need optimization. Run:

```bash
# Install image optimization tool
npm install --save-dev sharp

# Run optimization script (see image-optimization.js)
node scripts/optimize-images.js
```

This will generate WebP and AVIF versions of all local PNGs.

### Step 3: Update Build Process
Add image optimization to build pipeline:

```json
{
  "scripts": {
    "build": "npm run optimize-images && react-scripts build",
    "build:seo": "npm run optimize-images && npm run generate-sitemap && npm run build:prerender",
    "optimize-images": "node scripts/optimize-images.js"
  }
}
```

## Detailed Implementation

### Component Updates Needed

#### 1. ProductPage.jsx
```javascript
// Update product card images
products.map(product => (
  <OptimizedImage
    src={product.productFeaturedImage.url}
    alt={product.productName}
    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
    loading="lazy"
  />
))
```

#### 2. productDescriptionPage.jsx
```javascript
// Update product gallery
product.productGalleryCollection.items.map((image, idx) => (
  <OptimizedImage
    key={idx}
    src={image.url}
    alt={`Product ${idx}`}
    sizes="(max-width: 640px) 80vw, 60vw"
    loading="lazy"
  />
))
```

#### 3. productCards.jsx
```javascript
// Update showcase cards
<OptimizedImage
  src={product.image}
  alt={product.name}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
  responsive={true}
/>
```

#### 4. Available-on logos
```javascript
// These 54x54px logos are oversized (417x417)
// Update all instances:
<OptimizedImage
  src={logoImage}
  alt="Available on"
  width="54"
  height="54"
  sizes="(max-width: 640px) 40px, 54px"
/>
```

#### 5. Hero/Banner Images
```javascript
<OptimizedImage
  src={heroImage}
  alt="Hero"
  sizes="100vw"
  responsive={true}
/>
```

## Estimated Timeline & Savings

### Phase 1: Quick Win (1 day)
- Enable Contentful optimization in 3-4 key components
- **Savings**: ~12 MB (45%)
- **Implementation**: Update ProductPage, productCards, available-on logos

### Phase 2: Full Coverage (2 days)
- Update all Contentful image components
- Implement local image optimization
- **Savings**: ~24 MB (90% of total)
- **Implementation**: Update all components + run optimization script

### Phase 3: Monitoring (ongoing)
- Monitor image sizes in Lighthouse audits
- Maintain optimization config
- Update new components to use OptimizedImage
- **Maintenance**: 30 min per month

## Expected Performance Improvements

### Before Optimization
- Total Image Size: ~27 MB
- LCP Delay: ~800ms
- Lighthouse Performance: 30-40/100

### After Full Implementation
- Total Image Size: ~2.5-3 MB (-90%)
- LCP Delay: ~200ms (-75%)
- Lighthouse Performance: 75-85/100
- **Savings**: 27,000 KiB

## Testing & Validation

```bash
# Test image optimization
npm run build

# Run Lighthouse audit
# Should show image delivery savings of 90%+

# Check image formats in DevTools
# Ensure WebP/AVIF are being served to modern browsers
```

## Tools & Resources

1. **Contentful Image API**: https://www.contentful.com/developers/docs/references/images-api/
2. **Sharp (Image Processing)**: https://sharp.pixelplumbing.com/
3. **WebP Compression**: https://developers.google.com/speed/webp/
4. **AVIF Format**: https://aomediacodec.org/av1-image/

## Next Steps

1. ✅ Create OptimizedImage component (DONE)
2. ✅ Create imageConfig.js (DONE)
3. → Update ProductPage.jsx with OptimizedImage
4. → Update productDescriptionPage.jsx
5. → Create optimize-images.js script
6. → Update build process
7. → Run full Lighthouse audit
