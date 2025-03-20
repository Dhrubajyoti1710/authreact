import React from 'react';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{
      backgroundColor: "#222",
      color: "#fff",
      padding: "20px 0",
      textAlign: "center",
      marginTop: "30px"
    }}>
      <div className="footer-content" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px"
      }}>
        <div className="footer-links" style={{
          display: "flex",
          gap: "15px"
        }}>
          <a href="/" style={{ color: "#fff", textDecoration: "none", fontSize: "16px" }}>Home</a>
          <a href="/about" style={{ color: "#fff", textDecoration: "none", fontSize: "16px" }}>About</a>
          <a href="/services" style={{ color: "#fff", textDecoration: "none", fontSize: "16px" }}>Services</a>
          <a href="/contact" style={{ color: "#fff", textDecoration: "none", fontSize: "16px" }}>Contact</a>
        </div>
        <div className="footer-social" style={{
          display: "flex",
          gap: "10px"
        }}>
          <a href="https://twitter.com/yourcompany" target="_blank" rel="noopener noreferrer" style={{ color: "#1DA1F2", fontSize: "20px" }}>
            <FaTwitter />
          </a>
          <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer" style={{ color: "#0A66C2", fontSize: "20px" }}>
            <FaLinkedin />
          </a>
        </div>
      </div>
      <p className="footer-copyright" style={{ marginTop: "10px", fontSize: "14px" }}>© {currentYear} Subhomoy</p>
    </footer>
  );
};

export default Footer;
