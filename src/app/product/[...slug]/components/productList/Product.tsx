import {
  CartItems,
  Product as ProductType,
  WishlistItems,
} from '@/types/globalTypes';
import Image from 'next/image';
import Link from 'next/link';
import WishlistButton from './Products/WishlistButton';
import CartButton from './Products/CartButton';

interface ProductsProps {
  product: ProductType;
  cartItems: CartItems;
  wishlistItems: WishlistItems;
}
const Product: React.FC<ProductsProps> = ({
  product,
  cartItems,
  wishlistItems,
}) => {
  return (
    <li
      key={product.id}
      className="border p-2 bg-white rounded-md dark:bg-black"
    >
      <div className="w-full  aspect-square	 bg-white border mb-3">
        <Link
          href={`/product/detail/${product.id}`}
          className="flex items-center w-full h-full relative"
        >
          <Image
            src={product.image}
            alt={product.title}
            sizes="100vw"
            style={{
              objectFit: 'contain',
              padding: '10px',
            }}
            fill
            loading="lazy"
          />
        </Link>
      </div>
      <div className="overflow-hidden	px-2  space-y-2 mt-4">
        <Link
          href={`/product/detail/${product.id}`}
          className="truncate block text-xs"
          title={product.title}
        >
          {product.title}
        </Link>
        <strong
          className="truncate block text-sm"
          title={(product.price * 1000).toLocaleString()}
        >
          {(product.price * 1000).toLocaleString()}
        </strong>
      </div>
      <div className="flex mt-4   px-2">
        <div className="mr-2">
          <WishlistButton product={product} wishlist={wishlistItems} />
        </div>
        <div>
          <CartButton product={product} cartItems={cartItems} />
        </div>
      </div>
    </li>
  );
};
export default Product;
