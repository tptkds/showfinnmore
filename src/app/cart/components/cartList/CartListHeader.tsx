import { CartProps } from '@/types/globalTypes';
import DeleteSelectedButton from './tableHeader/DeleteSelectedButton';
import ToggleAllSelectionButton from './tableHeader/ToggleAllSelectionButton';

const CartListHeader: React.FC<CartProps> = (props) => {
  return (
    <>
      <ToggleAllSelectionButton {...props} />
      <DeleteSelectedButton {...props} />
    </>
  );
};

export default CartListHeader;
