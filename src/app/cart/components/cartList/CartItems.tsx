import ToggleSelectButton from './cartItems/ToggleSelectButton';
import CartItemDetails from './cartItems/CartItemDetails';
import RemoveButton from './cartItems/RemoveButton';
import { CartProps } from '@/types/globalTypes';

const CartItems: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <>
      {[...Object.keys(cartItems)].map((itemId) => (
        <li
          key={itemId}
          className="shadow bg-zinc-50 dark:bg-zinc-950 mb-6 rounded flex flex-row py-6 px-4"
        >
          <div className="mr-4">
            <ToggleSelectButton
              itemId={itemId}
              cartItems={cartItems}
              isChecked={cartItems[itemId].isChecked}
            />
          </div>
          <div className="w-full">
            <CartItemDetails
              product={cartItems[itemId].product}
              count={cartItems[itemId].count}
              isChecked={cartItems[itemId].isChecked}
            />
          </div>
          <div>
            <RemoveButton itemId={itemId} />
          </div>
        </li>
      ))}
    </>
  );
};

export default CartItems;
