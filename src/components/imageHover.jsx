import React from 'react';
import productImageSeek from '../images/product-images/Chicken_Seekh_Kebab.png'; // replace with the path to your product image
import plateImageSeek from '../images/product-images/Chicken_Seekh_Kebab1.png'; // replace with the path to your plate image
import productImagePatty from '../images/product-images/Chicken_Burger_Patty.png'; // replace with the path to your product image
import plateImagePatty from '../images/product-images/Chicken_Burger_Patty1.png';
import productImageNuggets from '../images/product-images/Classic_Chicken_Nuggets.png'; // replace with the path to your product image
import plateImageNuggets from '../images/product-images/Classic_Chicken_Nuggets1.png';
import Lottie from 'lottie-react';
import starRing from '../animations/3-star-ring.json';
import blueBounce from '../animations/blue-bounce.json';
import circleRing from '../animations/circle-ring.json';

const ImageHoverComponent = () => {
    return (
        <section>
             <div className='bg-sky pt-5'>
                <div className="container pt-5 text-center">
                <div className='nuggets-anim-out d-none d-md-block'>
                        <img src='../images/nuggets1_anim.png' alt="Nuggets animation" loading="lazy"></img>
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-md-6 order-md-2 order-2'>
                            <div className="optimized-product-image-container">
                                <div className="background-shape3"></div>
                                <img src={productImageNuggets} alt="Classic Chicken Nuggets" className="optimized-product-image" loading="lazy" />
                                <img src={plateImageNuggets} alt="Classic Chicken Nuggets plate" className="optimized-child-image" loading="lazy" />
                            </div>
                        </div>
                        <div className='col-md-6 order-md-1 py-4 order-1 amin-sec'>
                            <center> <Lottie
                                animationData={blueBounce}
                                loop={true} // Prevent the animation from looping
                                style={{ width: '70%' }}
                            /></center>
                            <div className='anim-text3'>Blow Your Candle Party</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-pink pt-5'>
                <div className="container pt-5 text-center">
                    <div className='kebab-anim-out d-none d-md-block'>
                        <img src='../images/kebab_anim.png' alt="Kebab animation" className='kebab-anim' loading="lazy"></img>
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-md-6 order-md-1 order-2'>
                            <div className="optimized-product-image-container">
                                <div className="background-shape1"></div>
                                <img src={productImageSeek} alt="Chicken Seekh Kebab" style={{width: "50%"}} className="optimized-product-image" loading="lazy" />
                                <img src={plateImageSeek} alt="Chicken Seekh Kebab plate" className="optimized-child-image" loading="lazy" />
                            </div>
                        </div>
                        <div className='col-md-6 order-md-2 py-4 order-1 amin-sec'>
                            <center> <Lottie
                                animationData={starRing}
                                loop={true} // Prevent the animation from looping
                                style={{ width: '70%' }}
                            /></center>
                            <div className='anim-text1'>Hangout Party Scenes</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-yellow pt-5'>
                <div className="container pt-5 text-center">
                    <div className='burger-patty-anim-out d-none d-md-block'>
                        <img src='../images/burger_patty_anim.png' alt="Burger patty animation" className='burger-patty' loading="lazy"></img>
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-md-6 order-md-2 order-2'>
                            <div className="optimized-product-image-container">
                                <div className="background-shape2"></div>
                                <img src={productImagePatty} alt="Chicken Burger Patty" style={{width: "60%"}} className="optimized-product-image" loading="lazy" />
                                <img src={plateImagePatty} alt="Chicken Burger Patty plate" className="optimized-child-image" loading="lazy" />
                            </div>
                        </div>
                        <div className='col-md-6 order-md-1 py-4 order-1 amin-sec'>
                            <center> <Lottie
                                animationData={circleRing}
                                loop={true} // Prevent the animation from looping
                                style={{ width: '70%' }}
                            /></center>
                            <div className='anim-text2'>Match Must Haves</div>
                        </div>
                    </div>
                </div>
            </div>
           
        </section>
    );
}

export default ImageHoverComponent;
