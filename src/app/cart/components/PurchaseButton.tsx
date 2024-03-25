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
  const currentUser = null;
  const cartItems = useAppSelector((state) => state.product.cartItems);
  // const purchaseList = useAppSelector((state) => state.product.purchaseList);
  const dispatch = useAppDispatch();
  const purchase = () => {
    if (!currentUser) {
      // deleteCartItemsLocalStorage(keys);
      // const newItems = getCartItemsLocalStorage();
      // dispatch(setCartItems(newItems));
      // let checkBoxesData: { [key: string]: boolean } = {};
      // Object.keys(newItems).forEach((key) => {
      //   checkBoxesData[key] = true;
      // });
      // setCheckAllBoxes(true);
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = ('0' + (today.getMonth() + 1)).slice(-2);
    // const day = ('0' + today.getDate()).slice(-2);
    // const dateString = year + '-' + month + '-' + day;

    const keys: string[] = Object.keys(checkBoxes).filter(
      (key) => checkBoxes[key]
    );

    //let purchases: any = {};
    // keys.forEach((key) => (purchases[key] = { ...cartItems[key] }));

    let newCartItems: CartItems = {
      ...cartItems,
    };

    keys.forEach((key) => {
      delete newCartItems[key];
    });

    // let userRef = null;
    // if (currentUser?.email) userRef = doc(db, 'users', currentUser?.email);
    // if (userRef)
    //   updateDoc(userRef, {
    //     cartItems: { ...newCartItems },
    //     purchaseList: {
    //       ...purchaseList,

    //       [today.getMilliseconds() + Math.random() * 1000]: {
    //         date: dateString,
    //         products: purchases,
    //       },
    //     },
    //   });
    dispatch(setCartItems({ ...newCartItems }));
    setCheckAllBoxes(true);
    alert('구매가 완료되었습니다. (구매 내역은 개발 중입니다...)');
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
