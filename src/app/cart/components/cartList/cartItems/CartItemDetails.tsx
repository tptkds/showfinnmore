import { CartItemProps } from '@/types/globalTypes';
import QuantityAdjuster from './cartItemDetails/QuantityAdjuster';
import Image from 'next/image';

const CartItemDetails: React.FC<CartItemProps> = ({ cartItem }) => {
  return (
    <div>
      <div className="mb-4 flex items-center ">
        <div className="relative w-20 h-20 bg-white rounded mr-4">
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

      <div className="flex items-center justify-between	w-full">
        <div className="flex dark:text-black">
          <QuantityAdjuster
            product={cartItem.product}
            count={cartItem.count}
            isChecked={cartItem.isChecked}
          />
        </div>
        <div>
          <p aria-label="price" className="font-semibold mr-6">
            {(cartItem.product.price * 1000 * cartItem.count).toLocaleString()}
            원
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemDetails;
