'use client';

import { useFormStatus } from 'react-dom';

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <button
      aria-disabled={pending}
      aria-label="로그인하기"
      type="submit"
      className="h-12  bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-300  text-white transition duration-200 ease-in-out  w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3"
    >
      {pending ? '로그인 중' : '로그인하기'}
    </button>
  );
};
export default SubmitButton;
