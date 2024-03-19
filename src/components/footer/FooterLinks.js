import React from 'react';
import "./FooterLinks.scss";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import logoImg from "../../assets/shopito_logo.png";
import styles from "./Header.module.scss";

const FooterLinks = () => {
  return (
    <>
       <section className='contact-section'>
        <div className='container contact'>
            <div className='contact-icon'>
                <FaFacebook className="i" />
                <FaTwitter className="i" />
                <FaInstagram className="i" />
                <FaYoutube className="i" />
                <FaWhatsapp className="i" />
            </div>
            <h2>Let's Talk?</h2>
            <a href="#home" className='btn btn-dark'>Make an enquiry!</a>
        </div>
       </section>

       <section className='footer-section'>
        <div className='container footer'>
            <div className='footer-logo'>
            <h2>
                Shop<span>Mpya</span>
            </h2>
            </div>

            <div className='footer-menu'>
                <p className='link-heading'>
                    Features
                </p>
                <ul className='nav-ul footer-links'>
                    <li>
                        <a href='#home'>Link Shortening</a>
                    </li>
                    <li>
                        <a href='#home'>Branded Links</a>
                    </li>
                    <li>
                        <a href='#home'>Analytics</a>
                    </li>
                    <li>
                        <a href='#home'>Blog</a>
                    </li>
                </ul>
            </div>

            <div className='footer-menu'>
                <p className='link-heading'>
                    Resources
                </p>
                <ul className='nav-ul footer-links'>
                    <li>
                        <a href='#home'>Blog</a>
                    </li>
                    <li>
                        <a href='#home'>Developer</a>
                    </li>
                    <li>
                        <a href='#home'>Support</a>
                    </li>
                    <li>
                        <a href='#home'>Docs</a>
                    </li>
                </ul>
            </div>

            <div className='footer-menu'>
                <p className='link-heading'>
                    Company
                </p>
                <ul className='nav-ul footer-links'>
                    <li>
                        <a href='#home'>About</a>
                    </li>
                    <li>
                        <a href='#home'>Our Team</a>
                    </li>
                    <li>
                        <a href='#home'>Career</a>
                    </li>
                    <li>
                        <a href='#home'>Contact</a>
                    </li>
                </ul>
            </div>

            <div className='footer-menu'>
                <p className='link-heading'>
                    Partners
                </p>
                <ul className='nav-ul footer-links'>
                    <li>
                        <a href='#home'>About</a>
                    </li>
                    <li>
                        <a href='#home'>Our Team</a>
                    </li>
                    <li>
                        <a href='#home'>Career</a>
                    </li>
                    <li>
                        <a href='#home'>Contact</a>
                    </li>
                </ul>
            </div>

        </div>
       </section>
    </>
  )
}

export default FooterLinks