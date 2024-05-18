'use client';
import React, { useEffect } from 'react';
import List from './components/List';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const WishlistComponent: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 후 이용 가능합니다.');
      router.push('/');
    }
  }, [status]);
  return (
    <div className="pb-24">
      <div className="mt-14 mb-4 flex flex-col justify-center w-full items-center">
        <h2>Wish List</h2>
      </div>
      <List />
    </div>
  );
};
export default WishlistComponent;
