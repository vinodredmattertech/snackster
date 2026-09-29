import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LandMobileHeader() {
  const [mobileToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const logoElement = logoRef.current;

    const handleMouseEnter = () => {
      gsap.to(logoElement, { scale: 1.1, duration: 0.5, ease: 'power1.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(logoElement, { scale: 1, duration: 0.5, ease: 'power1.out' });
    };

    const handleClick = () => {
      gsap.to(logoElement, { rotate: 15, duration: 0.3, ease: 'power1.out' });
      gsap.to(logoElement, { rotate: 0, duration: 0.3, ease: 'power1.out', delay: 0.3 });
    };

    logoElement.addEventListener('mouseenter', handleMouseEnter);
    logoElement.addEventListener('mouseleave', handleMouseLeave);
    logoElement.addEventListener('click', handleClick);

    return () => {
      logoElement.removeEventListener('mouseenter', handleMouseEnter);
      logoElement.removeEventListener('mouseleave', handleMouseLeave);
      logoElement.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={`mobile-header d-md-none d-block ${mobileToggle ? 'menu-open' : ''}`}>
      <div className={`container pt-3 ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">
            <img
              ref={logoRef}
              src='/images/snackster_logo.svg'
              alt='Sneha Snackster'
              loading="lazy" // Added for native lazy-loading
            />
        </div>
      </div>
    </div>
  );
}
