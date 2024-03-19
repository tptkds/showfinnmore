import { User } from 'firebase/auth';

interface PurchaseButtonProps {
  currentUser: User | null;
}
const PurchaseButton: React.FC<PurchaseButtonProps> = ({ currentUser }) => {
  const purchase = () => {
    if (!currentUser) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }
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
