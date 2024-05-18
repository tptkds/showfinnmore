export const toggleModal = (
  isModalOpen: boolean,
  setIsModalOpen: (isModalOpen: boolean) => void,
) => {
  setIsModalOpen(!isModalOpen);
};
