import React from 'react';
import Notice from './header/Notice';
import Nav from './header/Nav';

const Header: React.FC = () => {
  return (
    <header className=" relative z-10 sticky top-0" style={{ top: '-37px' }}>
      <Notice />
      <Nav />
    </header>
  );
};
export default Header;
