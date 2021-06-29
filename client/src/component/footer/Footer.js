import "./Footer.css";

import React from "react";

function Footer() {
  return (
    <footer className="footer_container">
      <div className="footer_container_links">
        <p>Contact</p>
        <p>Shipping</p>
      </div>
      <div className="footer_container_icons">
        <a
          href="https://github.com/Yuchan48"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/yuchan-iizuka/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          href="mailto:yuchan.iizuka@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-envelope-open footer-mail-icon"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
