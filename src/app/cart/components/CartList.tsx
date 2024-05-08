import { CartProps } from '@/types/globalTypes';
import CartListHeader from './cartList/CartListHeader';
import CartItem from './cartList/CartItem';

const CartList: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <>
      <div
        className="flex items-center justify-between mb-2 sticky bg-zinc-50 shadow py-2 px-4 z-20 rounded"
        style={{ top: '75px' }}
      >
        <CartListHeader cartItems={cartItems} />
      </div>
      <ul className="flex flex-col">
        {[...Object.keys(cartItems)].map((itemId) => (
          <CartItem
            key={itemId}
            itemId={itemId}
            cartItem={cartItems[itemId]}
            cartItems={cartItems}
          />
        ))}
      </ul>
    </>
  );
};

export default CartList;
