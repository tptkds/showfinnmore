'use client';
import React, { useEffect, useState } from 'react';
import CartSummary from './components/CartSummary';
import PurchaseButton1 from './components/PurchaseButton1';
import CartList1 from './components/CartList1';
import useStore from '@/hooks/useStore';
import ProductListNavigator from './components/ProductListNavigator';

const Cart: React.FC = () => {
  const { cartItems } = useStore();
  const [isCheckedItems, setIsCheckedItems] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const cartItemsIds = Object.keys(cartItems);
    let newIsCheckedItems = cartItemsIds.reduce((prev, cur) => {
      return { ...prev, [cur]: true };
    }, {});
    setIsCheckedItems(newIsCheckedItems);
  }, [cartItems]);

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
              <CartList1
                cartItems={cartItems}
                isCheckedItems={isCheckedItems}
                setIsCheckedItems={setIsCheckedItems}
              />
            </div>
            <div className="md:w-4/12 ">
              <CartSummary
                cartItems={cartItems}
                isCheckedItems={isCheckedItems}
              />

              <PurchaseButton1 cartItemCount={Object.keys(cartItems).length} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
