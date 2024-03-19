import { CartItems, CheckBoxes } from '@/types/globalTypes';

interface SummaryProps {
  checkBoxes: CheckBoxes;
  cartItems: CartItems;
}
const Summary: React.FC<SummaryProps> = ({ checkBoxes, cartItems }) => {
  return (
    <>
      <div className="flex">
        <p className="text-right ">합계: </p>
        <p className="text-right  pl-2">
          $
          {Object.keys(checkBoxes)
            .filter((key: any) => checkBoxes[key] === true)
            .reduce((prev, key) => {
              return (
                prev + cartItems[key]?.product?.price * cartItems[key]?.count
              );
            }, 0)
            .toFixed(2)}
        </p>
      </div>
      <div className=" flex mt-2">
        <p className="text-right ">VAT: </p>
        <p className="text-right pl-2">
          $
          {(
            Object.keys(checkBoxes)
              .filter((key: any) => checkBoxes[key] === true)
              .reduce((prev, key) => {
                return (
                  prev + cartItems[key]?.product?.price * cartItems[key]?.count
                );
              }, 0) * 0.1
          ).toFixed(2)}
        </p>
      </div>
      <div className=" mt-2 flex">
        <p className="text-right">총 합계: </p>
        <p className="text-right pl-2">
          $
          {(
            Object.keys(checkBoxes)
              .filter((key: any) => checkBoxes[key] === true)
              .reduce((prev, key) => {
                return (
                  prev + cartItems[key]?.product.price * cartItems[key]?.count
                );
              }, 0) * 1.1
          ).toFixed(2)}
        </p>
      </div>
    </>
  );
};

export default Summary;
