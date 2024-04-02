interface PurchaseButtonProps {
  cartItemCount: number;
}

const PurchaseButton1: React.FC<PurchaseButtonProps> = ({ cartItemCount }) => {
  return (
    <>
      <div className="md:sticky  w-full" style={{ top: '275px' }}>
        <button
          className="text-center w-full rounded bg-zinc-900 hover:bg-zinc-700 text-white py-4 disabled:bg-zinc-500 	   "
          disabled={cartItemCount === 0}
        >
          {cartItemCount}개 상품 구매하기
        </button>
      </div>
    </>
  );
};

export default PurchaseButton1;
