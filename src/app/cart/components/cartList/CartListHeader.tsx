import { CartProps } from '@/types/globalTypes';
import DeleteSelectedButton from './cartListHeader/DeleteSelectedButton';
import ToggleAllSelectionButton from './cartListHeader/ToggleAllSelectionButton';

const CartListHeader: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <>
      <ToggleAllSelectionButton cartItems={cartItems} />
      <DeleteSelectedButton cartItems={cartItems} />
    </>
  );
};

export default CartListHeader;
