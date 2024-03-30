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

export interface CartItems {
  [productId: string]: { product: Product; count: number };
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
