'use client';
import useProduct from '@/hooks/useProduct';
import useStore from '@/hooks/useStore';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

interface DataInitializerProps {
  children: React.ReactNode;
}

const DataInitializer: React.FC<DataInitializerProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const { initializeUserStore, initializeStore } = useStore();
  const { setProductsStore } = useProduct();
  useEffect(() => {
    if (status === 'authenticated') {
      initializeUserStore(session.user.email);
    } else {
      initializeStore();
    }
  }, [status]);

  useEffect(() => {
    setProductsStore();
  }, []);

  return status === 'loading' ? <LoadingSpinner /> : <>{children}</>;
};

export default DataInitializer;
