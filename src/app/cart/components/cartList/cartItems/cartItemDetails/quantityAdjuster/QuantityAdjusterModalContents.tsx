import useStore from '@/hooks/useStore';
import { ModalContentsProps, Product } from '@/types/globalTypes';
import { useEffect, useState } from 'react';

interface QuantityAdjusterModalContentsProps extends ModalContentsProps {
  product: Product;
  count: number;
  isChecked: boolean;
}
const QuantityAdjusterModalContents: React.FC<
  QuantityAdjusterModalContentsProps
> = ({ toggleModal, product, count, isChecked }) => {
  const [countInput, setCountInput] = useState<number>(0);
  useEffect(() => {
    setCountInput(count);
  }, [count]);
  const { changeQuantity } = useStore();
  return (
    <>
      <div
        className="absolute dark:bg-black flex flex-col modal-center shadow-md items-center pt-8 z-30  w-96 "
        aria-modal="true"
        role="alertdialog"
      >
        <p className=" mb-4">상품 수량을 입력해 주세요.</p>
        <div className="w-full">
          <input
            type="number"
            value={countInput}
            onChange={(e) => {
              if (Number(e.target.value) < 1 || !e.target.value) {
                setCountInput(Number(1));
                return;
              }
              if (Number(e.target.value) > 9999) {
                setCountInput(Number(9999));
                return;
              }
              setCountInput(Number(e.target.value));
            }}
            className="px-4   h-14 bg-gray-50  dark:text-black border-gray-200 border mb-6 outline-none w-full "
          />
        </div>
        <div className="flex flex-row w-full">
          <button
            type="button"
            aria-label="취소"
            name="continueShopping"
            onClick={() => {
              toggleModal();
              setCountInput(count);
            }}
            className="w-1/2 bg-zinc-50  hover:bg-zinc-100 border text-black dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 py-2 px-4 t dark:text-black  rounded  transition disabled:bg-zinc-400 mr-2"
          >
            취소
          </button>
          <button
            type="button"
            aria-label="변경"
            name="continueShopping"
            onClick={() => {
              changeQuantity(product, countInput, isChecked);
              toggleModal();
            }}
            className="w-1/2 bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 py-2 px-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
          >
            변경
          </button>
        </div>
      </div>
    </>
  );
};
export default QuantityAdjusterModalContents;
