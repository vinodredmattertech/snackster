import React from 'react';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from './OptimizedImage';

const PartySnack = () => {
  return (
    <>
      <Helmet>
        <title>About Snackster | Ready to Cook Chicken Party Snacks</title>
        <meta name="description"  content="Learn about Snackster ready to cook chicken party snacks from Sneha Chicken. Discover quick frozen snacks made for hosting, parties, and everyday cravings." />
        <link rel="canonical" href="https://www.snackster.co.in/about" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Snackster | Ready to Cook Chicken Party Snacks" />
        <meta property="og:description" content="Learn about Snackster ready to cook chicken party snacks from Sneha Chicken. Discover quick frozen snacks made for hosting, parties, and everyday cravings." />
        <meta property="og:url" content="https://www.snackster.co.in/about" />
        <meta property="og:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Snackster | Ready to Cook Chicken Party Snacks" />
        <meta name="twitter:description" content="Learn about Snackster ready to cook chicken party snacks from Sneha Chicken. Discover quick frozen snacks made for hosting, parties, and everyday cravings." />
        <meta name="twitter:image" content="https://www.snackster.co.in/images/snackster_logo.svg" />
        
        <meta name="twitter:site" content="@SnehaSnackster" />
        
      </Helmet>
      <div className="about-snackster">
        <div className="party-snack py-5">
          <div className="container pt-5">
            <div className="row text-center p-5">
              <div className="col mt-5">
                <h1 className="text-uppercase fw-bold">About <span>Snackster<br /> Party Snacks</span></h1>
                <p className="pt-5">
                  We love how snacks become the life of every party. Snackster brings ready to cook chicken snacks to hosts who want quick prep, bold flavor, and food that feels right for movie nights, birthdays, game days, family evenings, and last-minute get-togethers. Our range is made to help you serve hot snacks in minutes without turning the kitchen into the main event.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-sneha py-5 bg-warning">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <center>
                  <OptimizedImage
                    src="/images/about-sneha-chicken.png"
                    alt="Sneha Chicken Logo"
                    className="mb-4 w-50"
                    loading="lazy"
                    responsive={true}
                  />
                </center>
              </div>
              <div className="col-md-6">
                <p className="py-4">
                  The chicken from Sneha Chicken, a 40-year legacy brand, really wanted to be a part of this big party plan. Therefore, we present to you Snackster - to bring that crunch to every party.
                </p>
                <img src="/images/sneha-40years-logo.svg" alt="sneha 40 years logo" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartySnack;
