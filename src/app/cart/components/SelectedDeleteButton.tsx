import { db } from '@/app/firebaseConfig';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setCartItems } from '@/slices/productSlict';
import { CartItems, CheckBoxes } from '@/types/globalTypes';
import { AppDispatch } from '@/types/reduxTypes';
import {
  deleteCartItemsLocalStorage,
  getCartItemsLocalStorage,
} from '@/utils/localstorage';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';

interface SelectedDeleteButtonProps {
  setCheckAllBoxes: (value: boolean) => void;
  setCheckBoxes: React.Dispatch<React.SetStateAction<CheckBoxes>>;
  checkBoxes: CheckBoxes;
  cartItemKeys: string[];
}
const SelectedDeleteButton: React.FC<SelectedDeleteButtonProps> = ({
  setCheckAllBoxes,
  setCheckBoxes,
  checkBoxes,
  cartItemKeys,
}) => {
  const dispatch: AppDispatch = useAppDispatch();
  const currentUser = null;
  const cartItems: CartItems = useAppSelector(
    (state) => state.product.cartItems
  );
  const deleteSelectedItems = (e: React.MouseEvent<HTMLButtonElement>) => {
    let newItems = { ...cartItems };
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

      setCheckAllBoxes(true);

      dispatch(setCartItems(newItems));
    } else {
      deleteCartItemsLocalStorage(keys);
      newItems = getCartItemsLocalStorage();
      dispatch(setCartItems(newItems));

      setCheckAllBoxes(true);
    }
  };

  return (
    <button
      name="deleteMany"
      onClick={deleteSelectedItems}
      className="mt-4 bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 py-2 px-4 text-white dark:text-black text-xs rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
      disabled={cartItemKeys.length === 0}
      aria-label="선택한 장바구니 아이템 삭제하기"
    >
      선택 삭제
    </button>
  );
};

export default SelectedDeleteButton;
