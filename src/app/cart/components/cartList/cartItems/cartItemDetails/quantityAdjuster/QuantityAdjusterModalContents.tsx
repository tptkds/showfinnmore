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
        className="modal-center absolute z-30 flex w-96 flex-col items-center pt-8 shadow-md  dark:bg-black "
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
            className="mb-6   h-14 w-full  border border-gray-200 bg-gray-50 px-4 outline-none dark:text-black "
          />
        </div>
        <div className="flex w-full flex-row">
          <button
            type="button"
            aria-label="취소"
            name="continueShopping"
            onClick={() => {
              toggleModal();
              setCountInput(count);
            }}
            className="t mr-2  w-1/2 rounded border bg-zinc-50 px-4 py-2 text-black transition hover:bg-zinc-100 disabled:bg-zinc-400  dark:bg-white  dark:text-black dark:hover:bg-zinc-200 dark:disabled:bg-zinc-400"
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
            className="w-1/2 rounded bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-700 disabled:bg-zinc-400  dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:disabled:bg-zinc-400"
          >
            변경
          </button>
        </div>
      </div>
    </>
  );
};
export default QuantityAdjusterModalContents;
