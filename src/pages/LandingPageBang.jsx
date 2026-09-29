import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import LandHeader from "../components/landing/LandHeader";
import LandMobileHeader from "../components/landing/LandmobileHeader";
import LandHero from "../components/landing/Hero";
import LandingProductsBang from "../components/landing/LandingProductsBang";
import CrossMarquee from "../components/crossMarquee";
import ProductRange from "../components/landing/productRange";
import DqLandPre from "../components/landing/dqPrefooter";
import JsonLd from "../components/JsonLd";
import { webPageJsonLd } from "../utils/seo";

const AudioControl = lazy(() => import('../components/AudioControl'));
const pageDescription = "Order Snackster party snacks in Bangalore. Find ready to cook chicken nuggets, popcorn, fingers, sausages, kebabs, and burger patties online.";
const pageText = "Snackster makes party snacks easier for Bangalore hosts who want quick, hot starters without spending the evening in the kitchen. Browse ready to cook chicken nuggets, popcorn, fingers, burger patties, sausages, and more for house parties, office hangouts, weekend plans, and last-minute snack cravings.";

export default function LandingPageBang() {
  return (
    <>
      <Helmet>
        <title>Party Snacks in Bangalore | Ready to Cook Chicken Snacks - Snackster</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.snackster.co.in/party-snacks-bangalore" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Party Snacks in Bangalore | Ready to Cook Chicken Snacks - Snackster" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.snackster.co.in/party-snacks-bangalore" />
        <meta property="og:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Party Snacks in Bangalore | Ready to Cook Chicken Snacks - Snackster" />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        <meta name="twitter:site" content="@SnehaSnackster" />
      </Helmet>
      <JsonLd data={webPageJsonLd({
        name: 'Ready to Cook Party Snacks in Bangalore',
        url: '/party-snacks-bangalore',
        description: pageDescription,
        text: pageText,
      })} />
      <Suspense fallback={null}>
        <AudioControl />
      </Suspense>
      <LandHeader />
      <LandMobileHeader />
      <LandHero />
      <div className="container text-center pt-4 pb-3">
        <h1
          className="mb-0"
          style={{
            fontFamily: "'Blasto Distort', sans-serif",
            fontSize: "28px",
            color: "#000",
          }}
        >
          Ready to Cook - Party Snacks in Bangalore
        </h1>
      </div>
      <LandingProductsBang />
      <CrossMarquee />
      <ProductRange />
      <div className="container mb-5">
        <h2 className="text-center text-black pt-2 pb-5" style={{ fontFamily: "'Blasto Distort', sans-serif", fontSize: "24px" }}>Welcome to Dulquer's birthday party!</h2>
        <iframe width="100%" height="600" className="d-md-block d-none pb-5 w-75 m-auto" src="https://www.youtube.com/embed/nX2VPf4b9Sw?si=yjrtomzXx9aJ6_0_" title="Snackster Bangalore party snacks video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe width="100%" height="200" className="d-md-none d-block m-auto" src="https://www.youtube.com/embed/nX2VPf4b9Sw?si=yjrtomzXx9aJ6_0_" title="Snackster Bangalore party snacks video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <DqLandPre />
    </>
  );
}
