import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#080E1C',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Premium Software Development Agency`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'software development agency',
    'AI development',
    'mobile app development',
    'web application development',
    'custom software',
    'ecommerce development',
    'UI UX design',
    'digital transformation',
    'SaaS development',
    'Next.js development',
    'React development',
    'Python AI',
    'machine learning',
    'Fuserr Solutions',
  ],
  authors: [{ name: 'Fuserr Solutions', url: SITE_URL }],
  creator: 'Fuserr Solutions',
  publisher: 'Fuserr Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Premium Software Development Agency`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Fuserr Solutions — Premium Software Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fuserrsolutions',
    creator: '@fuserrsolutions',
    title: `${SITE_NAME} — Premium Software Development Agency`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-navy-900 text-[#E8E8E8] antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 page-enter">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
