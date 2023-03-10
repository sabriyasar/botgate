import React from 'react';
import Menu from './menu';
import Header from './header';

import 'assets/scss/layouts/body.scss';

const AppLayout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <div className="body">
        <div className="menuContainer" id="menuContainer">
          <Menu />
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
