'use client';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CartItems, CheckBoxes } from '@/types/globalTypes';
import { useEffect, useMemo, useState } from 'react';
import CartItem from './CartItem';
import SelectedDeleteButton from './SelectedDeleteButton';
import Summary from './Summary';
import PurchaseButton from './PurchaseButton';

const CartList: React.FC = () => {
  const [checkBoxes, setCheckBoxes] = useState<{ [key: string]: boolean }>({});
  const [checkAllBoxes, setCheckAllBoxes] = useState<boolean>(true);
  const cartItems: CartItems = useAppSelector((state) => state.cart.cartItems);
  const cartItemKeys = useMemo(() => Object.keys(cartItems), [cartItems]);

  useEffect(() => {
    const initialCheckBoxes: { [key: string]: boolean } = {};
    Object.keys(cartItems).forEach((key) => {
      initialCheckBoxes[key] = true;
    });
    setCheckBoxes(initialCheckBoxes);
    setCheckAllBoxes(true);
  }, [cartItems]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    let newCheckBoxes: CheckBoxes = {};
    if (name === 'all') {
      cartItemKeys.forEach((key) => {
        newCheckBoxes[key] = checked;
      });
      setCheckAllBoxes(checked);
    } else {
      newCheckBoxes = {
        ...checkBoxes,
        [name]: checked,
      };
      const allChecked = cartItemKeys.every((key) => newCheckBoxes[key]);
      setCheckAllBoxes(allChecked);
    }
    setCheckBoxes(newCheckBoxes);
  };

  return (
    <>
      <ul className="flex flex-col">
        <li className="my-4   sm-max-textsize-12 hidden md:flex">
          <input
            type="checkbox"
            className="mr-4"
            onChange={handleCheckboxChange}
            name="all"
            checked={checkAllBoxes}
            disabled={cartItemKeys.length === 0}
          />
          <div className="w-2/12 py-8 mx-4 flex items-center">
            <p className="whitespace-pre-line=true">제품</p>
          </div>
          <div className="w-full flex items-center">
            <p className="w-1/5 whitespace-pre-line=true flex items-center md:w-1/4"></p>
            <p className=" w-1/5 whitespace-pre-line=true  flex justify-end  items-center md:w-1/4">
              가격
            </p>
            <p className=" w-1/5 whitespace-pre-line=true  flex justify-end  items-center md:w-1/4">
              수량
            </p>
            <p className=" w-1/5 whitespace-pre-line=true  flex justify-end  items-center md:w-1/4 ">
              합계
            </p>
            <p className=" w-1/5 whitespace-pre-line=true  flex justify-end  items-center md:w-1/4"></p>
          </div>
        </li>

        {cartItemKeys.length !== 0 ? (
          cartItemKeys.map((key) => {
            return (
              <CartItem
                handleCheckboxChange={handleCheckboxChange}
                itemKey={key}
                key={key}
                checkBoxes={checkBoxes}
                setCheckAllBoxes={setCheckAllBoxes}
                setCheckBoxes={setCheckBoxes}
              />
            );
          })
        ) : (
          <p className="text-center p-14 ">장바구니가 비어 있습니다.</p>
        )}
      </ul>
      <SelectedDeleteButton
        setCheckAllBoxes={setCheckAllBoxes}
        setCheckBoxes={setCheckBoxes}
        checkBoxes={checkBoxes}
        cartItemKeys={cartItemKeys}
      />
      <div className="flex flex-col  items-end w-full text-sm">
        <Summary checkBoxes={checkBoxes} />
        <PurchaseButton
          setCheckAllBoxes={setCheckAllBoxes}
          setCheckBoxes={setCheckBoxes}
          checkBoxes={checkBoxes}
        />
      </div>
    </>
  );
};

export default CartList;
