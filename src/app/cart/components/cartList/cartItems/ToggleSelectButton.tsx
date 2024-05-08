import useStore from '@/hooks/useStore';
import { CartItemProps } from '@/types/globalTypes';

const ToggleSelectButton: React.FC<CartItemProps> = ({
  cartItems,
  cartItem,
  itemId,
}) => {
  const { toggleChecked } = useStore();
  return (
    <input
      type="checkbox"
      checked={cartItem.isChecked}
      onChange={() => {
        toggleChecked(cartItems, itemId);
      }}
    ></input>
  );
};

export default ToggleSelectButton;
