import React from "react";
import "./FooterLinks.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoImg from "../../assets/shopito_logo.png";

const FooterLinks = () => {
  return (
    <>
      {/* Contact Section */}
      <section className="contact-section">
        <div className="container contact">
          <div className="contact-icon">
            <FaFacebookF className="i" />
            <FaTwitter className="i" />
            <FaInstagram className="i" />
            <FaYoutube className="i" />
          </div>

          <h2>Let's Talk?</h2>

          <a href="#p" className="btn btn-dark">
            Make an enquiry!
          </a>
        </div>
      </section>
      {/* Footer Links */}
      <section className="footer-section">
        <div className="container footer">
          <div className="footer-logo">
            <img src={logoImg} alt="logo" />
          </div>

          <div className="footer-menu">
            <p className="link-heading">Features</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#">Link Shortening</a>
              </li>
              <li>
                <a href="#">Branded Links</a>
              </li>
              <li>
                <a href="#">Analytics</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Resources</p>
            <ul className="nav-ul footer-links">
              Name
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Developer</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Docs</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Company</p>
            <ul>
              <ul className="nav-ul footer-links">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Our Team</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Partners</p>
            <ul>
              <ul className="nav-ul footer-links">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Our Team</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterLinks;
