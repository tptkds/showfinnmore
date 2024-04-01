import { CartProps } from '@/types/globalTypes';

const DeleteSelectedButton: React.FC<CartProps> = (props) => {
  return (
    <button
      type="button"
      className="text-zinc-600 dark:text-zinc-400  hover:text-zinc-400 dark:hover:text-zinc-200 text-xs"
    >
      선택 삭제
    </button>
  );
};

export default DeleteSelectedButton;
