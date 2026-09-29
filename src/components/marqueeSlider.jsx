import React from 'react';
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
  color: #d736ff;
  font-family: 'Blasto Distort', sans-serif;
  text-transform: uppercase;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 10px;
  }
`;

const TheText = styled.span`
  color: #d736ff;
  margin-right: 5px;
`;

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

const MarqueeSlider = () => {
  const items = [
    { text: "Chill One", icon: null },
    { text: null, icon: FlowerIcon },
    { text: "Dancer", icon: null },
    { text: null, icon: SparkleIcon },
    { text: "Prankster", icon: null },
    { text: null, icon: StarIcon },
    { text: "Clumsy One", icon: null },
    { text: null, icon: StarBurstIcon },
    { text: "Over Drunk", icon: null },
    { text: null, icon: SparkleIcon },
    { text: "Chill One", icon: null },
    { text: null, icon: FlowerIcon },
    { text: "Dancer", icon: null },
    { text: null, icon: SparkleIcon },
    { text: "Prankster", icon: null },
    { text: null, icon: StarIcon },
  ];

  return (
    <ScrollingTextWrapper className='my-3 align-items-center'>
      <Marquee velocity={40} minScale={1} scatterRandomly={false}>
        {items.map((item, index) => (
          <ScrollingText key={index}>
            {item.text && <><TheText>FOR THE</TheText>{item.text}</>}
            {item.icon && <Icon src={item.icon} alt="icon" />}
          </ScrollingText>
        ))}
      </Marquee>
    </ScrollingTextWrapper>
  );
};

export default MarqueeSlider;