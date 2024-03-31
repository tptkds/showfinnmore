import Skeleton from 'react-loading-skeleton';

const ProductListSkeleton: React.FC = () => {
  return (
    <ul className="mt-28 grid grid-cols-1 gap-8 min-h-screen sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <li key={index} className="relative h-full animate-pulse pb-36">
          <div className="h-4/5 mb-4 skeleton ">
            <Skeleton height="100%" />
          </div>
          <div className="skeleton ">
            <Skeleton height={20} width={`60%`} />
          </div>
          <div className="mt-2 mb-24 skeleton ">
            <Skeleton height={20} width={`30%`} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductListSkeleton;
