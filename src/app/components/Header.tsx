import React from 'react';
import Notice from './Notice';
import Nav from './Nav';

const Header: React.FC = () => {
  return (
    <header className=" relative z-10 overflow-x-hidden">
      <Notice />
      <Nav />
    </header>
  );
};
export default Header;
