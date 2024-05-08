import ToggleSelectButton from './cartItems/ToggleSelectButton';
import CartItemDetails from './cartItems/CartItemDetails';
import RemoveButton from './cartItems/RemoveButton';
import { CartItemProps } from '@/types/globalTypes';

const CartItem: React.FC<CartItemProps> = ({ itemId, cartItem, cartItems }) => {
  return (
    <li
      key={itemId}
      className="shadow bg-zinc-50 dark:bg-zinc-950 mb-6 rounded flex flex-row py-6 px-4"
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
