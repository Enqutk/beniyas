'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { DeviceFrame } from '@/components/shell/DeviceFrame';
import { Header } from '@/components/shell/Header';
import { MobileHeader } from '@/components/shell/MobileHeader';
import { MobileTabBar } from '@/components/shell/MobileTabBar';
import { ContactModal } from '@/components/common/ContactModal';
import { CartModal } from '@/components/common/CartModal';
import { HomeView } from '@/components/home/HomeView';
import { TrendsView } from '@/components/home/TrendsView';
import { CategoriesView } from '@/components/categories/CategoriesView';
import { SearchView } from '@/components/search/SearchView';
import { ListingResultsView } from '@/components/plp/ListingResultsView';
import { ListingDetailView } from '@/components/pdp/ListingDetailView';
import { SellWizardView } from '@/components/sell/SellWizardView';
import { SellerProfileView } from '@/components/seller/SellerProfileView';
import { SavedView } from '@/components/saved/SavedView';
import { MeView } from '@/components/me/MeView';
import { MyAdsView } from '@/components/me/MyAdsView';
import { BoostPaywallModal } from '@/components/me/BoostPaywallModal';
import { AuthModal } from '@/components/me/AuthModal';
import { SafetyHelpView } from '@/components/me/SafetyHelpView';
import { VendorsDashboardView } from '@/components/vendor/VendorsDashboardView';

export function AppShell() {
  const { mainTab, activeView } = useApp();

  const hideMobileChromeHeader =
    ['pdp', 'search'].includes(activeView) ||
    (activeView === 'none' && ['categories', 'trends'].includes(mainTab));

  const renderViewOverlay = () => {
    switch (activeView) {
      case 'plp':
        return <ListingResultsView />;
      case 'pdp':
        return <ListingDetailView />;
      case 'search':
        return <SearchView />;
      case 'sellerProfile':
        return <SellerProfileView />;
      case 'saved':
        return <SavedView />;
      case 'myAds':
        return <MyAdsView />;
      case 'boost':
        return <BoostPaywallModal />;
      case 'auth':
        return <AuthModal />;
      case 'help':
        return <SafetyHelpView />;
      case 'vendors':
        return <VendorsDashboardView />;
      case 'chat':
        return null;
      default:
        return null;
    }
  };

  const renderMainTab = () => {
    switch (mainTab) {
      case 'home':
        return <HomeView />;
      case 'categories':
        return (
          <>
            <div className="md:hidden">
              <CategoriesView />
            </div>
            <div className="hidden md:block">
              <HomeView />
            </div>
          </>
        );
      case 'trends':
        return <TrendsView />;
      case 'sell':
        return <SellWizardView />;
      case 'messages':
        return <MeView />;
      case 'me':
        return <MeView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <DeviceFrame>
      {!['pdp', 'search'].includes(activeView) && (
        <div className="hidden md:block">
          <Header />
        </div>
      )}
      {!hideMobileChromeHeader && (
        <div className="block md:hidden">
          <MobileHeader />
        </div>
      )}

      <main className="flex-1 overflow-x-hidden min-h-0">
        {activeView !== 'none' && activeView !== 'chat' ? renderViewOverlay() : renderMainTab()}
      </main>

      <MobileTabBar />
      <ContactModal />
      <CartModal />
    </DeviceFrame>
  );
}
