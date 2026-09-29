import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// import ChristmasHero from '../components/ChristmasHero';
import Hero from '../components/Hero';
import IconGrid from '../components/iconsSection';
import ProductShowcase from '../components/productCards';
import CrossMarquee from '../components/crossMarquee';
import PartyMoreFun from '../components/recipeSection';
import ChickenNuggetsSlider from '../components/animatedSlider';
import TruckAnimation from '../components/truckAnimation';
import ImageHoverComponent from '../components/imageHover';
import MarqueeSlider from '../components/marqueeSlider';
import JsonLd from '../components/JsonLd';
import { organizationJsonLd, webPageJsonLd, websiteJsonLd } from '../utils/seo';

const HOME_CANONICAL = 'https://www.snackster.co.in'; // no trailing slash
const pageDescription = 'Order Snackster ready to cook chicken snacks online. Explore frozen nuggets, kebabs, sausages, burger patties, popcorn, fingers, and party snacks made for quick hosting.';
const pageText = 'Snackster makes party hosting simpler with frozen chicken snacks that are quick to prepare and easy to serve. Explore ready to cook nuggets, kebabs, chicken popcorn, chicken fingers, burger patties, sausages, and more for house parties, game nights, movie marathons, birthday plans, and last-minute get-togethers. Our range is built for people who want dependable party snacks without spending hours in the kitchen. Pick your favorites, cook them in minutes, and pair them with dips, wraps, sliders, bowls, or platters. Snackster products are available through leading online and offline stores across key cities, so your next snack plan can move from freezer to table without drama.';

export default function Home() {
  // Force attribute value without trailing slash (browsers normalize .href to add /)
  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', HOME_CANONICAL);
    }
  }, []);

  return (
    <>
      <Helmet prioritizeSeoTags>
          <title>Ready to Cook Party Snacks Online | Frozen Chicken Snacks - Snackster</title>
          <meta name="description" content={pageDescription} />
          <link rel="canonical" href={HOME_CANONICAL} />
          <meta property="og:locale" content="en_IN" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Ready to Cook Party Snacks Online | Frozen Chicken Snacks - Snackster" />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:url" content={HOME_CANONICAL} />
          <meta property="og:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
          <meta property="og:image:width" content="1080" />
          <meta property="og:image:height" content="1080" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Ready to Cook Party Snacks Online | Frozen Chicken Snacks - Snackster" />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
          <meta name="twitter:site" content="@SnehaSnackster" />
        </Helmet>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={webPageJsonLd({
          name: 'Ready to Cook Party Snacks Online',
          url: '/',
          description: pageDescription,
          text: pageText,
        })} />
        <h1 className='d-none'>Party Snacks Online | Frozen Snacks Ready to Cook</h1>
      <Hero />
      {/* <ChristmasHero /> */}
      <IconGrid />
      <ProductShowcase />
      <CrossMarquee />
      <ImageHoverComponent />
      <MarqueeSlider />
      <ChickenNuggetsSlider />
      <PartyMoreFun />
      <TruckAnimation />
    </>
  );
}
