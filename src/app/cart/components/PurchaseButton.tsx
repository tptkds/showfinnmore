import { AuthContext } from '@/app/AuthProvider';
import { db } from '@/app/firebaseConfig';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setCartItems } from '@/slices/productSlict';
import { CartItems, CheckBoxes } from '@/types/globalTypes';
import {
  deleteCartItemsLocalStorage,
  getCartItemsLocalStorage,
} from '@/utilities/localstorage';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
interface PurchaseButtonProps {
  setCheckAllBoxes: (value: boolean) => void;
  setCheckBoxes: React.Dispatch<React.SetStateAction<CheckBoxes>>;
  checkBoxes: CheckBoxes;
}
const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  setCheckAllBoxes,

  checkBoxes,
}) => {
  const { currentUser } = useContext(AuthContext);
  const cartItems = useAppSelector((state) => state.product.cartItems);
  const dispatch = useAppDispatch();
  const purchase = () => {
    const keys: string[] = Object.keys(checkBoxes).filter(
      (key) => checkBoxes[key]
    );
    if (!currentUser) {
      deleteCartItemsLocalStorage(keys);
      const newItems = getCartItemsLocalStorage();
      dispatch(setCartItems(newItems));
      let checkBoxesData: { [key: string]: boolean } = {};
      Object.keys(newItems).forEach((key) => {
        checkBoxesData[key] = true;
      });
      setCheckAllBoxes(true);
      alert('구매가 완료되었습니다.');
      return;
    }

    let newCartItems: CartItems = {
      ...cartItems,
    };
    keys.forEach((key) => {
      delete newCartItems[key];
    });

    let userRef = null;
    if (currentUser?.email) userRef = doc(db, 'users', currentUser?.email);
    if (userRef)
      updateDoc(userRef, {
        cartItems: { ...newCartItems },
      });
    dispatch(setCartItems({ ...newCartItems }));
    setCheckAllBoxes(true);
    alert('구매가 완료되었습니다.');
  };
  return (
    <div className="flex mt-8 ">
      <button
        onClick={purchase}
        className="w-full bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 py-2 px-8 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
        aria-label="선택한 장바구니 아이템 구매하기"
      >
        구매하기
      </button>
    </div>
  );
};

export default PurchaseButton;
