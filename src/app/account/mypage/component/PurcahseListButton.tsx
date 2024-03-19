import { AuthContext } from '@/app/AuthProvider';
import { useAppSelector } from '@/hooks/useAppSelector';
import Link from 'next/link';
import { useContext, useRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const PurchaseListButton: React.FC = () => {
  const purchaseList = useAppSelector((state) => state.product.purchaseList);
  const modalBackground = useRef<HTMLDivElement | null>(null);
  const keys = purchaseList ? Object.keys(purchaseList) : [];
  const toggleModal = (e: any) => {
    e.preventDefault();
    if (e.target.name === 'seePurchase') {
      modalBackground.current?.classList.remove('hidden');
    } else {
      modalBackground.current?.classList.add('hidden');
    }
  };
  return (
    <>
      <button
        name="seePurchase"
        type="button"
        className="mt-4 h-12  dark:bg-white dark:text-black dark:hover:bg-zinc-300  bg-zinc-900 hover:bg-zinc-700 text-white transition duration-200 ease-in-out w-full"
        onClick={toggleModal}
        aria-label="주문내역 보기"
      >
        주문내역 보기
      </button>
      <div
        className="bg-black  z-50 bg-opacity-30 w-full h-full fixed top-0 left-0 hidden dark:bg-white dark:bg-opacity-30"
        ref={modalBackground}
      >
        <div
          aria-modal="true"
          className="absolute top-10 search-modal-center z-50  bg-white w-11/12 sm:w-8/12 xl:w-1/2 h-80svh overflow-y-auto dark:bg-zinc-900 "
        >
          <button
            name="downModal"
            className="absolute right-4 top-4 text-xl z-50 "
            onClick={toggleModal}
            aria-label="닫기"
          >
            <IoCloseSharp />
          </button>
          <div className="mt-4 bg-white dark:bg-zinc-900 dark:text-white ">
            <ul>
              {keys.map((key) => (
                <li key={key}>
                  <p>구매한 날짜: {purchaseList[key].date}</p>
                  {Object.keys(purchaseList[key].products).map((key2) => (
                    <div key={key2}>
                      <Link href={'/product/detail/' + key2}>
                        <p>{purchaseList[key].products[key2].title}</p>
                      </Link>
                      <p>{purchaseList[key].products[key2].count}개</p>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default PurchaseListButton;
