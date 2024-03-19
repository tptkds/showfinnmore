import Link from 'next/link';
import React from 'react';

const ReturnToStore: React.FC = () => {
  return (
    <Link href="/" className="underline underline-offset-4  mb-4">
      메인화면
    </Link>
  );
};
export default ReturnToStore;
