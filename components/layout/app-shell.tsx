'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { DesktopNavbar } from '@/components/navigation/desktop-navbar';
import { MobileHeader } from '@/components/navigation/mobile-header';
import { MobileBottomNav } from '@/components/navigation/mobile-bottom-nav';
import { Footer } from '@/components/layout/footer';
import { DownloadAppModal } from '@/components/modals/download-app-modal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMobileLayout } = useApp();
  const isHomePage = pathname === '/';

  // On the home, benefits, health, psychology, infrastructure and about pages, page.tsx renders its own two independent, pixel-perfect layouts (Desktop and Mobile)
  const isStandalonePage = pathname === '/' || pathname === '/benefits' || pathname === '/health' || pathname === '/psychology' || pathname === '/about' || pathname === '/infrastructure';
  if (isStandalonePage) {
    return (
      <div className="min-h-screen bg-[#FFF9F5] text-[#283D38] font-sans selection:bg-[#34785D] selection:text-white">
        {children}
        <DownloadAppModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#283D38] flex flex-col font-sans selection:bg-[#34785D] selection:text-white">
      {/* Dynamic Header depending on Desktop or Mobile experience */}
      {isMobileLayout ? <MobileHeader /> : <DesktopNavbar />}

      {/* Main Content Area */}
      <main className={`flex-1 ${isMobileLayout ? 'pb-20 max-w-md mx-auto w-full px-4' : 'w-full'}`}>
        {children}
      </main>

      {/* Footer is displayed for Desktop */}
      {!isMobileLayout && <Footer />}

      {/* Mobile Sticky Bottom Navigation */}
      {isMobileLayout && <MobileBottomNav />}

      {/* Global Download & Install App Modal */}
      <DownloadAppModal />
    </div>
  );
}
