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
        className="modal-center absolute z-30 flex w-96 flex-col items-center pt-8 shadow-md  dark:bg-black "
        aria-modal="true"
        role="alertdialog"
      >
        <CloseModalButton toggleModal={toggleModal} />
        <p className=" mb-4">상품이 장바구니에 담겼어요.</p>
        <div className="flex w-full flex-row">
          <button
            aria-label="장바구니로 이동"
            name="goCart"
            onClick={goCart}
            className="mr-8  w-1/2 rounded bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-700 disabled:bg-zinc-400 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:disabled:bg-zinc-400"
          >
            장바구니로 이동
          </button>
          <button
            aria-label="계속 쇼핑하기"
            name="continueShopping"
            onClick={toggleModal}
            className="w-1/2 rounded bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-700 disabled:bg-zinc-400  dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:disabled:bg-zinc-400"
          >
            계속 쇼핑하기
          </button>
        </div>
      </div>
    </>
  );
};
export default CartModalContents;
