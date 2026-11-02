import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context/app-context';
import { AppShell } from '@/components/layout/app-shell';

export const metadata: Metadata = {
  title: 'Родныя — Цифровая экосистема поддержки семьи | Беларусь',
  description: 'Единая платформа государственной поддержки материнства, детства и семьи в Республике Беларусь. Проект конкурса «100 идей для Беларуси — 2027».',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192.png',
  },
  keywords: [
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
  themeColor: '#34785D',
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
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
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
