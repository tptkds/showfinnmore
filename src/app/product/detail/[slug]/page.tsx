'use client';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Product } from '@/types/globalTypes';
import AddCartButton from './components/AddCartButton';
import { AuthContext } from '@/app/AuthProvider';
interface DetailProps {
  params: {
    slug: string;
  };
}

const Detail: React.FC<DetailProps> = ({ params }) => {
  const [curItem, setCurItem] = useState<Product | undefined>();
  const { currentUser } = useContext(AuthContext);
  const productList: Product[] = useAppSelector(
    (state) => state.product.productList
  );

  useEffect(() => {
    const slugAsNumber = Number(params.slug);
    const item = productList.find((product) => product.id === slugAsNumber);
    setCurItem(item);

    window.scrollTo(0, 0);
  }, [productList, params.slug]);

  const purchase = () => {
    if (!currentUser) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }
    alert('구매가 완료되었습니다.');
  };

  return (
    <div className="mt-14 flex flex-col justify-center w-full items-center">
      <div className="h-full flex p-20 justify-center w800-max-padding  sm-max-textsize-12">
        <div className="  w-3/6 flex justify-center items-start h-80svh ">
          <div className=" flex justify-center">
            <div className="relative w-full md:w-2/3 lg:w-1/2">
              {curItem ? (
                <Image
                  src={curItem?.image}
                  alt={curItem?.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', padding: '1%' }}
                  priority
                />
              ) : (
                <div className="skeleton w-full h-full"></div>
              )}
            </div>
          </div>
        </div>
        <div
          className="w-3/6 h-full  sm-max-textsize-12"
          style={{ padding: '1%' }}
        >
          <p>{curItem?.title}</p>
          <p className="py-2.5">{curItem?.description}</p>
          <p>${curItem?.price}</p>
          <div className="flex flex-col mt-4 text-sm sm:mt-16 items-center">
            <button
              aria-label="바로 구매하기"
              onClick={purchase}
              className="mt-4 w-full lg:w-1/2 bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
            >
              바로 구매하기
            </button>
            {curItem ? <AddCartButton item={curItem} /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
