'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { usePathname } from 'next/navigation';

const Loading: React.FC = () => {
  const productListSkeleton = (
    <ul className="mt-28 grid grid-cols-1 gap-8 min-h-screen sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <li key={index} className="relative h-full animate-pulse pb-24">
          <div className="h-4/5 mb-4">
            <Skeleton height="100%" />
          </div>
          <div>
            <Skeleton height={20} width={`60%`} />
          </div>
          <div className="mt-2 mb-24">
            <Skeleton height={20} width={`30%`} />
          </div>
        </li>
      ))}
    </ul>
  );

  const detailPageSkeleton = (
    <div className="flex items-center justify-center h-full">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );

  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith('/product/') &&
      !pathname.startsWith('/product/detail') ? (
        <div className="min-h-screen">{productListSkeleton}</div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ height: '69svh' }}
        >
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </>
  );
};
export default Loading;
