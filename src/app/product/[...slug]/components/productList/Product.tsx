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
    <li key={product.id} className="h-full">
      <div className="h-4/5">
        <Link
          href={`/product/detail/${product.id}`}
          className="flex items-center w-full h-full relative"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
              padding: '20%',
            }}
            loading="lazy"
          />
        </Link>
      </div>
      <div>
        <Link href={`/product/detail/${product.id}`}>{product.title}</Link>
        <p className="my-2">{(product.price * 1000).toLocaleString()}원</p>
      </div>
      <div className="flex">
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
