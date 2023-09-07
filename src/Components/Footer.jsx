import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/Task/css/Footer.css';

const Footer = () => {
  return (
<footer className="footer text-center">
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-sm-6 my-4">
        <div className="footer-links">
          <h4>Company</h4>
          <ul className="my-list list-unstyled"> 
          <li><Link to="/AboutUs" target="_blank">About Us</Link></li>
            <li><Link to="/contact" target="_blank">Contact</Link></li>
            <li><a href="/error404" target="_blank">Privacy Policy</a></li>
            <li><a href="/error404" target="_blank">Affiliate</a></li>
          </ul>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 my-4">
        <div className="footer-links">
          <h4>Help</h4>
          <ul className="my-list list-unstyled"> {/* Agrega "list-unstyled" para eliminar los estilos de lista */}
            <li><a href="/error404" target="_blank">FAQ</a></li>
            <li><a href="/error404" target="_blank">Help Center</a></li>
            <li><a href="/error404" target="_blank">Legal Notices</a></li>
            <li><a href="/error404" target="_blank">Corporate Information</a></li>
          </ul>
        </div>
      </div>
      <div className="col-md-4">
        <div className="footer-links Follows-icons my-4">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <div className="social-link my-list">
              <a href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></a>
              <a href="https://twitter.com/?lang=en" target="_blank"><i className="fab fa-twitter"></i></a>
              <a href="https://www.youtube.com" target="_blank"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p className="fs-6 text-center">&copy; 2023 - All Rights Reserved.</p>
</footer>

  );
};

export default Footer;
