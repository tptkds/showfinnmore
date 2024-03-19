'use client';
import React, { useContext } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setWishlist } from '@/slices/productSlict';
import { Product, Wishlist } from '@/types/globalTypes';
import { AuthContext } from '@/app/AuthProvider';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';

interface WishlistButtonProps {
  product: Product;
  wishlist: Wishlist;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  wishlist,
}) => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const toggleWishlist = async () => {
    if (!currentUser || !currentUser.email) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    const newWishlist = { ...wishlist };
    const productID = product.id.toString();

    if (wishlist[productID]) {
      delete newWishlist[productID];
    } else {
      newWishlist[productID] = product;
    }

    const userRef = doc(db, 'users', currentUser.email);
    await updateDoc(userRef, { wishlist: newWishlist });

    dispatch(setWishlist(newWishlist));
  };

  return (
    <button
      onClick={toggleWishlist}
      aria-label="찜"
      // data-tip="찜"
      // className="tooltip"
    >
      {wishlist[product.id] ? (
        <PiHeartFill style={{ fontSize: '28px' }} />
      ) : (
        <PiHeartLight style={{ fontSize: '28px' }} />
      )}
    </button>
  );
};

export default WishlistButton;
