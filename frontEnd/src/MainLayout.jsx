import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from '../src/components/footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
