import { AuthContext } from '@/app/AuthProvider';
import { db } from '@/app/firebaseConfig';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCartItems } from '@/slices/productSlict';
import { CartItems } from '@/types/globalTypes';
import { setCartItemsLocalStorage } from '@/utilities/localstorage';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';

interface DecrementButtonProps {
  itemKey: string;
  cartItems: CartItems;
}

const DecrementButton: React.FC<DecrementButtonProps> = ({
  itemKey,
  cartItems,
}) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useContext(AuthContext);
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

  return (
    <button
      type="button"
      name="decrement"
      onClick={(e) => decrement(e, itemKey)}
      className="p-2"
      aria-controls="number"
      aria-label="1 빼기"
    >
      -
    </button>
  );
};

export default DecrementButton;
