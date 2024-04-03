import { CartProps } from '@/types/globalTypes';
import DeleteSelectedButton from './tableHeader/DeleteSelectedButton';
import ToggleAllSelectionButton from './tableHeader/ToggleAllSelectionButton';

const CartListHeader: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <>
      <ToggleAllSelectionButton cartItems={cartItems} />
      <DeleteSelectedButton cartItems={cartItems} />
    </>
  );
};

export default CartListHeader;
