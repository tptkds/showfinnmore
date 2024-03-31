'use client';
import React from 'react';
import { Product, WishlistItems } from '@/types/globalTypes';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';
import { useSession } from 'next-auth/react';
import useStore from '@/hooks/useStore';

interface WishlistButtonProps {
  product: Product;
  wishlist: WishlistItems;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  wishlist,
}) => {
  const { toggleWishlistItems } = useStore();
  const { status } = useSession();

  return (
    <button
      onClick={() => {
        if (status === 'unauthenticated') {
          alert('로그인이 필요한 기능입니다.');
          return;
        }
        toggleWishlistItems(product);
      }}
      aria-label="찜"
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
