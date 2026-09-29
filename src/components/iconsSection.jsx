import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const preloadImages = (urls) => {
    urls.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.loading = 'lazy'; // Added for native lazy-loading
    });
};

const IconGrid = () => {
    useEffect(() => {
        preloadImages([
            'images/breaded_icon_hover.svg',
            'images/coldcuts_icon_hover.svg',
            'images/wholemuscle_icon_hover.svg',
            'images/wrapped_icon_hover.svg'
        ]);
    }, []);

    return (
        <div className="bg-blue py-5" id='party'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3 col-6'>
                        <Link to="/collections/crunchy-bites-range"> <div className="icon-container breaded">
                            <center><div className="icon"></div></center>
                            <div className="icon-text text-center">Crunchy <br/>bites range</div>
                        </div></Link>
                    </div>
                    <div className='col-md-3 col-6'>
                        <Link to="/collections/hot-dog-wala-range"> <div className="icon-container coldcuts">
                            <center><div className="icon"></div></center>
                            <div className="icon-text text-center">Hot dog<br/> wala range</div>
                        </div></Link>
                    </div>
                    <div className='col-md-3 col-6'>
                        <Link to="/collections/kebab-da-range"><div className="icon-container wholemuscle">
                            <center><div className="icon"></div></center>
                            <div className="icon-text text-center">kebab da<br/> range</div>
                        </div></Link>
                    </div>
                    <div className='col-md-3 col-6'>
                        <Link to="/collections/wrap-star-range"> <div className="icon-container wrapped">
                            <center><div className="icon"></div></center>
                            <div className="icon-text text-center">Wrap star<br/> range</div>
                        </div></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IconGrid;
