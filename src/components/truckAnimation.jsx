import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import truckAnimation from '../animations/truck-new.json'; 

gsap.registerPlugin(ScrollTrigger);

const TruckAnimation = () => {
  const truckRef = useRef(null);

  useEffect(() => {
    const truckElement = truckRef.current;

    const animationSettings = {
      x: () => -window.innerWidth, 
      ease: 'none',
      scrollTrigger: {
        trigger: truckElement,
        scrub: 0.5, 
        markers: false,
        start: 'top 100%', 
        end: 'bottom 50%',
      },
    };

    const updateAnimationSettings = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width <= 390 && height <= 844) {
        // For mobile devices 390x844
        animationSettings.scrollTrigger.start = 'top 80%'; 
        animationSettings.scrollTrigger.end = 'bottom 30%'; 
      } else if (width <= 768) {
        // For tablets and smaller screens
        animationSettings.scrollTrigger.start = 'top 90%'; 
        animationSettings.scrollTrigger.end = 'bottom 40%'; 
      } else {
        // For larger screens
        animationSettings.scrollTrigger.start = 'top 100%'; 
        animationSettings.scrollTrigger.end = 'bottom 75%'; 
      }

      ScrollTrigger.refresh();
    };

    updateAnimationSettings();

    window.addEventListener('resize', updateAnimationSettings);

    const animation = gsap.to(truckElement, animationSettings);

    return () => {
      window.removeEventListener('resize', updateAnimationSettings);
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
    };
  }, []);

  const containerStyle = {
    height: window.innerWidth <= 390 && window.innerHeight <= 844 ? '15vh' : '55vh',
    position: 'relative',
    willChange: 'transform',
  };

  return (
    <div className='mt-5 d-none d-md-block' style={containerStyle}>
      <div
        ref={truckRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '100%',
          transform: 'translateY(-50%)',
          width: '100%',
        }}
      >
        <Lottie
          animationData={truckAnimation}
          loop={true} 
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default TruckAnimation;
