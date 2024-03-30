'use client';
import useProduct from '@/hooks/useProduct';
import useStore from '@/hooks/useStore';
import Image from 'next/image';
import Link from 'next/link';
import WishlistButton from './productList/WishlistButton';
import CartButton from './productList/CartButton';

const ProductList: React.FC = () => {
  const { cartItems, wishlistItems } = useStore();

  const { getCurrentProducts } = useProduct();
  const products = getCurrentProducts();

  return (
    <>
      <ul className="grid grid-cols-1 gap-8 h-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
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
                  priority
                />
              </Link>
            </div>
            <div>
              <Link href={`/product/detail/${product.id}`}>
                {product.title}
              </Link>
              <p className="my-2">${product.price}</p>
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
        ))}
      </ul>
    </>
  );
};

export default ProductList;
