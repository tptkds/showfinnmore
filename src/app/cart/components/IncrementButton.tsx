import { AuthContext } from '@/app/AuthProvider';
import { db } from '@/app/firebaseConfig';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCartItems } from '@/slices/productSlict';
import { CartItems } from '@/types/globalTypes';
import { setCartItemsLocalStorage } from '@/utilities/localstorage';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';

interface IncrementButtonProps {
  itemKey: string;
  cartItems: CartItems;
  setCheckAllBoxes: (newCheckAllBoxes: boolean) => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({
  itemKey,
  cartItems,
  setCheckAllBoxes,
}) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useContext(AuthContext);
  const increment = (e: any, key: string) => {
    setCheckAllBoxes(true);
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
    <button
      type="button"
      name="increment"
      className="p-2"
      onClick={(e) => increment(e, itemKey)}
      aria-controls="number"
      aria-label="1 더하기"
    >
      +
    </button>
  );
};

export default IncrementButton;
