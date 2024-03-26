import React from 'react';
import Notice from './header/Notice';
import Nav from './header/Nav';

const Header: React.FC = () => {
  return (
    <header className=" relative z-10">
      <Notice />
      <Nav />
    </header>
  );
};
export default Header;
