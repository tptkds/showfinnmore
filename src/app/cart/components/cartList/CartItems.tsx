import { CartProps } from '@/types/globalTypes';
import ToggleSelectButton from './cartItems/ToggleSelectButton';
import CartItemDetails from './cartItems/CartItemDetails';
import RemoveButton from './cartItems/RemoveButton';

const CartItems: React.FC<CartProps> = (props) => {
  return (
    <>
      {[...Object.keys(props.cartItems)].map((itemId) => (
        <li
          key={itemId}
          className="shadow bg-zinc-50 dark:bg-zinc-950 mb-6 rounded flex flex-row py-6 px-4"
        >
          <div className="mr-4">
            <ToggleSelectButton
              itemId={itemId}
              isCheckedItems={props.isCheckedItems}
              setIsCheckedItems={props.setIsCheckedItems}
            />
          </div>
          <div className="w-full">
            <CartItemDetails
              product={props.cartItems[itemId].product}
              count={props.cartItems[itemId].count}
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
