import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import ThemeProvider from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import DataInitializer from './DataInitializer';
import { SessionProvider } from 'next-auth/react';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class">
        <AuthProvider>
          <SessionProvider>
            <DataInitializer>{children}</DataInitializer>
          </SessionProvider>
        </AuthProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
