import React from "react";

export default function ChristmasHero() {
  return (
    <section className="christmas-hero-section pt-5 py-md-0">
        <div className="h-100 d-none d-md-block">
            <img src="/images/snckster_christmas_banners-desk.jpg" alt="Christmas Hero" className="w-100 h-100 object-fit-cover" loading="lazy" />
        </div>
        <div className="d-block d-md-none">
            <img src="/images/snckster_christmas_banners-mobile.jpg" alt="Christmas Hero" className="w-100" loading="lazy" />
        </div>
    </section>
  );
}