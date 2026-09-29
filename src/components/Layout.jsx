import React, { useEffect, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));
const ScrollToTopButton = lazy(() => import('./ScrollToTopButton'));
const MobileHeader = lazy(() => import('./mobileHeader'));
const AnimatedBackground = lazy(() => import('./dqAnimateCircles'));
const AudioControl = lazy(() => import('./AudioControl'));

export default function Layout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      </Helmet>
      <React.Suspense fallback={null}>
        <Header />
        <MobileHeader />
        <main>
          <Outlet />
        </main>
        <AudioControl />
        <ScrollToTopButton />
        <AnimatedBackground />
        <Footer />
      </React.Suspense>
    </>
  );
}
