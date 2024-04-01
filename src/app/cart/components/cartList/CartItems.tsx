import { CartProps } from '@/types/globalTypes';
import ToggleSelectButton from './cartItems/ToggleSelectButton';
import CartItemDetails from './cartItems/CartItemDetails';

const CartItems: React.FC<CartProps> = (props) => {
  return (
    <>
      {[...Object.keys(props.cartItems)].length === 0 ? (
        <div>장바구니가 비어있습니다.</div>
      ) : (
        [...Object.keys(props.cartItems)].map((itemId) => (
          <li key={itemId} className="bg-zinc-100 mb-6 rounded">
            <div>
              <ToggleSelectButton
                itemId={itemId}
                isCheckedItems={props.isCheckedItems}
                setIsCheckedItems={props.setIsCheckedItems}
              />
            </div>
            <div>
              <CartItemDetails itemId={itemId} cartItems={props.cartItems} />
            </div>
          </li>
        ))
      )}
    </>
  );
};

export default CartItems;
