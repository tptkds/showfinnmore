import { CartProps } from '@/types/globalTypes';
import CartItems from './cartList/CartItems';
import CartListHeader from './cartList/CartListHeader';

const CartList1: React.FC<CartProps> = (props) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <CartListHeader {...props} />
      </div>
      <ul className="flex flex-col">
        <CartItems {...props} />
      </ul>
    </>
  );
};

export default CartList1;
