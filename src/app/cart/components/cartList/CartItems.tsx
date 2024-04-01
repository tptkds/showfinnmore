import { CartProps } from '@/types/globalTypes';
import ToggleSelectButton from './cartItems/ToggleSelectButton';
import CartItemDetails from './cartItems/CartItemDetails';
import { IoCloseSharp } from 'react-icons/io5';

const CartItems: React.FC<CartProps> = (props) => {
  console.log([...Object.keys(props.cartItems)]);
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
            <IoCloseSharp />
          </div>
        </li>
      ))}
    </>
  );
};

export default CartItems;