import { CartItemProps } from '@/types/globalTypes';
import QuantityAdjuster from './cartItemDetails/QuantityAdjuster';
import Image from 'next/image';

const CartItemDetails: React.FC<CartItemProps> = ({ cartItem }) => {
  return (
    <div>
      <div className="mb-4 flex items-center ">
        <div className="relative mr-4 h-20 w-20 rounded bg-white">
          <Image
            src={cartItem.product.image}
            alt={cartItem.product.title}
            style={{ padding: '6px', objectFit: 'contain' }}
            sizes="150px"
            fill
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-sm">{cartItem.product.title}</p>
        </div>
      </div>

      <div className="flex w-full items-center	justify-between">
        <div className="flex dark:text-black">
          <QuantityAdjuster
            product={cartItem.product}
            count={cartItem.count}
            isChecked={cartItem.isChecked}
          />
        </div>
        <div>
          <p aria-label="price" className="mr-6 font-semibold">
            {(cartItem.product.price * 1000 * cartItem.count).toLocaleString()}
            원
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemDetails;
