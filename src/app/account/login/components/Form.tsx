'use client';
import React, { useState } from 'react';
import { auth } from '@/app/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AppDispatch } from '@/types/reduxTypes';
import { useRouter } from 'next/navigation';
import { setUserInfo } from '@/slices/userSlice';

const Form: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignIng, setIsSignIng] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();

  const singIn = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSignIng(true);
    if (email === '' || password === '') {
      setError('이메일과 패스워드 모두 입력해 주세요.');
      setIsSignIng(false);
      return;
    }

    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsSignIng(false);
          const user = userCredential.user;
          dispatch(setUserInfo(user));
          router.push('/');
        })
        .catch((error) => {
          setIsSignIng(false);
          const errorCode = error.code;
          console.log(errorCode);
          switch (errorCode) {
            case 'auth/invalid-credential':
              setError('이메일 혹은 패스워드가 일치하지 않아요.');
              return;
            case 'auth/network-request-failed':
              setError(
                '네트워크 연결에 실패했어요. 잠시 후에 다시 시도해 주세요.'
              );
              return;
            case 'auth/invalid-email':
              setError('이메일 형식을 올바르게 입력해 주세요.');
              return;
            case 'auth/internal-error':
              setError('잘못된 요청이에요.');
              return;
            case 'auth/too-many-requests':
              setError('잠시 후 다시 시도해 주세요.');
              return;
            default:
              setError('로그인에 실패했어요.');
              return;
          }
        });
    } catch (error) {
      setIsSignIng(false);
      console.error('로그인 에러:', error);
    }
  };

  return (
    <>
      <div className="text-red-600  mb-4">{error}</div>
      <form onSubmit={singIn} className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-full">
          <input
            name="email"
            type="email"
            value={email}
            placeholder="이메일"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            className="px-4   h-14 bg-gray-50  dark:text-black border-gray-200 border mb-6 outline-none w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
          <input
            name="password"
            type="password"
            value={password}
            placeholder="패스워드"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="px-4  h-14 bg-gray-50  dark:text-black border-gray-200 border outline-none w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
        </div>
        <div className="flex flex-col items-center w-full my-8">
          <button
            aria-label="로그인하기"
            type="submit"
            disabled={isSignIng}
            className="h-12  bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-300  text-white transition duration-200 ease-in-out  w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3"
          >
            {isSignIng ? '로그인 중' : '로그인하기'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
