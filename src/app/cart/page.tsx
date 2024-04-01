'use client';
import React, { useEffect, useState } from 'react';
import CartSummary from './CartSummary';
import PurchaseButton1 from './components/PurchaseButton1';
import CartList1 from './components/CartList1';
import useStore from '@/hooks/useStore';

const Cart: React.FC = () => {
  const { cartItems } = useStore();
  const [isCheckedItems, setIsCheckedItems] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const cartItemsIds = Object.keys(cartItems);
    let newIsCheckedItems = {};
    cartItemsIds.forEach((id) => {
      newIsCheckedItems = { ...newIsCheckedItems, [id]: true };
    });
    setIsCheckedItems(newIsCheckedItems);
  }, [cartItems]);

  return (
    <>
      <div className="mt-14 flex flex-col justify-center w-full items-center mb-8">
        <h2>장바구니</h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-4/6">
          <CartList1
            cartItems={cartItems}
            isCheckedItems={isCheckedItems}
            setIsCheckedItems={setIsCheckedItems}
          />
        </div>
        <div className="md:w-2/6">
          <CartSummary
            cartItems={cartItems}
            isCheckedItems={isCheckedItems}
            setIsCheckedItems={setIsCheckedItems}
          />
        </div>
      </div>
      <PurchaseButton1 />
    </>
  );
};

export default Cart;
