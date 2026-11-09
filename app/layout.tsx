import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context/app-context';
import { AppShell } from '@/components/layout/app-shell';

export const metadata: Metadata = {
  title: 'Родные люди — Цифровая экосистема поддержки семьи | Беларусь',
  description: 'Единая платформа государственной поддержки материнства, детства и семьи в Республике Беларусь. Проект конкурса «100 идей для Беларуси — 2027».',
  manifest: '/manifest.json',
  applicationName: 'Родныя',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Родныя',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  keywords: [
    'Родные люди',
    'Родныя',
    'пособия на детей Беларусь',
    'семейный капитал РБ',
    'беременность календарь',
    'детские сады Минск',
    'психологическая помощь семьям',
    '100 идей для Беларуси'
  ]
};

export const viewport: Viewport = {
  themeColor: '#FFF9F5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple iOS Web App Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Родныя" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png" />

        {/* Android / General Web App Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Родныя" />
        <meta name="theme-color" content="#FFF9F5" />
      </head>
      <body>
        <AppProvider>
          <AppShell>
            {children}
          </AppShell>
        </AppProvider>
        
        {/* Service Worker Registration Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(reg) {
                      console.log('Rodnya PWA ServiceWorker registration successful with scope: ', reg.scope);
                    },
                    function(err) {
                      console.log('Rodnya PWA ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
