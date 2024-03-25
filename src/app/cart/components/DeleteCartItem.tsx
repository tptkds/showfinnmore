'use client';
import { db } from '@/app/firebaseConfig';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setCartItems } from '@/slices/productSlict';
import { CartItems, CheckBoxes } from '@/types/globalTypes';
import { AppDispatch } from '@/types/reduxTypes';
import {
  deleteCartItemsLocalStorage,
  getCartItemsLocalStorage,
} from '@/utilities/localstorage';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';

interface DeleteCartItemProps {
  itemKey: string;
  setCheckAllBoxes: (value: boolean) => void;
  setCheckBoxes: React.Dispatch<React.SetStateAction<CheckBoxes>>;
}
const DeleteCartItem: React.FC<DeleteCartItemProps> = ({
  itemKey,
  setCheckAllBoxes,
  setCheckBoxes,
}) => {
  const dispatch: AppDispatch = useAppDispatch();
  const currentUser = null;
  const cartItems: CartItems = useAppSelector(
    (state) => state.product.cartItems
  );
  const deleteItemInCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    let newItems = { ...cartItems };

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
      setCheckAllBoxes(true);

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
      setCheckAllBoxes(true);
    }
  };

  return (
    <button
      id={itemKey}
      onClick={deleteItemInCart}
      // className="tooltip"
      aria-label="장바구니 아이템 1개 삭제하기"
      // data-tip="Delete"
    >
      <MdDelete style={{ fontSize: '20px' }} />
    </button>
  );
};

export default DeleteCartItem;
