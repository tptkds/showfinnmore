import useStore from '@/hooks/useStore';
import { Product } from '@/types/globalTypes';

interface QuantityAdjusterProps {
  product: Product;
  count: number;
}
const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({
  product,
  count,
}) => {
  const { incrementQuantity, decrementQuantity, changeQuantity } = useStore();

  return (
    <>
      <span className="h-8 bg-white flex rounded border">
        <button
          className="w-6 hover:bg-zinc-100 "
          type="button"
          onClick={() => decrementQuantity(product)}
        >
          -
        </button>
        <button type="button" className="w-12 hover:bg-zinc-100	">
          {count}
        </button>
        <button
          className="w-6 hover:bg-zinc-100"
          type="button"
          onClick={() => incrementQuantity(product)}
        >
          +
        </button>
      </span>
    </>
  );
};

export default QuantityAdjuster;
