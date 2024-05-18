'use client';
import React, { useState } from 'react';
import useSignInUser from '@/hooks/useSignInUser';

const Form: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { status: signInStatus, signInUser, errorMessage } = useSignInUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInUser(email, password);
  };

  return (
    <>
      <div className="errorMessage  mb-4 text-center text-red-600">
        {errorMessage}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <div className="flex w-full flex-col items-center">
          <input
            name="email"
            type="email"
            value={email}
            placeholder="이메일"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6   h-14 w-11/12  border border-gray-200 bg-gray-50 px-4 outline-none dark:text-black sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
          <input
            name="password"
            type="password"
            value={password}
            placeholder="패스워드"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="h-14  w-11/12 border  border-gray-200 bg-gray-50 px-4 outline-none dark:text-black sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
        </div>
        <div className="my-8 flex w-full flex-col items-center">
          <button
            aria-label="로그인하기"
            type="submit"
            disabled={signInStatus === 'loading'}
            className="h-12  w-11/12 bg-zinc-900 text-white transition duration-200  ease-in-out hover:bg-zinc-600 dark:bg-white dark:text-black  dark:hover:bg-zinc-300 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3"
          >
            {signInStatus === 'loading' ? '로그인 중' : '로그인하기'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
