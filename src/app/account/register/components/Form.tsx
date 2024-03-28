'use client';
import useRouterPush from '@/hooks/useRouterPush';
import useSignInUser from '@/hooks/useSignInUser';
import useSignUpUser from '@/hooks/useSignUpUser';

import React, { useState } from 'react';

const Form: React.FC = () => {
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { status: signUpStatus, signUpUser, resetStore } = useSignUpUser();
  const { signInUser } = useSignInUser();
  const { goHome } = useRouterPush();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signUpUser(email, password, displayName);
      await signInUser(email, password).then(() => {
        resetStore();
        goHome();
      });
    } catch (error) {
      const err = error as Error;
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <div className="text-red-600 mb-4 errorMessage text-center">
        {errorMessage}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col items-center w-full">
          <input
            name="displayName"
            type="displayName"
            value={displayName}
            placeholder="이름 (6글자 이하)"
            autoComplete="username"
            onChange={(e) => setDisplayName(e.target.value)}
            className="px-4   h-14 bg-gray-50  dark:text-black border-gray-200 border mb-6 outline-none w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
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
            placeholder="패스워드 (6글자 이상)"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="px-4  h-14 bg-gray-50  dark:text-black border-gray-200 border outline-none w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
        </div>
        <div className="flex flex-col items-center w-full my-8">
          <button
            type="submit"
            className="dark:bg-white dark:text-black dark:hover:bg-zinc-300 h-12 bg-zinc-900   text-white  transition duration-200 ease-in-out  w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3"
            disabled={signUpStatus === 'loading'}
            aria-label="회원가입하기"
          >
            {signUpStatus === 'loading' ? '회원가입 중...' : '회원가입하기'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
