import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ReactNode } from 'react';
import { AppProviders } from './AppProviders';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import { Metadata } from '@/types/globalTypes';
import AuthProvider from './AuthProvider';
import DataInitializer from './DataInitializer';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'showfinnmore',
  description: '여자 옷, 남자 옷, 악세사리, 전자제품 판매 쇼핑몰',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={'relative h-dvh overflow-x-hidden ' + roboto.className}>
        <AppProviders>
          <AuthProvider>
            <DataInitializer>
              <div className="relative h-dvh dark:bg-zinc-900 dark:text-white ">
                <div className="min-h-full	bg-neutral-100 pb-8 dark:bg-zinc-900 dark:text-white">
                  <Header />
                  <main className="z-40 mx-auto mt-12 min-w-[360px] max-w-[1550px] px-6 lg:px-16">
                    {children}
                    <SpeedInsights />
                  </main>
                </div>
                <div className="border-t ">
                  <Footer />
                </div>

                <div className="fixed bottom-10 right-10 z-20 rounded-full bg-white bg-opacity-80 shadow-lg dark:bg-zinc-700 dark:bg-opacity-80">
                  <Search />
                </div>
              </div>
            </DataInitializer>
          </AuthProvider>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
