import { Product } from '@/types/globalTypes';
import QuantityAdjuster from './cartItemDetails/QuantityAdjuster';
import Image from 'next/image';

interface CartItemDetailsProps {
  product: Product;
  count: number;
  isChecked: boolean;
}
const CartItemDetails: React.FC<CartItemDetailsProps> = ({
  product,
  count,
  isChecked,
}) => {
  return (
    <div>
      <div className="mb-4 flex items-center ">
        <div className="relative w-20 h-20 bg-white rounded mr-4">
          <Image
            src={product.image}
            alt={product.title}
            style={{ padding: '6px', objectFit: 'contain' }}
            sizes="150px"
            fill
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-sm">{product.title}</p>
        </div>
      </div>

      <div className="flex items-center justify-between	w-full">
        <div className="flex dark:text-black">
          <QuantityAdjuster
            product={product}
            count={count}
            isChecked={isChecked}
          />
        </div>
        <div>
          <p aria-label="price" className="font-semibold mr-6">
            {(product.price * 1000 * count).toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemDetails;
