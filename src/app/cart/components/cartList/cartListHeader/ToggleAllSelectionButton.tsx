import useStore from '@/hooks/useStore';
import { CartProps } from '@/types/globalTypes';
import { useEffect, useState } from 'react';

const ToggleAllSelectionButton: React.FC<CartProps> = ({ cartItems }) => {
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const { toggleAllChecked } = useStore();

  useEffect(() => {
    if (
      Object.keys(cartItems).filter((itemId) => cartItems[itemId].isChecked)
        .length === Object.keys(cartItems).length
    )
      setIsAllSelected(true);
    else setIsAllSelected(false);
  }, [cartItems]);

  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={isAllSelected}
        onChange={() => {
          toggleAllChecked(cartItems, !isAllSelected);
          setIsAllSelected(!isAllSelected);
        }}
      />
      <span className="ml-2 text-sm">전체 선택</span>
    </label>
  );
};

export default ToggleAllSelectionButton;
