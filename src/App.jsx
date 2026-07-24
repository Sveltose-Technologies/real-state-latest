import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import RentedProperties from './pages/rented-properties';
import FAQPage from './pages/FAQPage';

// Lazy loading pages for fast loading and GlobalLoader triggering
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));
const TermsAndConditions = lazy(() => import('./pages/terms-and-conditions'));
const AppraisalRequest = lazy(() => import('./pages/appraisal-request'));
const AreaWeCover = lazy(() => import('./pages/area-we-cover'));
const AvailableForRent = lazy(() => import('./pages/available-for-rent'));
const AvailablePropertyDetails = lazy(() => import('./pages/available-property-details'));
const LandlordServices = lazy(() => import('./pages/landlord-services'));
const Maintenance = lazy(() => import('./pages/maintenance'));
const RentedPropertiesDetails = lazy(() => import('./pages/rented-properties-details'));
const PropertyManagementFees = lazy(() => import('./pages/property-management-fees'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="appraisal" element={<AppraisalRequest />} />

          {/* Landlords Links */}
          <Route path="landlords/services" element={<LandlordServices />} />
          <Route path="landlords/area" element={<AreaWeCover />} />
          <Route path="landlords/fees" element={<PropertyManagementFees />} />
          <Route path="landlords/faq" element={<FAQPage />} /> {/* Temporarily mapped to Home */}

          {/* Tenants Links */}
          <Route path="tenants/available-for-rent" element={<AvailableForRent />} />
          <Route path="tenants/rented-properties" element={<RentedProperties />} /> {/* Temporarily mapped to Home */}
          <Route path="tenants/report-maintenance" element={<Maintenance />} />
          <Route path="tenants/property-inspection-guide" element={<Home />} /> {/* Temporarily mapped to Home */}
          <Route path="tenants/move-out-property-inspection-guide" element={<Home />} /> {/* Temporarily mapped to Home */}

          {/* Other Navigation Items */}
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="properties" element={<Home />} />

          {/* Missing route fallbacks from AvailableForRent page */}
          <Route path="rented-properties" element={<RentedProperties />} />
          <Route path="available-property-details" element={<AvailablePropertyDetails />} />
          <Route path="rented-properties-details" element={<RentedPropertiesDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
