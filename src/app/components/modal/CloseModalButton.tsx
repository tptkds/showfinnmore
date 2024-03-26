import { IoCloseSharp } from 'react-icons/io5';

interface CloseModalButtonProps {
  toggleModal: () => void;
}
const CloseModalButton: React.FC<CloseModalButtonProps> = ({ toggleModal }) => {
  return (
    <button
      name="downModal"
      className="absolute right-4 top-4 text-xl "
      onClick={toggleModal}
      aria-label="닫기"
    >
      <IoCloseSharp />
    </button>
  );
};

export default CloseModalButton;
