import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ReactNode } from 'react';
import { AppProviders } from './AppProviders';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import { Metadata } from '@/types/globalTypes';

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
      <body className="overflow-x-hidden select-none h-dvh relative">
        <AppProviders>
          <div className="relative h-dvh dark:bg-zinc-900 dark:text-white">
            <div className="min-h-full dark:bg-zinc-900 dark:text-white">
              <Header />
              <main className="z-40 px-4 sm:px-12">
                {children}
                <SpeedInsights />
              </main>
            </div>
            <Footer />
            <div className="fixed bottom-10 right-10 bg-white shadow-lg rounded-full bg-opacity-80 dark:bg-opacity-80 z-20 dark:bg-zinc-700">
              <Search />
            </div>
          </div>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
