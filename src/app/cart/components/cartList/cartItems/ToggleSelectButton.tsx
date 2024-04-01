import { IsCheckedItems, SetIsCheckedItems } from '@/types/globalTypes';

interface ToggleSelectButtonProps {
  itemId: string;
  isCheckedItems: IsCheckedItems;
  setIsCheckedItems: SetIsCheckedItems;
}
const ToggleSelectButton: React.FC<ToggleSelectButtonProps> = ({
  itemId,
  isCheckedItems,
  setIsCheckedItems,
}) => {
  return (
    <input
      type="checkbox"
      checked={isCheckedItems[itemId] ?? false}
      onChange={() => {
        setIsCheckedItems({
          ...isCheckedItems,
          [itemId]: !isCheckedItems[itemId],
        });
      }}
    ></input>
  );
};

export default ToggleSelectButton;
