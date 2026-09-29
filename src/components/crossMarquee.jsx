import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import MarqueeSlider from 'react-marquee-slider';

const ScrollingTextWrapper = styled.div`
  position: absolute;
  width: 200%;
  height: 70px;
  overflow: hidden;
  white-space: nowrap;
  transform: ${({ rotate }) => (rotate ? 'rotate(-4.5deg)' : 'rotate(5deg)')};
  top: ${({ rotate }) => (rotate ? '30%' : '40%')};
  ${({ reverse }) => reverse && 'transform: rotate(184deg);'}

  @media (max-width: 768px) {
    top: ${({ rotate }) => (rotate ? '25%' : '35%')};
    height: 50px;
  }

  @media (max-width: 480px) {
    top: ${({ rotate }) => (rotate ? '20%' : '30%')};
    height: 50px;
  }
`;

const ScrollingText = styled.div`
  display: inline-block;
  white-space: nowrap;
  font-size: 2rem;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  font-family: 'Grunge Font', sans-serif;
  padding: 0vw 1vw;
  ${({ reverse }) => reverse && 'transform: rotate(180deg);'}

  @media (max-width: 768px) {
    font-size: 4vw;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const CrossMarqueeContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  height: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: 150px;
  }

  @media (max-width: 480px) {
    min-height: 100px;
  }
`;

const ScrollingTextMemo = memo(ScrollingText);

const CrossMarquee = () => {
  const [velocity, setVelocity] = useState(15);

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
          if (refreshRate > 90) {
            setVelocity(10); // Even slower velocity for high refresh rate displays
          }
        }
      };

      requestAnimationFrame(step);
    };

    checkRefreshRate();
  }, []);

  return (
    <CrossMarqueeContainer className='my-4'>
      <ScrollingTextWrapper rotate={true}>
        <MarqueeSlider velocity={velocity} minScale={1} scatterRandomly={false}>
          {[...Array(3)].map((_, index) => (
            <ScrollingTextMemo key={index} bgColor="#A100FF" color="#FFCD00">
             - NO STEROIDS - NO ADDED MSG - NO STEROIDS - NO ADDED MSG - NO STEROIDS - NO ADDED MSG - NO STEROIDS - NO ADDED MSG - NO STEROIDS - NO ADDED MSG - NO STEROIDS - NO ADDED MSG
            </ScrollingTextMemo>
          ))}
        </MarqueeSlider>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper rotate={false} reverse>
        <MarqueeSlider velocity={velocity} minScale={1} scatterRandomly={false}>
          {[...Array(3)].map((_, index) => (
            <ScrollingTextMemo key={index} bgColor="#FFCD00" color="#A100FF" reverse> 
              - Chicken Raised With NO ANTIBIOTICS - Chicken Raised With NO ANTIBIOTICS - Chicken Raised With NO ANTIBIOTICS - Chicken Raised With NO ANTIBIOTICS - Chicken Raised With NO ANTIBIOTICS 
            </ScrollingTextMemo>
          ))}
        </MarqueeSlider>
      </ScrollingTextWrapper>
    </CrossMarqueeContainer>
  );
};

export default CrossMarquee;
