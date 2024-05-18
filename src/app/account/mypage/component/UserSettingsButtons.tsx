import AccountEditingModalContents from './modal/AccountEditingModalContents';
import Modal from '@/app/components/Modal';
import { toggleModal } from '../../../../utils/modal';
import { useState } from 'react';
const UserSettingsButtons: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <button
        type="button"
        className="py-2 dark:bg-white dark:text-black dark:hover:bg-zinc-300  bg-white hover:bg-zinc-100 text-white transition duration-200 ease-in-out w-[240px] md:w-full rounded"
        onClick={() => {
          toggleModal(isModalOpen, setIsModalOpen);
          setSelectedButton('changeName');
        }}
        aria-label="이름 변경하기"
      >
        이름 변경
      </button>
      <button
        type="button"
        className="py-2 mt-4  dark:bg-white dark:text-black dark:hover:bg-zinc-300  bg-white hover:bg-zinc-100 text-white transition duration-200 ease-in-out w-[240px] md:w-full rounded"
        onClick={() => {
          toggleModal(isModalOpen, setIsModalOpen);
          setSelectedButton('changePassword');
        }}
        aria-label="패스워드 변경하기"
      >
        패스워드 변경
      </button>
      <Modal
        toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
        isModalOpen={isModalOpen}
      >
        <AccountEditingModalContents
          toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
          selectedButton={selectedButton}
        />
      </Modal>
    </>
  );
};

export default UserSettingsButtons;
