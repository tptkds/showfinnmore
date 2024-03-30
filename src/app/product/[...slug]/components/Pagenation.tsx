'use client';
import useProduct from '@/hooks/useProduct';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagenation: React.FC = () => {
  const {
    currentTotalPage,
    currentPage,
    incrementPageNumber,
    decrementPageNumber,
    setPageNumber,
  } = useProduct();

  return (
    <>
      <div className="flex justify-center">
        <button
          name="newer"
          className="p-2.5 flex items-center disabled:opacity-20 "
          onClick={() => incrementPageNumber()}
          disabled={currentPage === 1}
          style={{ fontSize: '20px' }}
          aria-label="다음 페이지"
        >
          <FiChevronLeft />
        </button>
        <ul className="flex justify-center ">
          {Array.from(
            { length: currentTotalPage },
            (_, index) => index + 1
          ).map((page) => (
            <li key={page} className="p-2.5">
              <button
                className="disabled:text-zinc-300 text-black  text-base dark:text-white dark:disabled:text-zinc-300"
                onClick={() => setPageNumber(page, true)}
                disabled={page === currentPage}
                aria-label={`${page} page`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
        <button
          name="older"
          className="flex items-center disabled:opacity-20 p-2.5"
          onClick={() => decrementPageNumber()}
          disabled={currentPage === currentTotalPage}
          style={{ fontSize: '20px' }}
          aria-label="이전 페이지"
        >
          <FiChevronRight />
        </button>
      </div>
    </>
  );
};

export default Pagenation;
