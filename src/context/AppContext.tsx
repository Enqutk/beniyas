import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Listing,
  Category,
  FilterState,
  UserProfile,
  ChatThread,
  ChatMessage,
  CategoryId,
  CartItem
} from '../types';
import {
  CATEGORIES,
  MOCK_LISTINGS,
  MOCK_USER,
  MOCK_CHAT_THREADS
} from '../data/mockData';

export type ViewType =
  | 'none'
  | 'plp'
  | 'pdp'
  | 'chat'
  | 'search'
  | 'sellerProfile'
  | 'saved'
  | 'myAds'
  | 'boost'
  | 'auth'
  | 'help'
  | 'settings'
  | 'vendors';

export type MainTab = 'home' | 'categories' | 'trends' | 'sell' | 'messages' | 'me';

interface AppContextType {
  mainTab: MainTab;
  setMainTab: (tab: MainTab) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  selectedListingId: string | null;
  setSelectedListingId: (id: string | null) => void;
  selectedChatThreadId: string | null;
  setSelectedChatThreadId: (id: string | null) => void;
  selectedSellerId: string | null;
  setSelectedSellerId: (id: string | null) => void;
  
  listings: Listing[];
  categories: Category[];
  user: UserProfile;
  chatThreads: ChatThread[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  
  // UI Helpers & Actions
  openPDP: (listingId: string) => void;
  openPLP: (categoryId?: CategoryId | 'all', subcategory?: string, searchQuery?: string) => void;
  openChatForListing: (listing: Listing) => void;
  openSellerProfile: (sellerId: string) => void;
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  
  // Phone contact modal
  showContactModal: boolean;
  contactModalSeller: { name: string; phone: string; avatar: string } | null;
  openContactModal: (name: string, phone: string, avatar: string) => void;
  closeContactModal: () => void;
  
  // Chat actions
  sendMessage: (threadId: string, text: string) => void;
  
  // Listing submission
  addListing: (newListing: Partial<Listing>) => void;
  removeListing: (listingId: string) => void;
  toggleBoostListing: (listingId: string) => void;
  
  // Shell Frame toggle (Mobile frame vs full screen)
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean) => void;
  
  // Search history
  searchHistory: string[];
  addSearchHistory: (term: string) => void;
  clearSearchHistory: () => void;
  
  // Language
  language: 'EN' | 'AM';
  toggleLanguage: () => void;
  
  // Auth
  isLoggedIn: boolean;
  login: (identifier: string, pass?: string) => void;
  register: (name: string, email: string, phone: string, pass: string) => void;
  logout: () => void;

  // Unread badge count
  unreadMessagesCount: number;
  savedCount: number;

  // Shopping Cart / Bag
  cartItems: CartItem[];
  addToCart: (listing: Listing, size?: string, color?: string, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  showCartModal: boolean;
  setShowCartModal: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialParams =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialViewParam = initialParams?.get('view');

  const [mainTab, setMainTab] = useState<MainTab>(
    initialViewParam === 'vendors' ? 'me' : 'home'
  );
  const [activeView, setActiveView] = useState<ViewType>(() => {
    if (initialViewParam === 'vendors') return 'vendors';
    if (initialViewParam === 'seller') return 'sellerProfile';
    return 'none';
  });
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedChatThreadId, setSelectedChatThreadId] = useState<string | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(() =>
    initialViewParam === 'seller' ? initialParams?.get('id') || 'user_me' : null
  );

  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(MOCK_CHAT_THREADS);
  
  const [filters, setFilters] = useState<FilterState>({
    categoryId: 'all',
    sortBy: 'recommended'
  });

