import useStore from '@/hooks/useStore';
import { CartProps } from '@/types/globalTypes';

const DeleteSelectedButton: React.FC<CartProps> = ({ cartItems }) => {
  const { removeCartItems } = useStore();
  return (
    <button
      type="button"
      className="text-xs text-zinc-600  hover:text-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-200"
      onClick={() => {
        removeCartItems(
          Object.keys(cartItems).filter(
            (itemId) => cartItems[itemId].isChecked,
          ),
        );
      }}
    >
      선택 삭제
    </button>
  );
};

export default DeleteSelectedButton;
