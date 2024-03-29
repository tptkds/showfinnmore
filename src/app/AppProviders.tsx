import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import ThemeProvider from './ThemeProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </StoreProvider>
  );
};
