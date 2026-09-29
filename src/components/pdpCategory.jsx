import React from 'react';
import Slider from 'react-slick';
import OptimizedImage from './OptimizedImage';

const categories = [
    { name: 'All Products', image: '/images/Classic_Chicken_Nuggets.png', link: '/products' },
    { name: 'CRUNCHY BITES RANGE', image: '../images/product-categories/breaded.png', link: '/collections/crunchy-bites-range' },
    { name: 'WRAP STAR RANGE', image: '../images/product-categories/wrapped.png', link: '/collections/wrap-star-range' },
    { name: 'KEBAB DA RANGE', image: '../images/product-categories/whole-muscle.png', link: '/collections/kebab-da-range' },
    { name: 'HOT DOG WALA RANGE', image: '../images/product-categories/cold-cuts.png', link: '/collections/hot-dog-wala-range' },
];

const CategoryComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        centerMode: true,
        centerPadding: '10%',
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 470,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
        ],
    };

    return (
        <div className="bg-yellow py-5 text-center mb-5">
            <div className="container">
                <h2 className="py-4 category-heading">Explore All Categories</h2>
            </div>
            <div className="d-none d-md-block">
                <div className="row align-items-end mt-4">
                    {categories.map((category, index) => (
                        <div className="col" key={index}>
                            <a href={category.link}>
                                <div className="category-card text-center">
                                    <OptimizedImage
                                        src={category.image}
                                        alt={category.name}
                                        width={category.image.includes('wrapped.png') ? 410 : 210}
                                        className="img-fluid"
                                        loading="lazy"
                                        responsive={true}
                                    />
                                    <p>{category.name}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-block d-md-none">
                <Slider {...settings}>
                    {categories.map((category, index) => (
                        <div key={index}>
                            <a href={category.link}>
                                <center>
                                    <div className="category-card">
                                        <OptimizedImage
                                            src={category.image}
                                            alt={category.name}
                                            width={category.image.includes('wrapped.png') ? 410 : 270}
                                            className="img-fluid"
                                            loading="lazy"
                                            responsive={true}

                                            style={{
                                                paddingTop: category.image.includes('wrapped.png') ? '115px' : '0',
                                            }}
                                        />
                                        <p>{category.name}</p>
                                    </div>
                                </center>
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CategoryComponent;
