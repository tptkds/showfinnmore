import { CATEGORIES } from '@/constants/product';

export interface Metadata {
  title: string;
  description: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  count: number;
  isChecked: boolean;
}
export interface CartItemProps {
  cartItems: CartItems;
  itemId: string;
  cartItem: CartItem;
}

export interface CartItems {
  [productId: string]: CartItem;
}

export interface WishlistItems {
  [productId: string]: Product;
}
export interface CheckBoxes {
  [key: string]: boolean;
}

export interface ModalContentsProps {
  toggleModal: () => void;
}

export interface FirebaseError extends Error {
  code: string;
}

export interface registerUserProps {
  email: string;
  password: string;
  displayName: string;
}

export interface Categories {
  all: string;
  women: string;
  men: string;
  jewelery: string;
  electronics: string;
}

export type CategoryKey = keyof typeof CATEGORIES;

export interface ProductProps {
  category: CategoryKey;
  page: number;
}

export interface CartProps {
  cartItems: CartItems;
}
