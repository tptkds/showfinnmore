import { CartItems, CheckBoxes } from '@/types/globalTypes';
import Image from 'next/image';
import Link from 'next/link';
import QtyAdjustButton from './QtyAdjustButton';
import DeleteCartItem from './DeleteCartItem';
import { useAppSelector } from '@/hooks/useAppSelector';

interface CartItemProps {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemKey: string;
  checkBoxes: CheckBoxes;

  setCheckAllBoxes: (newCheckAllBox: boolean) => void;
  setCheckBoxes: React.Dispatch<React.SetStateAction<CheckBoxes>>;
}

const CartItem: React.FC<CartItemProps> = ({
  handleCheckboxChange,
  itemKey,
  checkBoxes,

  setCheckAllBoxes,
  setCheckBoxes,
}) => {
  const cartItems: CartItems = useAppSelector((state) => state.cart.cartItems);
  return (
    <li className="my-4 items-center flex flex-row mb-8">
      <input
        name={itemKey}
        type="checkbox"
        className="mr-4 flex"
        onChange={handleCheckboxChange}
        checked={checkBoxes[itemKey] || false}
      />
      <div className="relative flex items-start h-44 md:h-24 w-6/12 md:w-2/12 mx-4 bg-white">
        <Link
          href={`/product/detail/${cartItems[itemKey].product.id}`}
          className=" h-full w-full relative"
        >
          <Image
            src={cartItems[itemKey].product.image}
            alt={cartItems[itemKey].product.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            style={{ objectFit: 'contain', minWidth: '56px' }}
          />
        </Link>
      </div>
      <div className="w-full flex sm-max-textsize-12 flex-col md:flex-row">
        <div className="w-full md:w-1/5 whitespace-pre-line=true flex items-center md:w-1/4 overflow-hidden">
          <Link
            href={`/product/detail/${cartItems[itemKey].product.id}`}
            className="min-w-16 max-h-24 "
          >
            {cartItems[itemKey].product.title}
          </Link>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-1/5 whitespace-pre-line=true flex justify-end items-center md:w-1/4">
          <p aria-label="제품 가격">${cartItems[itemKey].product.price}</p>
        </div>
        <div className="w-full md:w-1/5 whitespace-pre-line=true flex justify-end items-center md:w-1/4">
          <QtyAdjustButton
            isIncrease={false}
            itemKey={itemKey}
            setCheckAllBoxes={setCheckAllBoxes}
          />
          <input
            className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
            type="text"
            value={cartItems[itemKey].count}
            data-hs-input-number-input
            readOnly
            aria-live="assertive"
          />
          <QtyAdjustButton
            isIncrease={true}
            itemKey={itemKey}
            setCheckAllBoxes={setCheckAllBoxes}
          />
        </div>
        <div className="w-full md:w-1/5 whitespace-pre-line=true flex justify-end items-center md:w-1/4">
          <p aria-label="제품 수량 합계 금액">
            $
            {(
              cartItems[itemKey].product.price * cartItems[itemKey].count
            ).toFixed(2)}
          </p>
        </div>
        <div className="w-full md:w-1/5 whitespace-pre-line=true flex justify-end items-center md:w-1/4">
          <DeleteCartItem
            itemKey={itemKey}
            setCheckAllBoxes={setCheckAllBoxes}
            setCheckBoxes={setCheckBoxes}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
