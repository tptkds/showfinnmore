'use client';
import React from 'react';
import List from './components/List';

const WishlistComponent: React.FC = () => {
  return (
    <div className="pb-24">
      <div className="mt-14 flex flex-col justify-center w-full items-center">
        <h2>찜 리스트</h2>
      </div>
      <List />
    </div>
  );
};
export default WishlistComponent;
