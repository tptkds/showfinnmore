'use client';
import React from 'react';
import CartSummary from './components/CartSummary';
import PurchaseButton from './components/PurchaseButton';
import CartList from './components/CartList';
import useStore from '@/hooks/useStore';
import ProductListNavigator from './components/ProductListNavigator';

const Cart: React.FC = () => {
  const { cartItems } = useStore();

  return (
    <>
      <h2 className="visually-hidden">장바구니</h2>
      <div className="flex flex-col md:flex-row md:justify-between">
        {Object.keys(cartItems).length === 0 ? (
          <div className="w-full flex justify-center mt-16">
            <ProductListNavigator />
          </div>
        ) : (
          <>
            <div className="md:w-7/12">
              <CartList cartItems={cartItems} />
            </div>
            <div className="md:w-4/12 ">
              <div className="md:sticky md:top-24">
                {' '}
                <CartSummary cartItems={cartItems} />
                <PurchaseButton cartItemCount={Object.keys(cartItems).length} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
