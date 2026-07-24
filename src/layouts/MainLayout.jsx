import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GlobalLoader from '../components/GlobalLoader';

const MainLayout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="main-content">
        <Suspense fallback={<GlobalLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
