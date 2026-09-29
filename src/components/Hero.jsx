import React from 'react';
import styled, { keyframes } from 'styled-components';
import backgroundImage from '../images/bg2.png';
import Marquee from 'react-marquee-slider';
import { Icon } from '@iconify/react';
import { Link as ScrollLink } from 'react-scroll';

// Keyframes for animations
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled components
const HeroBanner = styled.div`
  position: relative;
  height: auto;
  background: url(${backgroundImage}) no-repeat center center/cover;
  background-color: #E21E79;
  background-blend-mode: multiply;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding-top: 90px;

  @media (max-width: 480px) {
  height: 535px;
  align-items: flex-end;
}
`;

const ScrollingTextWrapper = styled.div`
  padding-top: 90px;
  position: absolute;
  top: ${props => props.top || '10%'};
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  transform: ${props => props.reverse ? 'scaleX(-1)' : 'none'};
`;

const ScrollingText = styled.div`
  display: inline-block;
  white-space: nowrap;
  font-size: 4rem;
  transform: ${props => props.reverse ? 'scaleX(-1)' : 'none'};
  font-family: 'Blasto Distort', sans-serif;
  color: #FFCD00;

  @media (max-width: 480px) {
  font-size: 2.5rem;
}
`;

const ForegroundImage = styled.img`
  position: relative;
  z-index: 1;
  width: 45%;
  max-width: 420px;
  height: auto;
  margin: 0 auto;
  display: block;
`;

const CTAButton = styled.button`
  position: absolute;
  background: #A100FF;
  color: #FFCD00;
  border: none;
  border-radius: 35px;
  padding: .6rem 1rem;
  font-size: .8rem;
  cursor: pointer;
  animation: ${bounce} 2s infinite;
  z-index: 2;
  margin-top: 1rem;
  font-family: 'Blasto Distort', sans-serif;
  bottom: 10%;
  left: 45%;

  @media (max-width: 480px) {
  left: 20%;
}
`;

// Main Component
const Hero = () => {
  return (
    <HeroBanner >
      <ScrollingTextWrapper className='d-block d-md-none'>
        <Marquee velocity={8} minScale={1} scatterRandomly={false}>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-none d-md-block'>
        <Marquee velocity={15} minScale={1} scatterRandomly={false}>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="20%" reverse>
        <Marquee velocity={8} minScale={1} scatterRandomly={false}>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-none d-md-block' top="25%" reverse>
        <Marquee velocity={15} minScale={1} scatterRandomly={false}>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-none d-md-block' top="40%">
        <Marquee velocity={15} minScale={1} scatterRandomly={false}>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="30%">
        <Marquee velocity={8} minScale={1} scatterRandomly={false}>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-none d-md-block' top="55%" reverse>
        <Marquee velocity={15} minScale={1} scatterRandomly={false}>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="40%" reverse>
        <Marquee velocity={8} minScale={1} scatterRandomly={false}>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="50%">
        <Marquee velocity={8} minScale={1} scatterRandomly={false}>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="60%" reverse>
        <Marquee velocity={8} minScale={1} scatterRandomly={false}>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
          <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
        </Marquee>
      </ScrollingTextWrapper>
      <div className='container text-center'>
        <ForegroundImage src="/images/banner.png" className='dq-img' width={740} alt="Foreground" loading="lazy" />
        <CTAButton><ScrollLink
              to="party"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              // onClick={() => setMobileToggle(false)}
            >
              ENTER THE PARTY <Icon icon="iconamoon:arrow-down-6-circle" style={{ fontSize: '32px' }} />
            </ScrollLink></CTAButton>
      </div>
    </HeroBanner>
  );
};

export default Hero;
