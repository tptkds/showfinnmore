import React from 'react';
import CreateAccount from './components/CreateAccount';
import Form from './components/Form';
import ForgotPassword from './components/ForgotPassword';
import ReturnToStore from './components/ReturnToStore';

export default function Login() {
  return (
    <div className="mt-14 flex flex-col justify-center w-full items-center">
      <div className="my-8 ">
        <h2>로그인</h2>
      </div>
      <Form />

      <div className="flex flex-col items-center w-full">
        <ForgotPassword />
        <CreateAccount />
      </div>
    </div>
  );
}
