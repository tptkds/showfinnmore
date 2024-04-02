import { CartItems, IsCheckedItems } from '@/types/globalTypes';

const calculateTotal = (
  cartItems: CartItems,
  isCheckedItems: IsCheckedItems
): number => {
  const total = Object.keys(cartItems)
    .filter((key) => isCheckedItems[key])
    .reduce((prev, current) => {
      return (
        prev +
        cartItems[current].product.price * cartItems[current].count * 1000
      );
    }, 0);
  return total;
};

export default calculateTotal;
