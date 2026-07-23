import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/shell/DeviceFrame';
import { Header } from './components/shell/Header';
import { MobileHeader } from './components/shell/MobileHeader';
import { MobileTabBar } from './components/shell/MobileTabBar';
import { ContactModal } from './components/common/ContactModal';
import { CartModal } from './components/common/CartModal';

// Views
import { HomeView } from './components/home/HomeView';
import { TrendsView } from './components/home/TrendsView';
import { CategoriesView } from './components/categories/CategoriesView';
import { SearchView } from './components/search/SearchView';
import { ListingResultsView } from './components/plp/ListingResultsView';
import { ListingDetailView } from './components/pdp/ListingDetailView';
import { SellWizardView } from './components/sell/SellWizardView';
import { SellerProfileView } from './components/seller/SellerProfileView';
import { SavedView } from './components/saved/SavedView';
import { MeView } from './components/me/MeView';
import { MyAdsView } from './components/me/MyAdsView';
import { BoostPaywallModal } from './components/me/BoostPaywallModal';
import { AuthModal } from './components/me/AuthModal';
import { SafetyHelpView } from './components/me/SafetyHelpView';
import { VendorsDashboardView } from './components/vendor/VendorsDashboardView';

function AppContent() {
  const { mainTab, activeView } = useApp();

  const hideMobileChromeHeader =
    ['pdp', 'search'].includes(activeView) ||
    (activeView === 'none' && ['categories', 'trends'].includes(mainTab));

  // Render Overlay View if set
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
      // Chat deferred to next phase — ignore if somehow set
      case 'chat':
        return null;
      default:
        return null;
    }
  };

  // Render Main Tab — desktop uses hover mega-menu for categories (Shein-style);
  // CategoriesView stays for mobile tab navigation only.
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
      // Chat deferred — fall back to Me
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
      {/* Header Navigation: Desktop Header on md+ screens, Mobile Header on Shop/Me */}
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

      {/* Main View Area */}
      <main className="flex-1 overflow-x-hidden min-h-0">
        {activeView !== 'none' && activeView !== 'chat' ? renderViewOverlay() : renderMainTab()}
      </main>

      {/* Persistent Tab Bar */}
      <MobileTabBar />

      {/* Phone Contact Modal */}
      <ContactModal />

      {/* Shopping Cart Modal */}
      <CartModal />
    </DeviceFrame>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
