import useStore from '@/hooks/useStore';
import { CartItems } from '@/types/globalTypes';

interface CartItemDetailsProps {
  itemId: string;
  cartItems: CartItems;
}
const CartItemDetails: React.FC<CartItemDetailsProps> = ({
  itemId,
  cartItems,
}) => {
  const { incrementQuantity, decrementQuantity, changeQuantity } = useStore();
  return (
    <div>
      <div>
        <div>{/* <Image /> */}</div>
      </div>
      <div>
        <p>{cartItems[itemId].product.title}</p>
      </div>
      <div>
        <div>
          <button
            type="button"
            onClick={() => decrementQuantity(cartItems[itemId].product)}
          >
            -
          </button>
          <input
            type="number"
            value={Number(cartItems[itemId].count ?? 0)}
            onChange={(e) =>
              changeQuantity(cartItems[itemId].product, Number(e.target.value))
            }
          />
          <button
            type="button"
            onClick={() => incrementQuantity(cartItems[itemId].product)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemDetails;
