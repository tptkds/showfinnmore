import { CartItems } from '@/types/globalTypes';

const calculateTotal = (cartItems: CartItems): number => {
  const total = Object.keys(cartItems)
    .filter((itemId) => cartItems[itemId].isChecked === true)
    .reduce((prev, current) => {
      return (
        prev +
        cartItems[current].product.price * cartItems[current].count * 1000
      );
    }, 0);
  return total;
};

export default calculateTotal;
