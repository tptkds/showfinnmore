import React from 'react';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import Form from './components/Form';

export default function Login() {
  return (
    <div className="mt-14 flex w-full flex-col items-center justify-center">
      <div className="my-8 ">
        <h2>로그인</h2>
      </div>
      <Form />

      <div className="flex w-full flex-col items-center">
        <ForgotPassword />
        <CreateAccount />
      </div>
    </div>
  );
}
