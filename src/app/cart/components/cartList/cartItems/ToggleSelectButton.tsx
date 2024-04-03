import useStore from '@/hooks/useStore';
import { CartItemProps, CartItems } from '@/types/globalTypes';

const ToggleSelectButton: React.FC<CartItemProps> = ({
  cartItems,
  itemId,
  isChecked = false,
}) => {
  const { toggleChecked } = useStore();
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => {
        toggleChecked(cartItems, itemId);
      }}
    ></input>
  );
};

export default ToggleSelectButton;
