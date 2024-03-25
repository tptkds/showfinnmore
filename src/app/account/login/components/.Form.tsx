'use server';
import React from 'react';
import SubmitButton from './SubmitButton';
import { handleSubmit } from '../actions/handleSubmit';

const Form: React.FC = () => {
  return (
    <>
      <div className="text-red-600 mb-4">{}</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col items-center w-full">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            autoComplete="username"
            className="px-4   h-14 bg-gray-50  dark:text-black border-gray-200 border mb-6 outline-none w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
          <input
            name="password"
            type="password"
            placeholder="패스워드"
            autoComplete="current-password"
            className="px-4  h-14 bg-gray-50  dark:text-black border-gray-200 border outline-none w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
        </div>
        <div className="flex flex-col items-center w-full my-8">
          <SubmitButton />
        </div>
      </form>
    </>
  );
};

export default Form;
