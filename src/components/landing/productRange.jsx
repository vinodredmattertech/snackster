import React from "react";
import { useLocation } from "react-router-dom";

export default function LandProductRange() {
    const location = useLocation();

    // Define visibility rules based on the route
    const isHyderabad = location.pathname === "/party-snacks-hyderabad";
    const isBangalore = location.pathname === "/party-snacks-bangalore";
    const isMumbai = location.pathname === "/party-snacks-mumbai";

    return (
        <>
            <section className="product-range">
                <div className="container text-center">
                    <div className="range-card">
                        <img
                            src="../images/landing/product-range.png"
                            className="w-100"
                            alt="Product Range"
                        />
                        <div className="pt-4">
                            <span className="btn-land my-5">SHOP OUR RANGE OF PRODUCTS AT</span>
                            <div className="store-fronts mt-3 gap-2">
                            {isHyderabad && (
                                <>
                                 <img
                                    src="../images/landing/swiggy-instamart.png"
                                    alt="Swiggy Instamart"
                                />
                                {/* <img
                                    src="../images/landing/blinkit-1.png"
                                    alt="Blinkit"
                                /> */}
                                {/* <img
                                    src="../images/landing/fresh.png"
                                    alt="Fresh"
                                /> */}
                                {/* <img
                                    src="../images/landing/bb.png"
                                    alt="BigBasket"
                                /> */}
                                <img
                                    src="../images/landing/zepto.png"
                                    alt="Zepto"
                                />
                                 <img
                                    src="../images/landing/bb.png"
                                    alt="Big Basket"
                                />
                                </>
                                 )}
                                {isBangalore && (
                                    <>
                                    <img
                                    src="../images/landing/swiggy-instamart.png"
                                    alt="Swiggy Instamart"
                                />
                                <img
                                    src="../images/landing/blinkit-1.png"
                                    alt="Blinkit"
                                />
                                <img
                                    src="../images/landing/fresh.png"
                                    alt="Fresh"
                                />
                                <img
                                    src="../images/landing/bb.png"
                                    alt="BigBasket"
                                />
                                <img
                                    src="../images/landing/zepto.png"
                                    alt="Zepto"
                                />
                                    </>
                                )}
                                {isMumbai && (
                                    <>
                                    <img
                                    src="../images/landing/swiggy-instamart.png"
                                    alt="Swiggy Instamart"
                                />
                                {/* <img
                                    src="../images/landing/blinkit-1.png"
                                    alt="Blinkit"
                                /> */}
                                <img
                                    src="../images/landing/fresh.png"
                                    alt="Fresh"
                                />
                                <img
                                    src="../images/landing/bb.png"
                                    alt="BigBasket"
                                />
                                {/* <img
                                    src="../images/landing/zepto.png"
                                    alt="Zepto"
                                /> */}
                                    
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="pt-4">
                            <span className="btn-land offline my-5">Also Available At</span>
                            <div className="store-fronts mt-3 gap-2">
                                {/* Hyderabad Route */}
                                {isHyderabad && (
                                    <>
                                        <img
                                            src="../images/landing/vijetha.png"
                                            alt="Vijetha"
                                        />
                                        <img
                                            src="../images/landing/spar.png"
                                            alt="Spar"
                                        />
                                        <img
                                            src="../images/landing/qmart.png"
                                            alt="Qmart"
                                        />
                                        <img
                                            src="../images/landing/metro.png"
                                            alt="Metro"
                                        />
                                        <img
                                            src="../images/available-on/ratnadeep.png"
                                            alt="Ratnadeep"
                                        />
                                    </>
                                )}

                                {/* Bangalore Route */}
                                {isBangalore && (
                                    <>
                                        <img
                                            src="../images/landing/mk-retail.png"
                                            alt="MK Retail"
                                        />
                                        <img
                                            src="../images/landing/spar.png"
                                            alt="Spar"
                                        />
                                        <img
                                            src="../images/landing/mango.png"
                                            alt="Mango"
                                        />
                                        <img
                                            src="../images/landing/metro.png"
                                            alt="Metro"
                                        />
                                    </>
                                )}

                                {isMumbai && (
                                    <>
                                        {/* <img
                                            src="../images/landing/mk-retail.png"
                                            alt="MK Retail"
                                        />
                                        <img
                                            src="../images/landing/spar.png"
                                            alt="Spar"
                                        />
                                        <img
                                            src="../images/landing/mango.png"
                                            alt="Mango"
                                        /> */}
                                        <img
                                        src="../images/landing/nature-basket-square.png"
                                        alt="Nature's Basket" width={100} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
