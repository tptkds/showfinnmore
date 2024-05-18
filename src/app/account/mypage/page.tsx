'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import UserSettingsButtons from './component/UserSettingsButtons';
import MyInfo from './component/MyInfo';

const MyPage: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/account/login');
    }
  }, [status]);

  return (
    <>
      <h2 className="mb-4 w-full text-center">My Page</h2>
      <div className="flex flex-col space-y-4 dark:text-white md:flex-row md:space-y-0">
        <div className="w-full flex-shrink-0 flex-grow-0 self-start border bg-white p-8 dark:bg-transparent md:w-auto md:min-w-[269px]">
          <div className="flex flex-col items-center">
            <h3 className="mb-4 font-bold">프로필</h3>
            <MyInfo />
          </div>
          <div
            className="my-8 w-full border-t border-gray-300"
            role="separator"
          ></div>
          <div className="mt-6 flex w-full flex-col items-center">
            <UserSettingsButtons />
          </div>
        </div>
        <div className="min-h-[330px] flex-grow border bg-white dark:bg-transparent md:ml-6 md:min-h-[600px]">
          <div className="p-8">
            <h3 className="text-center font-bold">주문 내역</h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
