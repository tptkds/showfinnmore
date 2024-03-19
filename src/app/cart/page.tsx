import React from 'react';
import CartList from './components/CartList';

const Cart: React.FC = () => {
  return (
    <>
      <div className="mt-14 flex flex-col justify-center w-full items-center">
        <h2>장바구니</h2>
      </div>
      <CartList />
    </>
  );
};

export default Cart;
