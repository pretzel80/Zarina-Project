import React from 'react';
import './App.scss';
import AppRoutes from './routers/AppRoutes';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

export const App = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <AppRoutes />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
