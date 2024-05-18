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
      className="rounded-md border bg-white p-4 dark:border-none dark:bg-black"
    >
      <div className="mb-3  aspect-square	 w-full border bg-white">
        <Link
          href={`/product/detail/${product.id}`}
          className="relative flex h-full w-full items-center"
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
      <div className="mt-4	space-y-2  overflow-hidden px-2">
        <Link
          href={`/product/detail/${product.id}`}
          className="block truncate text-sm"
          title={product.title}
        >
          {product.title}
        </Link>
        <strong
          className="block truncate text-sm"
          title={(product.price * 1000).toLocaleString()}
        >
          {(product.price * 1000).toLocaleString()}
        </strong>
      </div>
      <div className="mt-4 flex   px-2">
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
