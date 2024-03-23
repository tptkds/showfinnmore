'use client';
import { AuthContext } from '@/app/AuthProvider';
import { toggleModal } from '@/utilities/modal';
import { useRouter } from 'next/navigation';
import React, { useContext, useLayoutEffect, useState } from 'react';
import AccountEditingModalContents from './component/AccountEditingModalContents';
import Modal from '@/app/components/Modal';

const MyPage: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useLayoutEffect(() => {
    if (isLoaded)
      if (!currentUser) {
        router.push('/account/login');
      }
    if (!isLoaded) setIsLoaded(true);
  }, [isLoaded, currentUser]);

  return (
    <>
      <div className="mt-14 flex flex-col justify-center w-full items-center">
        <h2>마이페이지</h2>
        <div className="my-14 flex flex-col items-center min-w-64">
          <h3 className=" text-xl">내 정보</h3>

          <div className="mt-8">
            <div className="flex ">
              <p className="w-14">Name. </p>
              <p>{currentUser?.displayName}</p>
            </div>
            <div className="flex ">
              <p className="w-14">Email. </p>
              <p>{currentUser?.email}</p>
            </div>
          </div>

          <div className="flex flex-col items-center mt-6 w-full ">
            <button
              type="button"
              className="h-12  dark:bg-white dark:text-black dark:hover:bg-zinc-300  bg-zinc-900 hover:bg-zinc-700 text-white transition duration-200 ease-in-out w-full"
              onClick={() => {
                toggleModal(isModalOpen, setIsModalOpen);
                setSelectedButton('changeName');
              }}
              aria-label="이름 변경하기"
            >
              이름 변경
            </button>
            <button
              type="button"
              className="mt-4 h-12  dark:bg-white dark:text-black dark:hover:bg-zinc-300  bg-zinc-900 hover:bg-zinc-700 text-white transition duration-200 ease-in-out w-full"
              onClick={() => {
                toggleModal(isModalOpen, setIsModalOpen);
                setSelectedButton('changePassword');
              }}
              aria-label="패스워드 변경하기"
            >
              패스워드 변경
            </button>
          </div>
        </div>
      </div>
      <Modal
        toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
        isModalOpen={isModalOpen}
      >
        <AccountEditingModalContents
          toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
          selectedButton={selectedButton}
        />
      </Modal>
    </>
  );
};
export default MyPage;
