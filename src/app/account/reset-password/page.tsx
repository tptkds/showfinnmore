'use client';
import React, { useRef, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/app/firebaseConfig';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const modal = useRef<HTMLDivElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    setIsResetting(true);
    if (email === '') {
      setError('이메일을 입력해 주세요.');
      setIsResetting(false);
      return;
    }
    setError('');
    try {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setEmail('');
          setIsResetting(false);
          modal.current?.classList.remove('hidden');
          setTimeout(() => {
            modal.current?.classList.add('hidden');
          }, 1500);
        })
        .catch((error) => {
          setIsResetting(false);
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/network-request-failed':
              setError(
                '네트워크 연결에 실패했어요. 잠시 후에 다시 시도해 주세요.',
              );
              return;
            case 'auth/invalid-email':
              setError('존재하지 않는 이메일이에요.');
              return;
            case 'auth/internal-error':
              setError('잘못된 요청이에요.');
              return;
            case 'auth/too-many-requests':
              setError('잠시 후 다시 시도해 주세요.');
              return;
            default:
              setError('비밀번호 재설정에 실패했어요.');
              return;
          }
        });
    } catch (error) {
      setIsResetting(false);
      console.error('비밀번호 재설정 에러:', error);
    }
  };
  return (
    <>
      <div className="mt-14 flex w-full flex-col items-center justify-center">
        <div className="my-8 ">
          <h2>패스워드 찾기</h2>
        </div>
        <div className="mb-4  text-red-600">{error}</div>
        <form
          onSubmit={sendEmail}
          className="flex w-full flex-col items-center"
        >
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6   h-14 w-11/12  border border-gray-200 bg-gray-50 px-4 outline-none dark:text-black sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
          <button
            type="submit"
            disabled={isResetting}
            className="h-12  w-11/12 bg-zinc-900 text-white transition  duration-200 ease-in-out dark:bg-white dark:text-black  dark:hover:bg-zinc-300 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3"
            aria-label="비밀번호 재설정하기"
          >
            {isResetting ? '이메일 보내는 중..' : '비밀번호 재설정'}
          </button>
        </form>
      </div>
      <div
        className="fixed left-0 top-0 hidden h-full w-full transition-all"
        ref={modal}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="search-modal-center absolute top-10  z-50 flex h-32 w-96 items-center justify-center overflow-y-auto bg-white shadow-lg  shadow-md dark:bg-zinc-900  dark:text-white">
          <p>비밀번호 재설정 이메일이 전송되었습니다.</p>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
