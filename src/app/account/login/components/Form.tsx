'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { signInSchema } from '../../../../schema/userValidationSchema';
import { useRouter } from 'next/navigation';
import { SafeParseReturnType, ZodIssue } from 'zod';
import useSignInUser from '@/hooks/useSignInUser';
import useRouterPush from '@/hooks/useRouterPush';
import useStore from '@/hooks/useStore';

const Form: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignIng, setIsSignIng] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { status: signInStatus, signInUser } = useSignInUser();
  const { resetStore } = useStore();
  const { goHome } = useRouterPush();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signInUser(email, password).then(() => {
        resetStore();
        // setUserStore();
        goHome();
      });
    } catch (error) {
      const err = error as Error;
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <div className="text-red-600  mb-4 errorMessage text-center">
        {errorMessage}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
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
