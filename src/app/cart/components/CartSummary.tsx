import { CartProps } from '@/types/globalTypes';
import calculateTotal from '@/utils/calculateTotal';
import { useEffect, useState } from 'react';

const CartSummary: React.FC<CartProps> = ({ cartItems }) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newTotal = calculateTotal(cartItems);
    setTotal(newTotal);
  }, [cartItems]);

  return (
    <>
      <div className="mb-6 flex flex-row rounded bg-zinc-50 px-4 py-6 shadow dark:bg-zinc-950 ">
        <div className="w-full text-sm">
          <div className="flex justify-between ">
            <p>총 상품금액</p>
            <p className="font-semibold	">{total.toLocaleString()}원</p>
          </div>
          <div className="mt-2 mt-4 flex justify-between">
            <p>배송비</p>
            <p className="font-semibold	">
              + {total < 100000 && total !== 0 ? '3,000' : 0}원
            </p>
          </div>
          <div className="mb-4 mt-2">
            <p className="text-right text-xs">
              (10만원 이상 구매 시 배송비 무료)
            </p>
          </div>
          <div className="flex justify-between border-t pt-4">
            <p className="font-semibold	">결제금액</p>
            <p className="text-xl	font-semibold">
              {(total + (total < 100000 ? 3000 : 0)).toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
