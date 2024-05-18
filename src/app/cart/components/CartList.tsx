import { CartProps } from '@/types/globalTypes';
import CartListHeader from './cartList/CartListHeader';
import CartItem from './cartList/CartItem';

const CartList: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <>
      <div
        className="sticky z-20 mb-2 flex items-center justify-between rounded bg-zinc-50 px-4 py-2 shadow"
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