  const [showContactModal, setShowContactModal] = useState(false);
  const [contactModalSeller, setContactModalSeller] = useState<{
    name: string;
    phone: string;
    avatar: string;
  } | null>(null);

  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'iPhone 15 Pro',
    'Toyota Vitz',
    'Habesha Kemis',
    'Bole Apartment'
  ]);

  const [language, setLanguage] = useState<'EN' | 'AM'>('EN');

  // Auto sign-in when opening shared vendor dashboard link
  const [isLoggedIn, setIsLoggedIn] = useState(initialViewParam === 'vendors');

  // Keep shareable URL in sync for vendor / seller pages
  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeView === 'vendors') {
      url.searchParams.set('view', 'vendors');
      url.searchParams.delete('id');
      window.history.replaceState({}, '', url.toString());
    } else if (activeView === 'sellerProfile' && selectedSellerId) {
      url.searchParams.set('view', 'seller');
      url.searchParams.set('id', selectedSellerId);
      window.history.replaceState({}, '', url.toString());
    } else if (url.searchParams.has('view')) {
      url.searchParams.delete('view');
      url.searchParams.delete('id');
      const clean =
        url.pathname + (url.searchParams.toString() ? `?${url.searchParams}` : '') + url.hash;
      window.history.replaceState({}, '', clean);
    }
  }, [activeView, selectedSellerId]);

  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const addToCart = (listing: Listing, size: string = 'M', color: string = 'Black', quantity: number = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.listing.id === listing.id && item.size === size && item.color === color);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { id: `cart_${Date.now()}_${Math.random()}`, listing, size, color, quantity }];
    });
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const login = (identifier: string, _pass?: string) => {
    setIsLoggedIn(true);
    // If identifier looks like an email or phone, update user name if needed
    if (identifier && !identifier.includes('911')) {
      const parts = identifier.split('@')[0];
      const cleanName = parts.charAt(0).toUpperCase() + parts.slice(1);
      setUser(prev => ({ ...prev, name: cleanName, email: identifier.includes('@') ? identifier : prev.email }));
    }
  };

  const register = (name: string, email: string, phone: string, _pass: string) => {
    setIsLoggedIn(true);
    setUser(prev => ({
      ...prev,
      name: name || 'Baniyas Member',
      email: email || prev.email,
      phone: phone || prev.phone,
    }));
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  // Helpers
  const openPDP = (listingId: string) => {
    setSelectedListingId(listingId);
    setActiveView('pdp');
  };

  const openPLP = (categoryId?: CategoryId | 'all', subcategory?: string, searchQuery?: string) => {
    // Fresh filters so leftover price/subcity don't empty other categories
    setFilters({
      categoryId: categoryId || 'all',
      subcategory: subcategory || undefined,
      searchQuery: searchQuery || undefined,
      sortBy: 'recommended'
    });
    setActiveView('plp');
  };

  const openSellerProfile = (sellerId: string) => {
    setSelectedSellerId(sellerId);
    setActiveView('sellerProfile');
  };

  const openContactModal = (name: string, phone: string, avatar: string) => {
    setContactModalSeller({ name, phone, avatar });
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setContactModalSeller(null);
  };

  const toggleFavorite = (listingId: string) => {
    setUser(prev => {
      const isSaved = prev.savedListingIds.includes(listingId);
      const newSaved = isSaved
        ? prev.savedListingIds.filter(id => id !== listingId)
        : [...prev.savedListingIds, listingId];
      return { ...prev, savedListingIds: newSaved };
    });
  };

  const isFavorite = (listingId: string) => {
    return user.savedListingIds.includes(listingId);
  };

  const openChatForListing = (listing: Listing) => {
    // Check if chat thread already exists for this listing
    let existing = chatThreads.find(ct => ct.listingId === listing.id);
    if (!existing) {
      const newThread: ChatThread = {
        id: `chat_${Date.now()}`,
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: listing.price,
        listingImage: listing.images[0] || '',
        sellerId: listing.sellerId,
        sellerName: listing.sellerName,
        sellerAvatar: listing.sellerAvatar,
        sellerPhone: listing.sellerPhone,
        lastMessage: `Hi ${listing.sellerName}, is this still available?`,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `m_${Date.now()}`,
            senderId: 'user',
            text: `Hi ${listing.sellerName}, is this ${listing.title} still available?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      setChatThreads(prev => [newThread, ...prev]);
      setSelectedChatThreadId(newThread.id);
    } else {
      setSelectedChatThreadId(existing.id);
    }
    setActiveView('chat');
  };

  const sendMessage = (threadId: string, text: string) => {
    setChatThreads(prev =>
      prev.map(ct => {
        if (ct.id === threadId) {
          const newMsg: ChatMessage = {
            id: `msg_${Date.now()}`,
            senderId: 'user',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...ct,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...ct.messages, newMsg]
          };
        }
        return ct;
      })
    );

    // Auto simulated response from seller after 2s

    setTimeout(() => {
      setChatThreads(prev =>
        prev.map(ct => {
          if (ct.id === threadId) {
            const sellerReply: ChatMessage = {
              id: `msg_reply_${Date.now()}`,
              senderId: 'seller',
              text: 'Selam! Yes it is available. We can meet in Bole or Kazanchis. What time works best for you?',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            return {
              ...ct,
              lastMessage: sellerReply.text,
              lastMessageTime: 'Just now',
              messages: [...ct.messages, sellerReply]
            };
          }
          return ct;
        })
      );
    }, 1800);
  };

  const addListing = (newListing: Partial<Listing>) => {
    const fullListing: Listing = {
      id: `l_${Date.now()}`,
      title: newListing.title || 'New Item',
      amharicTitle: newListing.amharicTitle,
      price: newListing.price || 0,
      originalPrice: newListing.price ? Math.round(newListing.price * 1.1) : undefined,
      categoryId: newListing.categoryId || 'phones',
      subcategory: newListing.subcategory || 'General',
      condition: newListing.condition || 'Brand New',
      location: newListing.location || 'Addis Ababa',
      subcity: newListing.subcity || 'Bole',
      datePosted: 'Just now',
      viewsCount: 1,
      isNegotiable: newListing.isNegotiable ?? true,
      isVerifiedSeller: true,
      images: newListing.images && newListing.images.length > 0 ? newListing.images : [
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'
      ],
      attributes: newListing.attributes || {},
      description: newListing.description || 'Verified listing on Baniyas Store.',
      sellerId: user.id,
      sellerName: user.name,
      sellerAvatar: user.avatar,
      sellerPhone: user.phone,
      sellerRating: 5.0,
      sellerReviewsCount: 1,
      sellerResponseTime: '< 5 mins',
      sellerMemberSince: user.memberSince,
      sellerActiveAdsCount: user.activeAdsCount + 1,
      reviews: []
    };

    setListings(prev => [fullListing, ...prev]);
    setUser(prev => ({
      ...prev,
      activeAdsCount: prev.activeAdsCount + 1
    }));
  };

  const removeListing = (listingId: string) => {
    setListings(prev => prev.filter(l => l.id !== listingId));
    setUser(prev => ({
      ...prev,
      activeAdsCount: Math.max(0, prev.activeAdsCount - 1)
    }));
  };

  const toggleBoostListing = (listingId: string) => {
    setListings(prev =>
      prev.map(l => (l.id === listingId ? { ...l, isBoosted: !l.isBoosted } : l))
    );
  };

  const addSearchHistory = (term: string) => {
    if (!term.trim()) return;
    setSearchHistory(prev => [term, ...prev.filter(t => t.toLowerCase() !== term.toLowerCase())].slice(0, 8));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'EN' ? 'AM' : 'EN'));
  };

  const unreadMessagesCount = chatThreads.reduce((sum, ct) => sum + ct.unreadCount, 0);
  const savedCount = user.savedListingIds.length;

  return (
    <AppContext.Provider
      value={{
        mainTab,
        setMainTab,
        activeView,
        setActiveView,
        selectedListingId,
        setSelectedListingId,
        selectedChatThreadId,
        setSelectedChatThreadId,
        selectedSellerId,
        setSelectedSellerId,
        listings,
        categories,
        user,
        chatThreads,
        filters,
        setFilters,
        openPDP,
        openPLP,
        openChatForListing,
        openSellerProfile,
        toggleFavorite,
        isFavorite,
        showContactModal,
        contactModalSeller,
        openContactModal,
        closeContactModal,
        sendMessage,
        addListing,
        removeListing,
        toggleBoostListing,
        isPhoneFrame,
        setIsPhoneFrame,
        searchHistory,
        addSearchHistory,
        clearSearchHistory,
        language,
        toggleLanguage,
        isLoggedIn,
        login,
        register,
        logout,
        unreadMessagesCount,
        savedCount,
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        showCartModal,
        setShowCartModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
