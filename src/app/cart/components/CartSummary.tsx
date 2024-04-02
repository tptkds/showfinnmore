import { CartItems } from '@/types/globalTypes';
import calculateTotal from '@/utils/calculateTotal';
import { useEffect, useState } from 'react';

interface CartSummaryProps {
  cartItems: CartItems;
  isCheckedItems: {
    [key: string]: boolean;
  };
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  isCheckedItems,
}) => {
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    const newTotal = calculateTotal(cartItems, isCheckedItems);
    setTotal(newTotal);
  }, [cartItems, isCheckedItems]);

  return (
    <>
      <div className="shadow bg-zinc-50 dark:bg-zinc-950 mb-6 rounded flex flex-row py-6 px-4 md:sticky md:top-24">
        <div className="w-full text-sm">
          <div className="flex justify-between ">
            <p>총 상품금액</p>
            <p className="font-semibold	">{total.toLocaleString()}원</p>
          </div>
          <div className="flex justify-between mt-2 my-4">
            <p>배송비</p>
            <p className="font-semibold	">+ {total < 100000 ? '3,000' : 0}원</p>
          </div>
          <div className="flex justify-between border-t pt-4">
            <p className="font-semibold	">결제금액</p>
            <p className="font-semibold	text-xl">
              {(total + (total < 100000 ? 3000 : 0)).toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
