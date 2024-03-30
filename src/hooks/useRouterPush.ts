import { useRouter } from 'next/navigation';

const useRouterPush = () => {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  const navigateToSelectedProductListPage = (
    category: string,
    page: number
  ) => {
    router.push(`/product/${category}/${page}`);
  };

  return { goHome, navigateToSelectedProductListPage };
};

export default useRouterPush;
