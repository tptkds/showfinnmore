import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import ThemeProvider from './ThemeProvider';
import DataInitializer from './DataInitializer';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class">
        <DataInitializer>{children}</DataInitializer>
      </ThemeProvider>
    </StoreProvider>
  );
};
