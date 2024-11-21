import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/footer/footer.css";
// import assets
import logo from "../../assets/logo.png";
export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <img src={logo} alt="" />
        <div className="footer-item">
          <strong>Links</strong>
          <Link>Shop</Link>
          <Link>Blog</Link>
          <Link>Izumiya's system</Link>
          <Link>Calculator</Link>
        </div>
        <div className="footer-item">
          <strong>Member</strong>
          <Link>Recuit</Link>
          <Link>Contact admin</Link>
        </div>
        <div className="footer-item">
          <strong>Support</strong>
          <Link>Contact support</Link>
          <Link>Report bugs</Link>
        </div>
        <div className="footer-item">
          <strong>Contact</strong>
          <p>Phone: 0921191360</p>
          <p>Email: izumiya@gmail.com</p>
          <div className="social">
            <i className="bx bxl-facebook-circle"></i>
            <i className="bx bxl-github"></i>
            <i className="bx bxl-instagram"></i>
          </div>
        </div>
      </div>
      <div className="copyright"></div>
    </div>
  );
};
