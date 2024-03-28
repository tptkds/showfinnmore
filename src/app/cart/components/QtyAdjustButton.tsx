import { db } from '@/app/firebaseConfig';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import { CartItems } from '@/types/globalTypes';
import { setCartItemsLocalStorage } from '../../../utils/localstorage';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';

interface QtyAdjustButtonProps {
  isIncrease: boolean;
  itemKey: string;

  setCheckAllBoxes: (newCheckAllBoxes: boolean) => void;
}

const QtyAdjustButton: React.FC<QtyAdjustButtonProps> = ({
  isIncrease,
  itemKey,

  setCheckAllBoxes,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = null;
  const cartItems: CartItems = useAppSelector((state) => state.cart.cartItems);
  const changeQty = async () => {
    setCheckAllBoxes(true);
    // const currentCount = cartItems[itemKey]?.count;
    // const newCount = isIncrease
    //   ? currentCount + 1
    //   : Math.max(currentCount - 1, 0);

    // if (currentCount === newCount) return;

    // const newItem = {
    //   [itemKey]: {
    //     product: cartItems[itemKey].product,
    //     count: newCount,
    //   },
    // };
    // const newCartItems: CartItems = { ...cartItems, ...newItem };

    // if (currentUser?.email) {
    //   const userRef = doc(db, 'users', currentUser.email);
    //   await updateDoc(userRef, { cartItems: newCartItems });
    // } else {
    //   setCartItemsLocalStorage(newCartItems);
    // }
    // dispatch(setCartItems(newCartItems));
  };

  return (
    <button
      type="button"
      className="p-2"
      onClick={changeQty}
      aria-controls="number"
      aria-label={isIncrease ? '수량 1개 증가' : '수량 1개 감소'}
    >
      {isIncrease ? '+' : '-'}
    </button>
  );
};
export default QtyAdjustButton;
