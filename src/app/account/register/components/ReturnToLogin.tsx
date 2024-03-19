import Link from 'next/link';
import React from 'react';

const ReturnToLogin: React.FC = () => {
  return (
    <Link href="/account/login" className="underline underline-offset-4 mb-4">
      로그인 페이지
    </Link>
  );
};
export default ReturnToLogin;
