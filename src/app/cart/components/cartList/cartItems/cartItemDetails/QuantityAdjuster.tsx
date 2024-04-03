import Modal from '@/app/components/Modal';
import useStore from '@/hooks/useStore';
import { Product } from '@/types/globalTypes';
import { toggleModal } from '@/utils/modal';
import { useState } from 'react';
import QuantityAdjusterModalContents from './quantityAdjuster/QuantityAdjusterModalContents';

interface QuantityAdjusterProps {
  product: Product;
  count: number;
}
const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({
  product,
  count,
}) => {
  const { incrementQuantity, decrementQuantity } = useStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <span className="h-8 bg-white flex rounded border">
        <button
          className="w-6 hover:bg-zinc-100 disabled:"
          type="button"
          onClick={() => decrementQuantity(product, count)}
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
          onClick={() => incrementQuantity(product, count)}
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
          toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
        />
      </Modal>
    </>
  );
};

export default QuantityAdjuster;
