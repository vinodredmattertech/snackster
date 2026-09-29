import React from 'react';
import styled, { keyframes } from 'styled-components';
import foregroundImage from '../../images/bg1.png';
import backgroundImage from '../../images/bg2.png';
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
  loading: lazy; // Added native lazy-loading
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
  z-index: 2;
  margin-top: 1rem;
  font-family: 'Blasto Distort', sans-serif;
  bottom: 10%;
  left: 45%;
  animation: ${bounce} 2s infinite; // Enabled button animation

  @media (max-width: 480px) {
    left: 20%;
  }
`;

// Main Component
const LandHero = () => {
  return (
    <HeroBanner>
      <ScrollingTextWrapper className='d-block d-md-none'>
        <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-none d-md-block'>
        <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
        <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="20%" reverse>
        <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-none d-md-block' top="25%" reverse>
        <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
        <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-none d-md-block' top="40%">
        <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
        <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="30%">
        <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-none d-md-block' top="55%" reverse>
        <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
        <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="40%" reverse>
        <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="50%">
        <ScrollingText>ALWAYS PARTY WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <ScrollingTextWrapper className='d-block d-md-none' top="60%" reverse>
        <ScrollingText reverse>JOIN THE FUN WITH SNACKSTER |&nbsp;</ScrollingText>
      </ScrollingTextWrapper>
      <div className='container text-center'>
        <ForegroundImage src={foregroundImage} className='dq-img' width={740} height="530" alt="Foreground" loading="lazy" />
        <CTAButton><ScrollLink
              to="party"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              EXPLORE PRODUCTS <Icon icon="iconamoon:arrow-down-6-circle" style={{ fontSize: '32px' }} />
            </ScrollLink></CTAButton>
      </div>
    </HeroBanner>
  );
};

export default LandHero;
