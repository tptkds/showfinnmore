import Link from 'next/link';
import React from 'react';

const CreateAccount: React.FC = () => {
  return (
    <Link
      href="/account/register"
      className="mb-4 underline  underline-offset-4"
    >
      회원가입
    </Link>
  );
};
export default CreateAccount;
