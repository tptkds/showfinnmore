import { CartProps } from '@/types/globalTypes';

const DeleteSelectedButton: React.FC<CartProps> = (props) => {
  return (
    <button type="button" className="text-zinc-600 hover:text-zinc-400 text-xs">
      선택 삭제
    </button>
  );
};

export default DeleteSelectedButton;
