import React from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from './socalIcons';

const Footer = () => {
  return (
    <footer className="footer bg-pink text-white">
      <div className="container py-4">
        <center>
          <img src="../images/snackster_footer_logo.svg" className="my-5" width={420} alt="Snackster Logo" loading="lazy" />
        </center>
        <div className="row align-items-center">
          <div className="col-md-5">
          <Link to="/"><h4 className="footer-title">HOME</h4></Link>
          <Link to="/about"><h4 className="footer-title">About</h4></Link>
          <Link to="/products"><h4 className="footer-title">PRODUCTS</h4></Link>
          <Link to="/recipes"><h4 className="footer-title">Recipes</h4></Link>
          <Link to="/blogs"><h4 className="footer-title">Blogs</h4></Link>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6 text-center">
            <center><SocialIcons /></center>
          </div>
        </div>
      </div>
      <div className="row pb-4 text-center bg-white">
        <div className="col-12">
          <p className="mt-4 mb-0 text-black">&copy; ALL RIGHTS RESERVED TO SNEHA GROUP.</p>
        </div>
      </div>
  
    </footer>
  );
};

export default Footer;
