import ToggleSelectButton from './cartItems/ToggleSelectButton';
import CartItemDetails from './cartItems/CartItemDetails';
import RemoveButton from './cartItems/RemoveButton';
import { CartItemProps } from '@/types/globalTypes';

const CartItem: React.FC<CartItemProps> = ({ itemId, cartItem, cartItems }) => {
  return (
    <li
      key={itemId}
      className="mb-6 flex flex-row rounded bg-zinc-50 px-4 py-6 shadow dark:bg-zinc-950"
    >
      <div className="mr-4">
        <ToggleSelectButton
          itemId={itemId}
          cartItem={cartItem}
          cartItems={cartItems}
        />
      </div>
      <div className="w-full">
        <CartItemDetails
          itemId={itemId}
          cartItem={cartItem}
          cartItems={cartItems}
        />
      </div>
      <div>
        <RemoveButton itemId={itemId} />
      </div>
    </li>
  );
};

export default CartItem;
