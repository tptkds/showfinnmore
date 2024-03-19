import { AuthContext } from '@/app/AuthProvider';
import { db } from '@/app/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';

const PurchaseListButton: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <button
      name="passwordButton"
      type="button"
      className="mt-4 h-12  dark:bg-white dark:text-black dark:hover:bg-zinc-300  bg-zinc-900 hover:bg-zinc-700 text-white transition duration-200 ease-in-out w-full"
      onClick={openPurchaseList}
      aria-label="주문내역 보기"
    >
      주문내역 보기
    </button>
  );
};
export default PurchaseListButton;
