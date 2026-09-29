import React from 'react';

const AnimatedBackground = () => {
    return (
        <div className="container-anim">
            <div className="circle-container">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <img
                src="/images/banner.png"
                alt="DQ Snackster"
                className="foreground-image"
                loading="lazy"
                style={{ width: '45%', maxWidth: '420px', height: 'auto', display: 'block', margin: '0 auto' }}
            />
        </div>
    );
}

export default AnimatedBackground;
