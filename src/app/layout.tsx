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
      <body className={'overflow-x-hidden h-dvh relative ' + roboto.className}>
        <AppProviders>
          <AuthProvider>
            <DataInitializer>
              <div className="relative h-dvh dark:bg-zinc-900 dark:text-white ">
                <div className="bg-neutral-100	min-h-full dark:bg-zinc-900 dark:text-white pb-8">
                  <Header />
                  <main className="z-40 mt-12 px-6 sm:px-16 min-w-[360px] max-w-[1300px] mx-auto">
                    {children}
                    <SpeedInsights />
                  </main>
                </div>
                <div className="border-t ">
                  <Footer />
                </div>

                <div className="absolute top-[6px] sm:top-auto left-1/2 sm:left-auto transform -translate-x-1/2 sm:transform-none sm:translate-x-0 sm:fixed sm:bottom-10 sm:right-10 sm:bg-white sm:shadow-lg rounded-full bg-opacity-80 dark:bg-opacity-80 z-20 sm:dark:bg-zinc-700">
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
