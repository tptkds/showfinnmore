import React from 'react';
import Form from './components/Form';
import ReturnToLogin from './components/ReturnToLogin';

export default function Register() {
  return (
    <div className="mt-14 flex flex-col justify-center w-full items-center">
      <div className="my-8 text-sm">
        <h2>Create Account</h2>
      </div>
      <Form />
      <div className="flex flex-col items-center w-full">
        <ReturnToLogin />
      </div>
    </div>
  );
}
