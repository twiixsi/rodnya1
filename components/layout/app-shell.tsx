'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { DesktopNavbar } from '@/components/navigation/desktop-navbar';
import { MobileHeader } from '@/components/navigation/mobile-header';
import { MobileBottomNav } from '@/components/navigation/mobile-bottom-nav';
import { Footer } from '@/components/layout/footer';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isMobileLayout } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F1E8] text-[#283D38] flex flex-col font-sans selection:bg-[#34785D] selection:text-white">
      {/* Dynamic Header depending on Desktop or Mobile experience */}
      {isMobileLayout ? <MobileHeader /> : <DesktopNavbar />}

      {/* Main Content Area */}
      <main className={`flex-1 ${isMobileLayout ? 'pb-20 max-w-lg mx-auto w-full px-3' : 'w-full'}`}>
        {children}
      </main>

      {/* Footer is displayed for Desktop, and compact for Mobile */}
      {!isMobileLayout && <Footer />}

      {/* Mobile Sticky Bottom Navigation */}
      {isMobileLayout && <MobileBottomNav />}
    </div>
  );
}
