import Link from 'next/link';
import React from 'react';

export default function CreateAccount() {
  return (
    <Link
      href="/account/register"
      className="underline underline-offset-4 text-xs mb-4"
    >
      Create account
    </Link>
  );
}