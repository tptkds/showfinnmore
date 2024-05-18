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
      <h2 className="text-center w-full mb-10">My Page</h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
        <div className="w-full md:w-auto md:min-w-[269px] border p-8 bg-white flex-grow-0 flex-shrink-0 self-start">
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl mb-4">프로필</h3>
            <MyInfo />
          </div>
          <div
            className="w-full border-t border-gray-300 my-8"
            role="separator"
          ></div>
          <div className="flex flex-col items-center mt-6 w-full">
            <UserSettingsButtons />
          </div>
        </div>
        <div className="flex-grow md:ml-6 border bg-white min-h-[330px] md:min-h-[600px]">
          <div className="p-8">
            <h3 className="text-center font-bold text-xl">주문 내역</h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
