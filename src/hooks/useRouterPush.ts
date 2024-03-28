import { useRouter } from 'next/navigation';

const useRouterPush = () => {
  const router = useRouter();
  const goHome = () => {
    router.push('/');
  };
  return { goHome };
};

export default useRouterPush;
