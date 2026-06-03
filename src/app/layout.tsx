import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#080E1C' },
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Premium Software Development Agency`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: ['software development agency','AI development','mobile app development','web application development','custom software','ecommerce development','UI UX design','digital transformation','SaaS development','Next.js','React','Fuserr Solutions'],
  authors: [{ name: 'Fuserr Solutions', url: SITE_URL }],
  creator: 'Fuserr Solutions',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: { type: 'website', locale: 'en_US', url: SITE_URL, siteName: SITE_NAME, title: `${SITE_NAME} — Premium Software Development Agency`, description: SITE_DESCRIPTION },
  twitter: { card: 'summary_large_image', site: '@fuserrsolutions', title: `${SITE_NAME} — Premium Software Development Agency`, description: SITE_DESCRIPTION },
  manifest: '/manifest.json',
  alternates: { canonical: SITE_URL },
};

const themeScript = `
  try {
    var t = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', t === 'dark');
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased transition-colors duration-300">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 page-enter">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
