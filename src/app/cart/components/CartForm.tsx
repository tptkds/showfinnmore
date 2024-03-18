'use client';
import { AuthContext } from '@/app/AuthProvider';
import { db } from '@/app/firebaseConfig';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setCartItems } from '@/slices/productSlict';
import { CartItems } from '@/types/globalTypes';
import {
  deleteCartItemsLocalStorage,
  getCartItemsLocalStorage,
  setCartItemsLocalStorage,
} from '@/utilities/localstorage';
import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
interface CheckBoxes {
  [key: string]: boolean;
}

function CartForm() {
  const dispatch = useDispatch();
  const [checkBoxes, setCheckBoxes] = useState<CheckBoxes>({});
  const [checkAllBox, setCheckAllBox] = useState<boolean>(false);
  const { currentUser } = useContext(AuthContext);
  const cartItems: CartItems = useAppSelector(
    (state) => state.product.cartItems
  );

  let cartItemKeys: string[] = cartItems && Object.keys(cartItems);
  useEffect(() => {
    let checkBoxesData: { [key: string]: boolean } = {};
    Object.keys(cartItems).forEach((key) => {
      checkBoxesData[key] = true;
    });
    setCheckBoxes(checkBoxesData);
    setCheckAllBox(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    if (target.name === 'all') {
      const newCheckAllBox = !checkAllBox;
      const newCheckBoxes: CheckBoxes = {};

      cartItemKeys.forEach((key) => (newCheckBoxes[key] = newCheckAllBox));
      setCheckBoxes(newCheckBoxes);
      setCheckAllBox(newCheckAllBox);
    } else {
      const newCheckBoxes = {
        ...checkBoxes,
        [target.name]: !checkBoxes[target.name],
      };
      setCheckBoxes(newCheckBoxes);
      // setCheckBoxes((prevCheckBoxes) => ({
      //   ...prevCheckBoxes,
      //   [target.name]: !prevCheckBoxes[target.name],
      // }));
      if (
        Object.keys(newCheckBoxes).filter((key) => !newCheckBoxes[key]).length >
        0
      )
        setCheckAllBox(false);
      else setCheckAllBox(true);
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string | null = null
  ) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    let newItems = { ...cartItems };

    if (target?.name === 'deleteMany') {
      const keys: string[] = Object.keys(checkBoxes).filter(
        (key) => checkBoxes[key]
      );
      if (currentUser) {
        let newCartItems: CartItems = {
          ...cartItems,
        };
        keys.forEach((key) => {
          delete newCartItems[key];
        });
        newItems = newCartItems;
        let userRef = null;
        if (currentUser?.email) userRef = doc(db, 'users', currentUser?.email);
        if (userRef)
          updateDoc(userRef, {
            cartItems: newCartItems,
          });
        let checkBoxesData: { [key: string]: boolean } = {};
        Object.keys(newCartItems).forEach((key) => {
          checkBoxesData[key] = true;
        });
        setCheckBoxes(checkBoxesData);
        setCheckAllBox(true);

        dispatch(setCartItems(newItems));
        console.log(checkBoxes);
      } else {
        deleteCartItemsLocalStorage(keys);
        newItems = getCartItemsLocalStorage();
        dispatch(setCartItems(newItems));
        let checkBoxesData: { [key: string]: boolean } = {};
        Object.keys(newItems).forEach((key) => {
          checkBoxesData[key] = true;
        });
        setCheckBoxes(checkBoxesData);
        setCheckAllBox(true);
      }
    } else if (target?.name === 'deleteOne') {
      if (currentUser) {
        let newCartItems: CartItems = {
          ...cartItems,
        };
        delete newCartItems[target.id];
        newItems = newCartItems;
        let userRef = null;
        if (currentUser?.email) userRef = doc(db, 'users', currentUser?.email);
        if (userRef)
          updateDoc(userRef, {
            cartItems: newCartItems,
          });
        let checkBoxesData: { [key: string]: boolean } = {};
        Object.keys(newCartItems).forEach((key) => {
          checkBoxesData[key] = true;
        });
        setCheckBoxes(checkBoxesData);
        setCheckAllBox(true);

        dispatch(setCartItems(newItems));
      } else {
        deleteCartItemsLocalStorage([target.id]);
        newItems = getCartItemsLocalStorage();
        dispatch(setCartItems(newItems));
        let checkBoxesData: { [key: string]: boolean } = {};
        Object.keys(newItems).forEach((key) => {
          checkBoxesData[key] = true;
        });
        setCheckBoxes(checkBoxesData);
        setCheckAllBox(true);
      }
    } else {
      return;
    }
  };

  const decrement = (e: any, key: string) => {
    if (key) {
      if (cartItems[key].count - 1 < 1) return;
      const newItem = {
        [key]: {
          product: cartItems[key].product,
          count: cartItems[key].count - 1,
        },
      };
      const newCartItems = { ...cartItems, ...newItem };
      const newItems = newCartItems;
      dispatch(setCartItems(newItems));
      if (currentUser) {
        let userRef = null;
        if (currentUser?.email) userRef = doc(db, 'users', currentUser?.email);
        if (userRef)
          updateDoc(userRef, {
            cartItems: newCartItems,
          });
      } else setCartItemsLocalStorage(newCartItems);
      dispatch(setCartItems(newItems));
    }
  };
  const increment = (e: any, key: string) => {
    setCheckAllBox(true);
    if (key) {
      const newItem = {
        [key]: {
          product: cartItems[key].product,
          count: cartItems[key].count + 1,
        },
      };
      const newCartItems = { ...cartItems, ...newItem };
      const newItems = newCartItems;

      if (currentUser) {
        let userRef = null;
        if (currentUser?.email) userRef = doc(db, 'users', currentUser?.email);
        if (userRef)
          updateDoc(userRef, {
            cartItems: newCartItems,
          });
      } else setCartItemsLocalStorage(newCartItems);
      dispatch(setCartItems(newItems));
    }
  };

  return (
    <>
      <div className="mt-14 flex flex-col justify-center w-full items-center">
        <h2>장바구니</h2>
      </div>
      <div>
        <form action="">
          <ul className="flex flex-col">
            <li className="my-4   sm-max-textsize-12 hidden md:flex">
              <input
                type="checkbox"
                className="mr-4"
                onChange={handleChange}
                name="all"
                checked={checkAllBox}
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
              cartItemKeys.map((v) => {
                return (
                  <li key={v} className="my-4  items-center  flex flex-row">
                    <input
                      name={v}
                      type="checkbox"
                      className="mr-4 flex "
                      onChange={handleChange}
                      checked={checkBoxes[v] || false}
                    />
                    <div className="relative  flex items-start h-44 md:h-24  w-6/12 md:w-2/12 mx-4 bg-white">
                      <Link
                        href={`/product/detail/${cartItems[v].product.id}`}
                        className="h-full"
                      >
                        <Image
                          src={cartItems[v].product.image}
                          alt={cartItems[v].product.title}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                          style={{
                            objectFit: 'contain',
                            minWidth: '56px',
                          }}
                          priority
                        />
                      </Link>
                    </div>
                    <div className="w-full flex  sm-max-textsize-12 flex-col md:flex-row">
                      <div className="w-full md:w-1/5 whitespace-pre-line=true flex items-center md:w-1/4 overflow-hidden">
                        <Link
                          href={`/product/detail/${cartItems[v].product.id}`}
                          className="min-w-16 max-h-24 "
                        >
                          {cartItems[v].product.title}
                        </Link>
                      </div>
                      <div className="mt-4 md:mt-0 w-full md:w-1/5 whitespace-pre-line=true  flex justify-end  items-center md:w-1/4">
                        <p>${cartItems[v].product.price}</p>
                      </div>
                      <div className=" w-full md:w-1/5 whitespace-pre-line=true  flex justify-end  items-center md:w-1/4">
                        <button
                          type="button"
                          name="decrement"
                          onClick={(e) => decrement(e, v)}
                          className="p-2"
                        >
                          -
                        </button>
                        <input
                          className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                          type="text"
                          value={cartItems[v].count}
                          data-hs-input-number-input
                          readOnly
                        />
                        <button
                          type="button"
                          name="increment"
                          className="p-2"
                          onClick={(e) => increment(e, v)}
                        >
                          +
                        </button>
                      </div>
                      <div className=" w-full md:w-1/5 whitespace-pre-line=true  flex justify-end  items-center md:w-1/4">
                        <p>
                          $
                          {(
                            cartItems[v].product.price * cartItems[v].count
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className=" w-full md:w-1/5 whitespace-pre-line=true  flex justify-end  items-center md:w-1/4">
                        <button id={v} name="deleteOne" onClick={handleClick}>
                          <MdDelete style={{ fontSize: '20px' }} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-center p-14 ">장바구니가 비어 있습니다.</p>
            )}
            <li>
              <button
                name="deleteMany"
                onClick={handleClick}
                className="mt-4 bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 py-2 px-4 text-white dark:text-black text-xs rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
                disabled={cartItemKeys.length === 0}
              >
                선택 삭제
              </button>
            </li>
          </ul>
        </form>
        <div className="flex flex-col  items-end w-full text-sm">
          <div className="flex">
            <p className="text-right ">합계: </p>
            <p className="text-right  pl-2">
              $
              {Object.keys(checkBoxes)
                .filter((key: any) => checkBoxes[key] === true)
                .reduce((prev, key) => {
                  return (
                    prev +
                    cartItems[key]?.product?.price * cartItems[key]?.count
                  );
                }, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className=" flex mt-2">
            <p className="text-right ">VAT: </p>
            <p className="text-right pl-2">
              $
              {(
                Object.keys(checkBoxes)
                  .filter((key: any) => checkBoxes[key] === true)
                  .reduce((prev, key) => {
                    return (
                      prev +
                      cartItems[key]?.product?.price * cartItems[key]?.count
                    );
                  }, 0) * 0.1
              ).toFixed(2)}
            </p>
          </div>
          <div className=" mt-2 flex">
            <p className="text-right">총 합계: </p>
            <p className="text-right pl-2">
              $
              {(
                Object.keys(checkBoxes)
                  .filter((key: any) => checkBoxes[key] === true)
                  .reduce((prev, key) => {
                    return (
                      prev +
                      cartItems[key]?.product.price * cartItems[key]?.count
                    );
                  }, 0) * 1.1
              ).toFixed(2)}
            </p>
          </div>
          <div className="flex mt-8 ">
            <button
              // onClick={purchase}
              className="w-full bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartForm;
