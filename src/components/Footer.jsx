import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLogoApi, getFooterApi } from '../services/userService';
import { BASE_URL } from '../api/axios';

const Footer = () => {
  const [logoUrl, setLogoUrl] = useState('');

  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logoRes = await getLogoApi();
        if (logoRes && logoRes.data && logoRes.data.length > 0 && logoRes.data[0].logo) {
          setLogoUrl(`${BASE_URL}${logoRes.data[0].logo}`);
        }
      } catch (err) {
        console.error("Failed to load logo", err);
      }

      try {
        const footerRes = await getFooterApi();
        if (footerRes && footerRes.footer && footerRes.footer.length > 0) {
          setFooterData(footerRes.footer[0]);
        }
      } catch (err) {
        console.error("Failed to load footer data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-section">
          {logoUrl ? <img src={logoUrl} alt="Logo" style={{ maxHeight: '50px', marginBottom: '1rem' }} /> : <h3>RealEstate</h3>}
          {footerData?.content ? (
            <div 
              className="footer-about-text" 
              dangerouslySetInnerHTML={{ __html: footerData.content }} 
              style={{ wordBreak: 'break-word', overflowWrap: 'break-word', color: '#94a3b8', fontSize: '0.95rem', marginBottom: '0.75rem' }} 
            />
          ) : (
            <p>Find your dream home with us. The best properties at the most affordable prices.</p>
          )}
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Home</Link>
          {/* <Link to="/properties" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Properties</Link> */}
          <Link to="/about" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.75rem', fontSize: '0.95rem' }}>About Us</Link>
          <Link to="/contact" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Contact</Link>
          <Link to="/privacy-policy" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Privacy Policy</Link>
          <Link to="/terms-and-conditions" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Terms and Conditions</Link>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: {footerData?.email || 'info@realestate.com'}</p>
          <p>Phone: {footerData?.contactNo || '+1 (555) 123-4567'}</p>
          <p>Location: {footerData?.address || '123 Property Ave, NY'}</p>
        </div>
      </div>
      <div className="footer-bottom">
        {footerData?.copyRight || `© ${new Date().getFullYear()} RealEstate. All rights reserved.`}
      </div>
    </footer>
  );
};

export default Footer;
