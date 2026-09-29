#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts PNG images to WebP and AVIF formats for better performance
 * Run: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');

try {
  const sharp = require('sharp');

  const imageDir = path.join(__dirname, '../public/images');
  const outputDir = path.join(__dirname, '../public/images/optimized');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const PNG_FILES = [
    'ke-sath-no-stopping.png',
    'issa-vibe.png',
    'aur-local-mimosa.png',
    'burger_patty_anim.png',
    'nuggets1_anim.png',
    'kebab_anim.png',
  ];

  const QUALITY_SETTINGS = {
    webp: 70,
    avif: 65,
  };

  async function optimizeImage(fileName) {
    try {
      const inputPath = path.join(imageDir, fileName);
      const baseName = path.parse(fileName).name;

      if (!fs.existsSync(inputPath)) {
        console.warn(`⚠️  Skipping: ${fileName} not found`);
        return;
      }

      // Get original file size
      const originalSize = fs.statSync(inputPath).size;
      const originalSizeKB = (originalSize / 1024).toFixed(2);

      // Convert to WebP
      const webpPath = path.join(outputDir, `${baseName}.webp`);
      await sharp(inputPath)
        .webp({ quality: QUALITY_SETTINGS.webp })
        .toFile(webpPath);

      const webpSize = fs.statSync(webpPath).size;
      const webpSizeKB = (webpSize / 1024).toFixed(2);
      const webpSavings = ((1 - webpSize / originalSize) * 100).toFixed(1);

      // Convert to AVIF
      const avifPath = path.join(outputDir, `${baseName}.avif`);
      await sharp(inputPath)
        .avif({ quality: QUALITY_SETTINGS.avif })
        .toFile(avifPath);

      const avifSize = fs.statSync(avifPath).size;
      const avifSizeKB = (avifSize / 1024).toFixed(2);
      const avifSavings = ((1 - avifSize / originalSize) * 100).toFixed(1);

      console.log(`
✓ ${fileName}
  Original (PNG):  ${originalSizeKB} KB
  WebP:           ${webpSizeKB} KB (${webpSavings}% savings)
  AVIF:           ${avifSizeKB} KB (${avifSavings}% savings)
`);
    } catch (error) {
      console.error(`✗ Error optimizing ${fileName}: ${error.message}`);
    }
  }

  async function main() {
    console.log(`\n🖼️  Image Optimization Starting...\n`);
    console.log(`Quality Settings:`);
    console.log(`  WebP: ${QUALITY_SETTINGS.webp}`);
    console.log(`  AVIF: ${QUALITY_SETTINGS.avif}\n`);

    for (const file of PNG_FILES) {
      await optimizeImage(file);
    }

    // Optimize available-on logos
    const availableOnDir = path.join(imageDir, 'available-on');
    if (fs.existsSync(availableOnDir)) {
      const logos = fs.readdirSync(availableOnDir).filter((f) => f.endsWith('.png'));

      if (logos.length > 0) {
        console.log(`\n🏪 Optimizing Available-On Logos...\n`);
        for (const logo of logos) {
          const inputPath = path.join(availableOnDir, logo);
          const baseName = path.parse(logo).name;
          const outputLogoDir = path.join(outputDir, 'available-on');

          if (!fs.existsSync(outputLogoDir)) {
            fs.mkdirSync(outputLogoDir, { recursive: true });
          }

          try {
            const originalSize = fs.statSync(inputPath).size;
            const originalSizeKB = (originalSize / 1024).toFixed(2);

            // Convert to WebP
            const webpPath = path.join(outputLogoDir, `${baseName}.webp`);
            await sharp(inputPath)
              .webp({ quality: 80 })
              .toFile(webpPath);

            const webpSize = fs.statSync(webpPath).size;
            const webpSizeKB = (webpSize / 1024).toFixed(2);
            const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

            console.log(`✓ ${logo}: ${originalSizeKB} KB → ${webpSizeKB} KB (${savings}% savings)`);
          } catch (error) {
            console.error(`✗ Error optimizing ${logo}: ${error.message}`);
          }
        }
      }
    }

    console.log(`\n✅ Image optimization complete!`);
    console.log(`\n📝 Next steps:`);
    console.log(`1. Update image components to use optimized formats`);
    console.log(`2. Use <picture> element for format fallbacks`);
    console.log(`3. Run Lighthouse audit to verify improvements\n`);
  }

  main();
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.warn(`\n⚠️  sharp not installed. Image optimization skipped.`);
    console.warn(`\nTo enable image optimization, run:`);
    console.warn(`npm install --save-dev sharp\n`);
    process.exit(0);
  } else {
    throw error;
  }
}
