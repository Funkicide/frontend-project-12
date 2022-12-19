import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100 bg-light">
      <Header />
      <Outlet />
    </div>
  </div>
);

export default App;
