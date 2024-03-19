import React from 'react';
import CartForm from './components/CartForm';
import CartList from './components/CartList';

function Cart() {
  return (
    <>
      <div className="mt-14 flex flex-col justify-center w-full items-center">
        <h2>장바구니</h2>
      </div>
      {/* <CartForm />; */}
      <CartList />
    </>
  );
}

export default Cart;
