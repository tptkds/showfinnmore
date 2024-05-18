import Link from 'next/link';
import React from 'react';

export default function ForgotPassword() {
  return (
    <Link
      href="/account/reset-password"
      className="mb-4 underline  underline-offset-4"
    >
      패스워드 찾기
    </Link>
  );
}
