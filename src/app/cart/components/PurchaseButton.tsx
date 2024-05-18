interface PurchaseButtonProps {
  cartItemCount: number;
}

const PurchaseButton1: React.FC<PurchaseButtonProps> = ({ cartItemCount }) => {
  return (
    <>
      <div>
        <button
          className="w-full rounded bg-zinc-900 py-4 text-center text-white hover:bg-zinc-700 disabled:bg-zinc-500 	   "
          disabled={cartItemCount === 0}
        >
          {cartItemCount}개 상품 구매하기
        </button>
      </div>
    </>
  );
};

export default PurchaseButton1;
