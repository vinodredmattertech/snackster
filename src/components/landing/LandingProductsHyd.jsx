import React, { useState } from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function LandingProductsHyd() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const shopAtImages = [
        // { name: "Blinkit", image: "../../images/landing/blinkit.png", alt: "blinkit", mobileImage: "../../images/landing/blinkit-mob.png" },
        { name: "Swiggy Instamart", image: "../../images/landing/instamart-mob.png", alt: "instamart", mobileImage: "../../images/landing/instamart-mob.png" },
        // { name: "Amazon Fresh", image: "../../images/landing/fresh.png", alt: "amazon fresh", mobileImage: "../../images/landing/fresh-mob.png" },
        { name: "Big Basket", image: "../../images/landing/bb.png", alt: "big basket", mobileImage: "../../images/landing/bigbasket-mob.png" },
        { name: "Zepto", image: "../../images/landing/zepto-1.png", alt: "big basket", mobileImage: "../../images/landing/zepto-mob.png" },
    ];

    const products = [
        {
            id: 1,
            name: "CLASSIC<br/>CHICKEN NUGGETS",
            image: "../../images/landing/Classic-Chicken-Nuggets.png",
            alt: "Classic Chicken Nuggets",
            shopAt: [
                 { name: "Swiggy Instamart", link: "https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622", className: "swiggy-hyd" },
                { name: "Zepto", link: "https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9", className: "zepto-hyd" },
                // { name: "Blinkit", link: "https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true", className: "blinkit-hyd" },
                // { name: "Amazon Fresh", link: "#", className: "amazon-fresh" },
                { name: "Big Basket", link: "https://www.bigbasket.com/", className: "big-basket" },
                { name: "More", link: "#", className: "more-hyd" },
            ],
        },
        {
            id: 2,
            name: "CHICKEN<br/>POPCORN",
            image: "../../images/landing/Chicken-Popcorn.png",
            alt: "Chicken Popcorn",
            shopAt: [
                { name: "Swiggy Instamart", link: "https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622", className: "swiggy-hyd" },
                { name: "Zepto", link: "https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9", className: "zepto-hyd" },
                // { name: "Blinkit", link: "https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true", className: "blinkit-hyd" },
                
                // { name: "Amazon Fresh", link: "#", className: "amazon-fresh" },
                { name: "Big Basket", link: "https://www.bigbasket.com/", className: "big-basket" },
                { name: "More", link: "#", className: "more-hyd" },
            ],
        },
        {
            id: 3,
            name: "CHICKEN<br/>FINGERS",
            image: "../../images/landing/Chicken-Fingers.png",
            alt: "Chicken Fingers",
            shopAt: [
                { name: "Swiggy Instamart", link: "https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622", className: "swiggy-hyd" },
                { name: "Zepto", link: "https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9", className: "zepto-hyd" },
                // { name: "Blinkit", link: "https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true", className: "blinkit-hyd" },
                
                // { name: "Amazon Fresh", link: "#", className: "amazon-fresh" },
                { name: "Big Basket", link: "https://www.bigbasket.com/", className: "big-basket" },
                { name: "More", link: "#", className: "more-hyd" },
            ],
        },
        {
            id: 4,
            name: "CHICKEN BURGER<br/>PATTY JUMBO",
            image: "../../images/landing/Chicken-Burger-Patty-Jumbo.png",
            alt: "Chicken Burger Patty Jumbo",
            shopAt: [
                { name: "Swiggy Instamart", link: "https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622", className: "swiggy-hyd" },
                { name: "Zepto", link: "https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9", className: "zepto-hyd" },
                // { name: "Blinkit", link: "https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true", className: "blinkit-hyd" },
                // { name: "Amazon Fresh", link: "#", className: "amazon-fresh" },
                { name: "Big Basket", link: "https://www.bigbasket.com/", className: "big-basket" },
                { name: "More", link: "#", className: "more-hyd" },
            ],
        },
        {
            id: 5,
            name: "CHICKEN<br/>BURGER PATTY",
            image: "../../images/landing/Chicken-Burger-Patty.png",
            alt: "Chicken Burger Patty",
            shopAt: [
                { name: "Swiggy Instamart", link: "https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622", className: "swiggy-hyd" },
                { name: "Zepto", link: "https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9", className: "zepto-hyd" },
                // { name: "Blinkit", link: "https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true", className: "blinkit-hyd" },
                // { name: "Amazon Fresh", link: "#", className: "amazon-fresh" },
                { name: "Big Basket", link: "https://www.bigbasket.com/", className: "big-basket" },
                { name: "More", link: "#", className: "more-hyd" },
            ],
        },
        {
            id: 6,
            name: "CHICKEN<br/>BREAKFAST SAUSAGE",
            image: "../../images/landing/Chicken-Breakfast-Sausage.png",
            alt: "Chicken Breakfast Sausage",
            shopAt: [
                { name: "Swiggy Instamart", link: "https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622", className: "swiggy-hyd" },
                { name: "Zepto", link: "https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9", className: "zepto-hyd" },
                // { name: "Blinkit", link: "https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true", className: "blinkit-hyd" },
                // { name: "Amazon Fresh", link: "#", className: "amazon-fresh" },
                { name: "Big Basket", link: "https://www.bigbasket.com/", className: "big-basket" }, 
                { name: "More", link: "#", className: "more-hyd" },
            ],
        },
        {
            id: 7,
            name: "CHICKEN<br/>COCKTAIL SAUSAGE",
            image: "../../images/landing/Chicken-Cocktail-Sausage.png",
            alt: "Chicken Cocktail Sausage",
            shopAt: [
                { name: "Swiggy Instamart", link: "https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622", className: "swiggy-hyd" },
                { name: "Zepto", link: "https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9", className: "zepto-hyd" },
                // { name: "Blinkit", link: "https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true", className: "blinkit-hyd" },
                // { name: "Amazon Fresh", link: "#", className: "amazon-fresh" },
                { name: "Big Basket", link: "https://www.bigbasket.com/", className: "big-basket" },
                { name: "More", link: "#", className: "more-hyd" },
            ],
        },
        {
            id: 8,
            name: "CHICKEN<br/>SEEKH KEBAB",
            image: "../../images/landing/Classic-Seekh-Kebab.png",
            alt: "Chicken Seekh Kebab",
            shopAt: [
                { name: "Swiggy Instamart", link: "https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622", className: "swiggy-hyd" },
                { name: "Zepto", link: "https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9", className: "zepto-hyd" },
                // { name: "Blinkit", link: "https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true", className: "blinkit-hyd" },  
                // { name: "Amazon Fresh", link: "#", className: "amazon-fresh" },
                { name: "Big Basket", link: "https://www.bigbasket.com/", className: "big-basket" },
                { name: "More", link: "#", className: "more-hyd" },
            ],
        },
        {
            id: 9,
            name: "CHICKEN<br/>SAMOSA",
            image: "../../images/landing/Chicken-Samosa.png",
            alt: "Chicken Samosa",
            shopAt: [
                { name: "Swiggy Instamart", link: "https://www.swiggy.com/stores/instamart/collection-listing?collectionId=142622", className: "swiggy-hyd" },
                    { name: "Zepto", link: "https://www.zeptonow.com/DeepLink?id=a323a264-06de-46ef-b495-515bc96904e9", className: "zepto-hyd" },
                // { name: "Blinkit", link: "https://blinkit.onelink.me/z75u/foeppwid?af_force_deeplink=true", className: "blinkit-hyd" },      
                // { name: "Amazon Fresh", link: "#", className: "amazon-fresh" },
                { name: "Big Basket", link: "https://www.bigbasket.com/", className: "big-basket" },
                { name: "More", link: "#", className: "more-hyd" },
            ],
        },

    ];

    const handleOpenModal = (product) => {
        setIsOpen(true);
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <section className="landing-product-list">
                <div className="container pt-5">
                    <div className="row align-items-end">
                        {products.map((product) => (
                            <div key={product.id} className="col-md-4 col-6">
                                <div className="landing-prodcard text-center">
                                    <img src={product.image} width="155" height="230" alt={product.alt} />
                                    <div className="prod-titlecard">
                                        <h3 dangerouslySetInnerHTML={{ __html: product.name }}></h3>
                                        <button className="btn btn-land">SHOP NOW AT</button>
                                        <div className="prod-shopat">
                                            {product.shopAt.map((shop, index) => (
                                                shop.name === "Swiggy Instamart" ? (
                                                    <a key={shop.name} href={shop.link} target="_blank" rel="noreferrer" className={`w-100 d-md-block ${shop.className}`}>
                                                        <img src={shopAtImages.find((image) => image.name === shop.name).image} alt={shop.name} />
                                                    </a>
                                                ) : (
                                                    shop.name === "More" ? (
                                                        <button key={shop.name} className={`d-md-none ${shop.className}`} onClick={() => handleOpenModal(product)} style={{ background: 'none', border: 'none', fontWeight: '600', color: '#FFCD00' }}>+ 3 more</button>
                                                    ) : (
                                                        <a key={shop.name} href={shop.link}  rel="noreferrer" className={`more-image d-none d-md-block ${shop.className}`}>
                                                            <img src={shopAtImages.find((image) => image.name === shop.name).image} alt={shop.name} />
                                                        </a>
                                                    )
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => handleCloseModal()}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000,
                    },
                    content: {
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'transparent',
                        padding: '20px',
                        border: 'none',
                        borderRadius: '10px',
                        overflow: 'none',
                        // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                        zIndex: 1001,
                        width: '100%', 
                        height: 'auto',
                    },
                }}
            >
                {selectedProduct && (
                    <div className="modal-content">
                        <div className="landing-product-list">
                            <button className="close-modal-btn" onClick={() => handleCloseModal()}>X</button>
                            <div className="landing-prodcard text-center">
                                <img src={selectedProduct.image} width="155" height="230" alt={selectedProduct.alt} />
                                <div className="prod-titlecard">
                                    <h3 dangerouslySetInnerHTML={{ __html: selectedProduct.name }}></h3>
                                    <button className="btn btn-land">SHOP NOW AT</button>
                                    <div className="prod-shopat">
                                        {selectedProduct.shopAt.filter(shop => shop.name !== "More").map((shop) => (
                                            <a key={shop.name} href={shop.link} className={shop.className} rel="noreferrer">
                                                <img src={shopAtImages.find((image) => image.name === shop.name).mobileImage ? shopAtImages.find((image) => image.name === shop.name).mobileImage : shopAtImages.find((image) => image.name === shop.name).image} alt={shop.name} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            
        </>
    );
}
