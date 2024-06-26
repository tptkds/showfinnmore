import Modal from '@/app/components/Modal';
import useStore from '@/hooks/useStore';
import { Product } from '@/types/globalTypes';
import { toggleModal } from '@/utils/modal';
import { useState } from 'react';
import QuantityAdjusterModalContents from './quantityAdjuster/QuantityAdjusterModalContents';

interface QuantityAdjusterProps {
  product: Product;
  count: number;
  isChecked: boolean;
}
const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({
  product,
  count,
  isChecked,
}) => {
  const { incrementQuantity, decrementQuantity } = useStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <span className="flex h-8 rounded border bg-white">
        <button
          className="disabled: w-6 hover:bg-zinc-100"
          type="button"
          onClick={() => decrementQuantity(product, count, isChecked)}
          disabled={count === 1}
        >
          -
        </button>
        <button
          type="button"
          className="w-12 hover:bg-zinc-100	"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {count}
        </button>
        <button
          className="w-6 hover:bg-zinc-100"
          type="button"
          onClick={() => incrementQuantity(product, count, isChecked)}
          disabled={count === 9999}
        >
          +
        </button>
      </span>
      <Modal
        isModalOpen={isModalOpen}
        toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
      >
        <QuantityAdjusterModalContents
          product={product}
          count={count}
          isChecked={isChecked}
          toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
        />
      </Modal>
    </>
  );
};

export default QuantityAdjuster;
