import { CartProps } from '@/types/globalTypes';
import CartItems from './cartList/CartItems';
import CartListHeader from './cartList/CartListHeader';

const CartList: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <CartListHeader cartItems={cartItems} />
      </div>
      <ul className="flex flex-col">
        <CartItems cartItems={cartItems} />
      </ul>
    </>
  );
};

export default CartList;
