import useStore from '@/hooks/useStore';
import { IoCloseSharp } from 'react-icons/io5';
interface RemoveButtonProps {
  itemId: string | number;
}
const RemoveButton: React.FC<RemoveButtonProps> = ({ itemId }) => {
  const { removeCartItem } = useStore();
  return (
    <>
      <button type="button" onClick={() => removeCartItem(itemId)}>
        <IoCloseSharp />
      </button>
    </>
  );
};

export default RemoveButton;
