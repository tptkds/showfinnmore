import useRouterPush from '@/hooks/useRouterPush';

const ProductListNavigator: React.FC = () => {
  const { navigateToSelectedProductListPage } = useRouterPush();
  return (
    <button
      className="btn btn-md bg-zinc-200"
      type="button"
      onClick={() => navigateToSelectedProductListPage('all', 1)}
    >
      상품 보러가기
    </button>
  );
};

export default ProductListNavigator;
