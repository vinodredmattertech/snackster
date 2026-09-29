import React from 'react';
import OptimizedImage from './OptimizedImage';
// import { Icon } from '@iconify/react';
// import amazonFresh from '../images/amazon-fresh.svg';
// import bigBasket from '../images/big-basket.svg';
// import swiggyInsta from '../images/swiggy-instamart.svg';
// import spar from '../images/Spar.svg';
// import Vijetha from '../images/vijetha.png';
// import QMart from '../images/qmart.png';
// import MangoSM from '../images/mango.png';
// import MKRetail from '../images/mk-retail.png';


// const SocialIcon = ({ icon, link }) => {
//     return (
//         <a href={link} target="_blank" rel="noopener noreferrer">
//             <Icon icon={icon} color='#fff' width="32" height="32" />
//         </a>
//     );
// };

const SocialIcons = () => {
    return (
        <div className='footer-social pt-4'>
            <h3>Now Available At</h3>
            <div style={{ display: 'flex', margin: '20px 0', flexDirection: 'column', gap: '10px' }}>
                <div className='align-items-center'>
                    <div className='d-flex my-2'>
                        <a href='https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622&custom_back=true' target='_blank' rel="noreferrer" ><OptimizedImage src='/images/available-on/swiggy-instamart.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" /></a>
                        {/* <a href='https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true' target='_blank' rel="noreferrer" ><OptimizedImage src='/images/available-on/blinkit.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" /></a> */}
                        <a href='https://www.amazon.in/fmc/storefront?almBrandId=ctnow' target='_blank' rel="noreferrer" ><OptimizedImage src='/images/available-on/fresh.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" /></a>
                        <a href='https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9' target='_blank' rel="noreferrer" ><OptimizedImage src='/images/available-on/zepto.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" /></a>
                        <OptimizedImage src='/images/available-on/bb.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                        <OptimizedImage src='/images/landing/nature-basket-square.png' alt="Available on" style={{ maxWidth: '50px' }} loading="lazy" />
                    </div>
                    <div className='d-flex my-2'>
                        <OptimizedImage src='/images/available-on/vijetha.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                        <OptimizedImage src='/images/available-on/qmart.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                        <OptimizedImage src='/images/available-on/spar.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                        <OptimizedImage src='/images/available-on/mk-retail.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                        <OptimizedImage src='/images/available-on/mango.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                        <OptimizedImage src='/images/landing/metro.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                        <OptimizedImage src='/images/available-on/ratnadeep.png' alt="Available on" style={{ maxWidth: '54px' }} loading="lazy" />
                    </div>
                </div>
                <div style={{ display: 'flex', margin: '15px 10px', justifyContent: 'left', gap: '10px' }}>
                    <a href='https://www.facebook.com/sneha.snackster' target='_blank' rel="noreferrer"><OptimizedImage src='../images/facebook-icon.svg' width={32} alt='facebook social icon' loading="lazy"></OptimizedImage></a>
                    <a href='https://www.twitter.com/SnehaSnackster' target='_blank' rel="noreferrer"><OptimizedImage src='../images/twitter-icon.svg' width={32} alt='twitter social icon' loading="lazy"></OptimizedImage></a>
                    <a href='https://www.instagram.com/sneha.snackster' target='_blank' rel="noreferrer"><OptimizedImage src='../images/instagram-icon.svg' width={32} alt='instagram social icon' loading="lazy"></OptimizedImage></a>
                    <a href='https://www.youtube.com/@sneha.snackster' target='_blank' rel="noreferrer"><OptimizedImage src='../images/youtube-icon.svg' width={32} alt='youtube social icon' loading="lazy"></OptimizedImage></a>
                </div>
            </div>
        </div>
    );
};

export default SocialIcons;
