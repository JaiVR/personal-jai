import "./globals.css";
import type { Metadata } from 'next'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'j.ai',
  description: 'retro mac os style portfolio website',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

import localFont from 'next/font/local'
import Script from 'next/script'

const chicagoFont = localFont({
  src: '../../public/fonts/ChicagoFLF.ttf',
  variable: '--font-chicago',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={chicagoFont.variable}>
        <ClientLayout>
          {children}
        </ClientLayout>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}