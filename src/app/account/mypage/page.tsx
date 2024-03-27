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
      <div className="mt-14 flex flex-col justify-center w-full items-center">
        <h2>마이페이지</h2>
        <div className="my-14 flex flex-col items-center min-w-64">
          <h3 className=" text-xl">내 정보</h3>
          <div className="mt-8 w-full">
            <MyInfo />
          </div>
          <div className="flex flex-col items-center mt-6 w-full ">
            <UserSettingsButtons />
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
