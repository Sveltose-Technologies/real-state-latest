import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { getLogoApi } from '../services/userService';
import { BASE_URL } from '../api/axios';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await getLogoApi();
        if (res && res.data && res.data.length > 0 && res.data[0].logo) {
          setLogoUrl(`${BASE_URL}${res.data[0].logo}`);
        }
      } catch (err) {
        console.error("Failed to load logo", err);
      }
    };
    fetchLogo();
  }, []);

  const handleMouseEnter = (dropdownName) => {
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="global-header">
      {/* Left: Logo */}
      <div className="header-left">
        <Link to="/" className="logo">
          {logoUrl ? <img src={logoUrl} alt="Logo" style={{ maxHeight: '50px' }} /> : <>Real<span>Estate</span></>}
        </Link>
      </div>

      {/* Center: Navigation */}
      <nav className="header-center">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>

        <div
          className={`nav-item has-dropdown ${location.pathname.startsWith('/landlords') ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('landlords')}
          onMouseLeave={handleMouseLeave}
        >
          <span className="dropdown-trigger">
            Landlords <ChevronDown size={16} className={`dropdown-icon ${activeDropdown === 'landlords' ? 'rotated' : ''}`} />
          </span>
          {/* Dropdown Menu */}
          <div className={`dropdown-menu ${activeDropdown === 'landlords' ? 'active' : ''}`}>
            <Link to="/landlords/services">Our Services</Link>
            <Link to="/landlords/area">Area We Cover</Link>
            <Link to="/landlords/fees">Property Management Fees</Link>
            <Link to="/landlords/faq">Frequently Asked Questions</Link>
          </div>
        </div>

        <div
          className={`nav-item has-dropdown ${location.pathname.startsWith('/tenants') ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('tenants')}
          onMouseLeave={handleMouseLeave}
        >
          <span className="dropdown-trigger">
            Tenants <ChevronDown size={16} className={`dropdown-icon ${activeDropdown === 'tenants' ? 'rotated' : ''}`} />
          </span>
          {/* Dropdown Menu */}
          <div className={`dropdown-menu ${activeDropdown === 'tenants' ? 'active' : ''}`}>
            <Link to="/tenants/available-for-rent">Available for Rent</Link>
            <Link to="/tenants/rented-properties">Rented Properties</Link>
            <a href="https://portal.bricksandagent.com/tenant/my-jobs?maintenancebot=true&orgId=ef59948d-966c-4862-9f31-e43e45989511&themeColor=#00006e" target="_blank" rel="noopener noreferrer">Report Maintenance</a>
          </div>
        </div>

        {/* <Link to="/maintenance" className="nav-item">Maintenance</Link> */}
        <Link to="/about" className={`nav-item ${location.pathname.startsWith('/about') ? 'active' : ''}`}>About Us</Link>
        <Link to="/contact" className={`nav-item ${location.pathname.startsWith('/contact') ? 'active' : ''}`}>Contact Us</Link>
      </nav>

      {/* Right: Action Buttons */}
      <div className="header-right">
        <Link to="/appraisal" className="btn btn-primary">Free Appraisal</Link>
        <a href="https://portal.getpalace.com//Account/Login?id=b3c9c61d-9c3a-4e23-9994-feca7292b9ba" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Client Login</a>
      </div>
    </header>
  );
};

export default Header;
