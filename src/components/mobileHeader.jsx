import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function MobileHeader() {
  const [mobileToggle, setMobileToggle] = useState(false);
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

  const handleToggle = () => {
    setMobileToggle(!mobileToggle);
  };

  const handleMenuItemClick = () => {
    setMobileToggle(false);
  };

  return (
    <div className={`mobile-header d-md-none d-block ${mobileToggle ? 'menu-open' : ''}`}>
      {/* {!scrolled && (
        <div className='top-header'>
          <p><br/></p>
        </div>
      )} */}
      <div className={`container pt-3 ${scrolled ? 'scrolled' : ''}`}>
        <div className="menu-icon" onClick={handleToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="logo">
          <Link to="/">
            <img
              ref={logoRef}
              src='/images/snackster_logo.svg'
              alt='Sneha Snackster'
              loading="lazy" // Added for native lazy-loading
            />
          </Link>
        </div>
        {mobileToggle && (
          <div className="mobile-menu">
            <Link to="/" className='pt-4' onClick={handleMenuItemClick}>Home</Link>
            <Link to="/about" onClick={handleMenuItemClick}>About</Link>
            <Link to="/products" onClick={handleMenuItemClick}>Shop</Link>
            <Link to="/recipes" onClick={handleMenuItemClick}>Recipes</Link>
            <Link to="/blogs" onClick={handleMenuItemClick}>Blogs</Link>
          </div>
        )}
      </div>
    </div>
  );
}
