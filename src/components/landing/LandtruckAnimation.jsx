import React from 'react';
import Lottie from 'lottie-react';
import truckAnimation from '../../animations/truck.json'; // Path to your Lottie JSON file

const LandTruckAnimation = () => {
  const containerStyle = {
    position: 'relative',
    willChange: 'transform', // Hint to browser for optimization
  };

  return (
    <div className='mt-5 container-fluid' style={containerStyle}>
        <Lottie
          animationData={truckAnimation}
          loop={true} // Allow the animation to loop
          style={{ width: '100%' }}
        />
    </div>
  );
};

export default LandTruckAnimation;
