// 'use client';
// import React, { useContext, useEffect, useState } from 'react';
// import { getProductList } from './api/product';
// import { CartItems, Product } from '@/types/globalTypes';
// import { AppDispatch } from '@/types/reduxTypes';
// import { useAppDispatch } from '@/hooks/useAppDispatch';

// export default function DataInitializer({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const dispatch: AppDispatch = useAppDispatch();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productList: Product[] = await getProductList();
//         //dispatch(setProductList(productList));
//       } catch (error) {
//         console.error('상품 리스트를 가져오는 것을 실패했습니다.:', error);
//       }

//       // try {
//       //   if (!currentUser) {
//       //     const cartItems: CartItems = getCartItemsLocalStorage();
//       //     dispatch(setCartItems(cartItems));
//       //   }
//       // } catch (error) {
//       //   console.error(
//       //     '로컬 스토리지에서 장바구니 아이템을 가져오는 작업을 실패했습니다.:',
//       //     error
//       //   );
//       // }
//       setLoading(false);
//     };

//     fetchData();
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <span className="loading loading-ring loading-lg"></span>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

'use client';
import useProduct from '@/hooks/useProduct';
import useStore from '@/hooks/useStore';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

interface DataInitializerProps {
  children: React.ReactNode;
}

const DataInitializer: React.FC<DataInitializerProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const { initializeUserStore, initializeStore } = useStore();
  const { setProductsStore } = useProduct();
  useEffect(() => {
    if (status === 'authenticated') {
      initializeUserStore(session.user.email);
    } else {
      initializeStore();
    }
  }, [status]);

  useEffect(() => {
    setProductsStore();
  }, []);

  return status === 'loading' ? <LoadingSpinner /> : <>{children}</>;
};

export default DataInitializer;
