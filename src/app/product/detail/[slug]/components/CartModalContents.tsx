import CloseModalButton from '@/app/components/modal/CloseModalButton';
import { ModalContentsProps } from '@/types/globalTypes';
import { useRouter } from 'next/navigation';

const CartModalContents: React.FC<ModalContentsProps> = ({ toggleModal }) => {
  const router = useRouter();
  const goCart = () => {
    toggleModal();
    router.push('/cart');
  };
  return (
    <>
      <div
        className="absolute dark:bg-black flex flex-col modal-center shadow-md items-center pt-8 z-30  w-96 "
        aria-modal="true"
        role="alertdialog"
      >
        <CloseModalButton toggleModal={toggleModal} />
        <p className=" mb-4">상품이 장바구니에 담겼어요.</p>
        <div className="flex flex-row w-full">
          <button
            aria-label="장바구니로 이동"
            name="goCart"
            onClick={goCart}
            className="mr-8  bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white w-1/2 dark:disabled:bg-zinc-400 py-2 px-4 text-white dark:text-black rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
          >
            장바구니로 이동
          </button>
          <button
            aria-label="계속 쇼핑하기"
            name="continueShopping"
            onClick={toggleModal}
            className="w-1/2 bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 py-2 px-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
          >
            계속 쇼핑하기
          </button>
        </div>
      </div>
    </>
  );
};
export default CartModalContents;
