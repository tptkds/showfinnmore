import { CartProps } from '@/types/globalTypes';
import CartItems from './cartList/CartItems';
import CartListHeader from './cartList/CartListHeader';

const CartList: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <>
      <div
        className="flex items-center justify-between mb-2 sticky bg-zinc-50 shadow py-2 px-2 z-20 rounded"
        style={{ top: '75px' }}
      >
        <CartListHeader cartItems={cartItems} />
      </div>
      <ul className="flex flex-col">
        <CartItems cartItems={cartItems} />
      </ul>
    </>
  );
};

export default CartList;
