import React from 'react';
import Form from './components/Form';
import ReturnToLogin from './components/ReturnToLogin';

const Register: React.FC = () => {
  return (
    <div className="mt-14 flex w-full flex-col items-center justify-center">
      <div className="my-8 ">
        <h2>회원가입</h2>
      </div>
      <Form />
      <div className="flex w-full flex-col items-center">
        <ReturnToLogin />
      </div>
    </div>
  );
};
export default Register;
