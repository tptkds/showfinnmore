import CartButton from '@/app/product/[...slug]/components/productList/Products/CartButton';
import WishlistButton from '@/app/product/[...slug]/components/productList/Products/WishlistButton';
import { CartItems, Product, WishlistItems } from '@/types/globalTypes';
import Image from 'next/image';
import Link from 'next/link';

export default function CartProduct({
  product,
  wishlist,
  cartItems,
}: {
  product: Product;
  wishlist: WishlistItems;
  cartItems: CartItems;
}) {
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
          className="truncate block text-sm"
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
          <WishlistButton product={product} wishlist={wishlist} />
        </div>
        <div>
          <CartButton product={product} cartItems={cartItems} />
        </div>
      </div>
    </li>
  );
}
