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
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ['latin'], // 또는 preload: false
  weight: ['100', '400', '700', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
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
      <body
        className={'overflow-x-hidden h-dvh relative ' + notoSansKr.className}
      >
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

                <div className="fixed bottom-10 right-10 bg-white shadow-lg rounded-full bg-opacity-80 dark:bg-opacity-80 z-20 dark:bg-zinc-700">
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
