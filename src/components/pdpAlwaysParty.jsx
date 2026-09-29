import React, { useState, useEffect } from 'react';
import Marquee from 'react-marquee-slider';
import styled from 'styled-components';
import FlowerIcon from '../images/flower.svg';
import StarIcon from '../images/star.png'; // Import your SVG files
import SparkleIcon from '../images/sparkle.svg';
import StarBurstIcon from '../images/star_brust.svg';

const ScrollingTextWrapper = styled.div`
  background-color: white;
  padding: 40px 0;
  overflow: hidden;

  @media (max-width: 480px) {
     padding: 10px 0;
  }
`;

const ScrollingText = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #FF6D00;
  font-family: 'Blasto Distort', sans-serif;
  text-transform: uppercase;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 10px;
  }
`;

// const TheText = styled.span`
//   color: #d736ff;
//   margin-right: 5px;
// `;

const Icon = styled.img`
  width: 42px;
  height: 42px;
  margin: 0 10px;
  loading: lazy; // Added for native lazy-loading

  @media (max-width: 480px) {
  width: 22px;
  height: 22px;
}
`;

const AlwaysPartySlider = () => {
  const [velocity, setVelocity] = useState(40);

  useEffect(() => {
    const checkRefreshRate = () => {
      let refreshRate = 60;
      const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      let start = performance.now();
      let frames = 0;

      const step = (timestamp) => {
        if (timestamp < start + 1000) {
          frames++;
          requestAnimationFrame(step);
        } else {
          refreshRate = frames;
          if (refreshRate > 90 && window.innerWidth <= 480) {
            setVelocity(20); // Slower velocity for high refresh rate mobile displays
          }
        }
      };

      requestAnimationFrame(step);
    };

    checkRefreshRate();
  }, []);

  const items = [
    { text: "Always Party with Snackster", icon: null },
    { text: null, icon: FlowerIcon },
    { text: "Always Party with Snackster", icon: null },
    { text: null, icon: SparkleIcon },
    { text: "Always Party with Snackster", icon: null },
    { text: null, icon: StarIcon },
    { text: "Always Party with Snackster", icon: null },
    { text: null, icon: StarBurstIcon },
    { text: "Always Party with Snackster", icon: null },
    { text: null, icon: SparkleIcon },
    { text: "Always Party with Snackster", icon: null },
    { text: null, icon: FlowerIcon },
    { text: "Always Party with Snackster", icon: null },
    { text: null, icon: SparkleIcon },
    { text: "Always Party with Snackster", icon: null },
    { text: null, icon: StarIcon }
  ];

  return (
    <ScrollingTextWrapper className='my-3 align-items-center'>
      <Marquee velocity={velocity} minScale={1} scatterRandomly={false}>
        {items.map((item, index) => (
          <ScrollingText className='justify-content-between' key={index}>
            {item.text && <>{item.text}</>}
            {item.icon && <Icon src={item.icon} alt="icon" />}
          </ScrollingText>
        ))}
      </Marquee>
    </ScrollingTextWrapper>
  );
};

export default AlwaysPartySlider;