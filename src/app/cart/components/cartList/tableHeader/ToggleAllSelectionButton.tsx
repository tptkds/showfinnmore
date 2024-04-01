import { CartProps } from '@/types/globalTypes';
import { useState } from 'react';

const ToggleAllSelectionButton: React.FC<CartProps> = (props) => {
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={isAllSelected}
        onChange={() => setIsAllSelected(!isAllSelected)}
      />
      <span className="ml-2 text-sm">전체 선택</span>
    </label>
  );
};

export default ToggleAllSelectionButton;
