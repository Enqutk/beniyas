import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Crown,
  MapPin,
  CreditCard,
  Ruler,
  Settings as SettingsIcon,
  Plus,
  Minus,
  MessageSquare,
  Gift,
  HelpCircle,
  Truck,
  RotateCcw,
  Shield,
  FileText,
  Accessibility,
  LogOut,
  ChevronRight,
  X,
  Package,
  Heart,
  Store,
  Clock,
  ExternalLink,
  Edit2,
  Check,
  AlertCircle,
  Phone,
  Mail,
  Lock,
  PlusCircle,
  Sliders,
  Bell,
  Sparkles
} from 'lucide-react';
import { ProductCard } from '../common/ProductCard';

export const MeView: React.FC = () => {
  const { user, listings, setActiveView, isLoggedIn, logout, setMainTab } = useApp();

  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState<'wishlist' | 'following' | 'recent'>('wishlist');

  // Interactive Sub-Panels State
  const [activeSubPanel, setActiveSubPanel] = useState<
    'profile' | 'address' | 'payment' | 'measurements' | 'policy' | 'preferences' | 'none'
  >('none');

  // Policy Modal Title
  const [policyModalTitle, setPolicyModalTitle] = useState('Shipping Info');

  // Expandable left sidebar sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    assets: false,
    orders: false,
    favorites: false,
    customerService: false,
    otherServices: true,
    policy: true,
    accessibility: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const savedListings = listings.filter(l => user.savedListingIds.includes(l.id));
  const recentListings = listings.slice(0, 6);

  // Address book mock
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: user.name,
      phone: user.phone,
      subcity: 'Bole Subcity, Woreda 03',
      landmark: 'Near Medhanialem Church, House #402',
      city: 'Addis Ababa',
      isDefault: true,
    },
  ]);

  const [newSubcity, setNewSubcity] = useState('Kazanchis');
  const [newLandmark, setNewLandmark] = useState('Near Intercontinental Hotel');
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Measurements state
  const [measurements, setMeasurements] = useState({
    height: '172 cm',
    weight: '65 kg',
    bust: '90 cm',
    waist: '72 cm',
    hips: '95 cm',
    shoeSize: 'EU 40',
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: user.name,
        phone: user.phone,
        subcity: `${newSubcity} Subcity`,
        landmark: newLandmark,
        city: 'Addis Ababa',
        isDefault: false,
      },
    ]);
    setShowAddAddress(false);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen text-gray-900 pb-24">
      {/* Mobile Shein-style Me header */}
      <div className="md:hidden bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <button
            type="button"
            onClick={() => (isLoggedIn ? setActiveSubPanel('profile') : setActiveView('auth'))}
            className="text-left"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black text-black">
                {isLoggedIn ? user.name.split(' ')[0] : 'Sign in / Register'}
              </span>
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                S0
              </span>
            </div>
            {!isLoggedIn && (
              <p className="text-[11px] text-gray-500 mt-0.5">Tap to access orders & wishlist</p>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveSubPanel('preferences')}
            className="p-1 text-gray-700"
            aria-label="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop breadcrumb */}
      <div className="hidden md:flex bg-white border-b border-gray-200 px-4 md:px-8 py-2.5 text-xs text-gray-500 items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setMainTab('home')} className="hover:text-black font-medium">
            Home
          </button>
          <span>/</span>
          <span className="font-bold text-black">Personal Center</span>
        </div>
        {!isLoggedIn && (
          <button
            onClick={() => setActiveView('auth')}
            className="text-xs font-black text-amber-600 hover:underline flex items-center gap-1"
          >
            <span>Sign In / Register</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-6">
        {/* If logged out banner prompt — desktop only (mobile uses header CTA) */}
        {!isLoggedIn && (
          <div className="hidden md:flex bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border border-amber-300 rounded-2xl p-4 md:p-6 mb-6 flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shrink-0 font-black text-xl shadow-md">
                B
              </div>
              <div>
                <h3 className="font-black text-base text-gray-900">Welcome to Baniyas Personal Center</h3>
                <p className="text-xs text-gray-600">
                  Sign in or create an account to view your orders, coupons, points, and saved addresses.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setActiveView('auth')}
                className="flex-1 md:flex-initial px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
              >
                Sign In / Login
              </button>
              <button
                onClick={() => setActiveView('auth')}
                className="flex-1 md:flex-initial px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
              >
                Register
              </button>
            </div>
          </div>
        )}

        {/* Main Personal Center Layout: Left Nav + Center Dashboard + Right Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start">
          {/* LEFT SIDEBAR — desktop only */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-xl shadow-xs border border-gray-200/80 p-4 space-y-4">
            <h2 className="font-black text-base md:text-lg text-black border-b border-gray-100 pb-3 uppercase tracking-wider flex items-center justify-between">
              <span>Personal Center</span>
              {isLoggedIn && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Logged In
                </span>
              )}
            </h2>

            {/* Nav Tree */}
            <div className="space-y-3 text-xs">
              {/* My Account */}
              <div className="space-y-1.5">
                <div className="font-black text-gray-900 flex items-center justify-between">
                  <span>My Account</span>
                  <Minus className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <ul className="pl-3 space-y-1.5 text-gray-600 font-medium border-l-2 border-gray-100 ml-1">
                  <li>
                    <button
                      onClick={() => setActiveSubPanel('profile')}
                      className="hover:text-amber-600 flex items-center gap-1.5 w-full text-left"
                    >
                      <Crown className="w-3.5 h-3.5 text-amber-500" />
                      <span>Baniyas VIP</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSubPanel('profile')}
                      className="hover:text-amber-600 flex items-center justify-between w-full text-left"
                    >
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        My Profile
                      </span>
                      <span className="text-[9px] font-extrabold bg-amber-500 text-black px-1.5 py-0.5 rounded">
                        +POINTS
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSubPanel('address')}
                      className="hover:text-amber-600 flex items-center gap-1.5 w-full text-left"
                    >
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>Address Book</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSubPanel('payment')}
                      className="hover:text-amber-600 flex items-center gap-1.5 w-full text-left"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                      <span>My Payment Options</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSubPanel('measurements')}
                      className="hover:text-amber-600 flex items-center gap-1.5 w-full text-left"
                    >
                      <Ruler className="w-3.5 h-3.5 text-gray-400" />
                      <span>My Measurements</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSubPanel('profile')}
                      className="hover:text-amber-600 flex items-center justify-between w-full text-left"
                    >
                      <span className="flex items-center gap-1.5">
                        <SettingsIcon className="w-3.5 h-3.5 text-gray-400" />
                        Manage My Account
                      </span>
                      <span className="text-[9px] font-extrabold bg-amber-500 text-black px-1.5 py-0.5 rounded">
                        +POINTS
                      </span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* My Assets */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => toggleSection('assets')}
                  className="w-full font-black text-gray-900 flex items-center justify-between hover:text-amber-600"
                >
                  <span>My Assets</span>
                  {expandedSections.assets ? (
                    <Minus className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                {expandedSections.assets && (
                  <ul className="pl-3 mt-1.5 space-y-1.5 text-gray-600 font-medium border-l-2 border-gray-100 ml-1">
                    <li className="flex justify-between">
                      <span>Coupons</span> <strong className="text-black">3</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Points</span> <strong className="text-black">250</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Wallet</span> <strong className="text-black">0.00 ETB</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Gift Cards</span> <strong className="text-black">0</strong>
                    </li>
                  </ul>
                )}
              </div>

              {/* My Orders */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => toggleSection('orders')}
                  className="w-full font-black text-gray-900 flex items-center justify-between hover:text-amber-600"
                >
                  <span>My Orders</span>
                  {expandedSections.orders ? (
                    <Minus className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                {expandedSections.orders && (
                  <ul className="pl-3 mt-1.5 space-y-1.5 text-gray-600 font-medium border-l-2 border-gray-100 ml-1">
                    <li><button onClick={() => setActiveView('myAds')} className="hover:text-amber-600">All Orders</button></li>
                    <li><button onClick={() => setActiveView('myAds')} className="hover:text-amber-600">Unpaid Orders</button></li>
                    <li><button onClick={() => setActiveView('myAds')} className="hover:text-amber-600">Processing</button></li>
                    <li><button onClick={() => setActiveView('myAds')} className="hover:text-amber-600">Shipped</button></li>
                    <li><button onClick={() => setActiveView('myAds')} className="hover:text-amber-600">Returns & Refunds</button></li>
                  </ul>
                )}
              </div>

              {/* My Favorites */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => toggleSection('favorites')}
                  className="w-full font-black text-gray-900 flex items-center justify-between hover:text-amber-600"
                >
                  <span>My Favorites</span>
                  {expandedSections.favorites ? (
                    <Minus className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                {expandedSections.favorites && (
                  <ul className="pl-3 mt-1.5 space-y-1.5 text-gray-600 font-medium border-l-2 border-gray-100 ml-1">
                    <li><button onClick={() => setActiveTab('wishlist')} className="hover:text-amber-600">Saved Wishlist ({user.savedListingIds.length})</button></li>
                    <li><button onClick={() => setActiveTab('following')} className="hover:text-amber-600">Followed Stores (1)</button></li>
                    <li><button onClick={() => setActiveTab('recent')} className="hover:text-amber-600">Recently Viewed</button></li>
                  </ul>
                )}
              </div>

              {/* Customer Service */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => toggleSection('customerService')}
                  className="w-full font-black text-gray-900 flex items-center justify-between hover:text-amber-600"
                >
                  <span>Customer Service</span>
                  {expandedSections.customerService ? (
                    <Minus className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                {expandedSections.customerService && (
                  <ul className="pl-3 mt-1.5 space-y-1.5 text-gray-600 font-medium border-l-2 border-gray-100 ml-1">
                    <li><button onClick={() => setActiveView('help')} className="hover:text-amber-600">My Message & Support</button></li>
                    <li><button onClick={() => setActiveView('help')} className="hover:text-amber-600 font-bold text-amber-600">Live Chat Assistant</button></li>
                    <li><button onClick={() => setActiveView('help')} className="hover:text-amber-600">FAQ & Buyer Protection</button></li>
                  </ul>
                )}
              </div>

              {/* Other Services */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => toggleSection('otherServices')}
                  className="w-full font-black text-gray-900 flex items-center justify-between hover:text-amber-600"
                >
                  <span>Other Services</span>
                  {expandedSections.otherServices ? (
                    <Minus className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                {expandedSections.otherServices && (
                  <ul className="pl-3 mt-1.5 space-y-1.5 text-gray-600 font-medium border-l-2 border-gray-100 ml-1">
                    <li>
                      <button
                        onClick={() => setActiveSubPanel('preferences')}
                        className="hover:text-amber-600 flex items-center gap-1"
                      >
                        <Bell className="w-3 h-3 text-gray-400" />
                        Contact Preferences
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {/* Policy List */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => toggleSection('policy')}
                  className="w-full font-black text-gray-900 flex items-center justify-between hover:text-amber-600"
                >
                  <span>Policy</span>
                  {expandedSections.policy ? (
                    <Minus className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                {expandedSections.policy && (
                  <ul className="pl-3 mt-1.5 space-y-1.5 text-gray-500 font-medium border-l-2 border-gray-100 ml-1">
                    {[
                      'Shipping Info',
                      'Return Policy',
                      'Privacy & Cookie Policy',
                      'Refund Policy',
                      'Payment Method',
                      'About Baniyas Wallet',
                      'Bonus Point Policy',
                      'Coupon Policy',
                      'Baniyas VIP Terms & Conditions',
                      'Review Guidance',
                      'Giftcard Guidelines',
                      'How To Track My Order',
                      'How To Order Page',
                    ].map(item => (
                      <li key={item}>
                        <button
                          onClick={() => {
                            setPolicyModalTitle(item);
                            setActiveSubPanel('policy');
                          }}
                          className="hover:text-amber-600 text-left block w-full text-[11px]"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Accessibility */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => toggleSection('accessibility')}
                  className="w-full font-black text-gray-900 flex items-center justify-between hover:text-amber-600"
                >
                  <span>Accessibility</span>
                  {expandedSections.accessibility ? (
                    <Minus className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                {expandedSections.accessibility && (
                  <ul className="pl-3 mt-1.5 space-y-1.5 text-gray-600 font-medium border-l-2 border-gray-100 ml-1">
                    <li>
                      <button
                        onClick={() => setActiveSubPanel('preferences')}
                        className="hover:text-amber-600 flex items-center gap-1"
                      >
                        <Accessibility className="w-3 h-3 text-gray-400" />
                        Pop-up & Message Control
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {/* Sign Out / Sign In Button */}
              <div className="pt-3 border-t border-gray-200">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      logout();
                      setActiveView('auth');
                    }}
                    className="w-full py-2 px-3 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveView('auth')}
                    className="w-full py-2 px-3 bg-black text-white hover:bg-gray-800 font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
                  >
                    <User className="w-3.5 h-3.5" />
                    Sign In / Register
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* CENTER PANEL: Main User Banner + Orders Card + Tabs Feed */}
          <div className="lg:col-span-6 space-y-3 md:space-y-4">
            {/* Top User Greeting Banner */}
            <div className="bg-white rounded-xl p-4 md:p-5 shadow-xs border border-gray-200/80 space-y-3 md:space-y-4">
              {isLoggedIn ? (
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center font-black text-xl shadow-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base md:text-lg font-black text-black">
                          Hi, {user.name}
                        </h2>
                        <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />
                          S0 VIP
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        Member since {user.memberSince} • Addis Ababa
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveSubPanel('profile')}
                    className="text-xs font-bold text-gray-700 hover:text-amber-600 flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
                  >
                    <span>My Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-black text-xl border border-gray-200">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-black">
                        Welcome to Baniyas
                      </h2>
                      <p className="text-xs text-gray-500 font-medium">
                        Sign in or register to view orders, coupons & wallet
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('auth')}
                    className="w-full sm:w-auto px-5 py-2 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                  >
                    Sign In / Register
                  </button>
                </div>
              )}

              {/* 4 Metrics Bar (Exact screenshot style: Coupons, Points, Wallet, Gift Card) */}
              <div className="grid grid-cols-4 gap-2 text-center pt-3 border-t border-gray-100">
                <button
                  onClick={() => toggleSection('assets')}
                  className="flex flex-col items-center hover:opacity-80 group"
                >
                  <span className="text-lg font-black text-black group-hover:text-amber-600">3</span>
                  <span className="text-[11px] font-bold text-gray-600">Coupons</span>
                </button>
                <button
                  onClick={() => toggleSection('assets')}
                  className="flex flex-col items-center hover:opacity-80 group"
                >
                  <span className="text-lg font-black text-black group-hover:text-amber-600">250</span>
                  <span className="text-[11px] font-bold text-gray-600">Points</span>
                </button>
                <button
                  onClick={() => toggleSection('assets')}
                  className="flex flex-col items-center hover:opacity-80 group"
                >
                  <span className="text-lg font-black text-black group-hover:text-amber-600">0.00 ETB</span>
                  <span className="text-[11px] font-bold text-gray-600">Wallet</span>
                </button>
                <button
                  onClick={() => toggleSection('assets')}
                  className="flex flex-col items-center hover:opacity-80 group justify-center"
                >
                  <Gift className="w-5 h-5 text-black group-hover:text-amber-600 mb-0.5" />
                  <span className="text-[11px] font-bold text-gray-600">Gift Card</span>
                </button>
              </div>
            </div>

            {/* Expiring Coupons Notice Banner (Screenshot replica) */}
            {showBanner && (
              <div className="bg-amber-500/15 border border-amber-300/80 rounded-xl px-4 py-3 text-xs text-gray-800 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    You have <strong className="text-red-600 font-extrabold">3 coupon(s)</strong> that will expire soon!
                  </span>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-gray-400 hover:text-black p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* MY ORDERS CARD (Exact SHEIN layout from screenshot) */}
            <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-200/80 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-sm text-black uppercase tracking-wider flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-500" />
                  My Orders
                </h3>
                <button
                  onClick={() => setActiveView('myAds')}
                  className="text-xs font-bold text-gray-600 hover:text-amber-600 flex items-center gap-0.5"
                >
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 5 Status Icons Row */}
              <div className="grid grid-cols-5 gap-1 text-center py-1">
                <button
                  onClick={() => setActiveView('myAds')}
                  className="flex flex-col items-center group"
                >
                  <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-amber-500/10 group-hover:scale-105 transition-all mb-1.5">
                    <CreditCard className="w-5 h-5 text-gray-800 group-hover:text-amber-600" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-700">Unpaid</span>
                </button>

                <button
                  onClick={() => setActiveView('myAds')}
                  className="flex flex-col items-center group"
                >
                  <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-amber-500/10 group-hover:scale-105 transition-all mb-1.5">
                    <Package className="w-5 h-5 text-gray-800 group-hover:text-amber-600" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-700">Processing</span>
                </button>

                <button
                  onClick={() => setActiveView('myAds')}
                  className="flex flex-col items-center group"
                >
                  <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-amber-500/10 group-hover:scale-105 transition-all mb-1.5">
                    <Truck className="w-5 h-5 text-gray-800 group-hover:text-amber-600" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-700">Shipped</span>
                </button>

                <button
                  onClick={() => setActiveView('myAds')}
                  className="flex flex-col items-center group"
                >
                  <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-amber-500/10 group-hover:scale-105 transition-all mb-1.5">
                    <MessageSquare className="w-5 h-5 text-gray-800 group-hover:text-amber-600" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-700">Review</span>
                </button>

                <button
                  onClick={() => setActiveView('myAds')}
                  className="flex flex-col items-center group"
                >
                  <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-amber-500/10 group-hover:scale-105 transition-all mb-1.5">
                    <RotateCcw className="w-5 h-5 text-gray-800 group-hover:text-amber-600" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-700">Returns</span>
                </button>
              </div>

              {/* Empty Stage Graphic (Match screenshot "It is empty here :-(") */}
              <div className="py-8 bg-gray-50/70 rounded-xl border border-dashed border-gray-200 text-center space-y-2">
                <div className="w-12 h-12 mx-auto text-gray-300 flex items-center justify-center border-2 border-gray-300 rounded-full">
                  <Package className="w-6 h-6 stroke-[1.5]" />
                </div>
                <p className="text-xs font-bold text-gray-500">It is empty here :-(</p>
                <button
                  onClick={() => setMainTab('home')}
                  className="text-xs font-black text-amber-600 hover:underline"
                >
                  Explore Trending Items in Addis
                </button>
              </div>
            </div>

            {/* Sub-Tabs: Wishlist / Following / Recently Viewed */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200/80 overflow-hidden">
              <div className="flex items-center justify-around border-b border-gray-200 bg-gray-50/50 text-xs font-black">
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`py-3.5 px-4 relative transition-colors ${
                    activeTab === 'wishlist' ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  Wishlist ({user.savedListingIds.length})
                  {activeTab === 'wishlist' && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-black rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('following')}
                  className={`py-3.5 px-4 relative transition-colors ${
                    activeTab === 'following' ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  Following Stores (1)
                  {activeTab === 'following' && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-black rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('recent')}
                  className={`py-3.5 px-4 relative transition-colors ${
                    activeTab === 'recent' ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  Recently Viewed
                  {activeTab === 'recent' && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-black rounded-full" />
                  )}
                </button>
              </div>

              {/* Feed Grid */}
              <div className="p-4">
                {activeTab === 'wishlist' && (
                  savedListings.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {savedListings.map(listing => (
                        <ProductCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-gray-400 space-y-2">
                      <Heart className="w-8 h-8 mx-auto opacity-30 text-gray-400" />
                      <p className="text-xs font-bold">Your wishlist is currently empty</p>
                      <button
                        onClick={() => setMainTab('home')}
                        className="text-xs font-black text-amber-600 hover:underline"
                      >
                        Start Saving Products
                      </button>
                    </div>
                  )
                )}

                {activeTab === 'following' && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center">
                        B
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900">Baniyas Official Boutique</h4>
                        <p className="text-[10px] text-gray-500">Verified Seller • 4.9 Rating</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-bold">
                      View Store
                    </button>
                  </div>
                )}

                {activeTab === 'recent' && (
                  <div className="grid grid-cols-2 gap-3">
                    {recentListings.map(listing => (
                      <ProductCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (Desktop SHEIN panel: Customer Service, Wishlist, Following, Recently Viewed) */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            {/* Customer Service Box */}
            <div className="bg-white rounded-xl p-4 shadow-xs border border-gray-200/80 space-y-3">
              <h3 className="font-black text-xs uppercase tracking-wider text-black border-b border-gray-100 pb-2">
                Customer Service
              </h3>
              <button
                onClick={() => setActiveView('help')}
                className="w-full p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left flex items-center gap-3 group transition-colors"
              >
                <div className="p-2 rounded-lg bg-black text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 group-hover:text-amber-600">My Message</h4>
                  <p className="text-[10px] text-gray-500">System alerts & seller support</p>
                </div>
              </button>
            </div>

            {/* Wishlist Preview */}
            <div className="bg-white rounded-xl p-4 shadow-xs border border-gray-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-xs uppercase tracking-wider text-black">Wishlist</h3>
                <span className="text-xs font-bold text-gray-400">{savedListings.length} items</span>
              </div>
              {savedListings.length > 0 ? (
                <div className="grid grid-cols-3 gap-1.5">
                  {savedListings.slice(0, 3).map(item => (
                    <div
                      key={item.id}
                      onClick={() => setActiveView('pdp')}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">No saved items yet.</p>
              )}
            </div>

            {/* Following Preview */}
            <div className="bg-white rounded-xl p-4 shadow-xs border border-gray-200/80 space-y-3">
              <h3 className="font-black text-xs uppercase tracking-wider text-black">Following</h3>
              <p className="text-xs text-gray-600 font-medium">Baniyas Official Store (Following)</p>
            </div>

            {/* Recently Viewed Preview */}
            <div className="bg-white rounded-xl p-4 shadow-xs border border-gray-200/80 space-y-3">
              <h3 className="font-black text-xs uppercase tracking-wider text-black">Recently Viewed</h3>
              <div className="grid grid-cols-3 gap-1.5">
                {listings.slice(0, 3).map(item => (
                  <div
                    key={item.id}
                    onClick={() => setActiveView('pdp')}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE SUB-PANELS / MODALS */}

      {/* Address Book Sub-Panel Modal */}
      {activeSubPanel === 'address' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative animate-in fade-in">
            <button
              onClick={() => setActiveSubPanel('none')}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              Address Book
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {addresses.map(addr => (
                <div
                  key={addr.id}
                  className="p-3 border border-gray-200 rounded-xl space-y-1 bg-gray-50/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-black">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{addr.subcity}, {addr.city}</p>
                  <p className="text-xs text-gray-500">{addr.landmark}</p>
                  <p className="text-[11px] font-mono text-gray-500">{addr.phone}</p>
                </div>
              ))}
            </div>

            {!showAddAddress ? (
              <button
                onClick={() => setShowAddAddress(true)}
                className="w-full py-2.5 bg-black text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                Add New Delivery Address
              </button>
            ) : (
              <form onSubmit={handleAddAddress} className="space-y-2.5 pt-2 border-t border-gray-200">
                <input
                  type="text"
                  placeholder="Subcity (e.g. Kazanchis)"
                  value={newSubcity}
                  onChange={e => setNewSubcity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="Landmark / House No."
                  value={newLandmark}
                  onChange={e => setNewLandmark(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  required
                />
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-amber-500 text-black font-bold text-xs rounded-lg"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-bold text-xs rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Payment Options Sub-Panel Modal */}
      {activeSubPanel === 'payment' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative animate-in fade-in">
            <button
              onClick={() => setActiveSubPanel('none')}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-500" />
              My Payment Options
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 border border-emerald-300 bg-emerald-50/50 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Telebirr Mobile Wallet</h4>
                  <p className="text-[10px] text-gray-500">Instant mobile payment for Ethiopia</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  CONNECTED
                </span>
              </div>

              <div className="p-3 border border-gray-200 bg-gray-50/50 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">CBE Birr / Commercial Bank of Ethiopia</h4>
                  <p className="text-[10px] text-gray-500">Direct account transfer</p>
                </div>
                <span className="text-[10px] font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                  READY
                </span>
              </div>

              <div className="p-3 border border-gray-200 bg-gray-50/50 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Cash on Delivery (COD)</h4>
                  <p className="text-[10px] text-gray-500">Pay courier upon receiving item</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Measurements Sub-Panel Modal */}
      {activeSubPanel === 'measurements' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative animate-in fade-in">
            <button
              onClick={() => setActiveSubPanel('none')}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-amber-500" />
              My Measurements
            </h3>

            <p className="text-xs text-gray-500">
              Save your body size for automated size recommendation on dresses, suits, and shoes.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Height</label>
                <input
                  type="text"
                  value={measurements.height}
                  onChange={e => setMeasurements({ ...measurements, height: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Weight</label>
                <input
                  type="text"
                  value={measurements.weight}
                  onChange={e => setMeasurements({ ...measurements, weight: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Bust / Chest</label>
                <input
                  type="text"
                  value={measurements.bust}
                  onChange={e => setMeasurements({ ...measurements, bust: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Shoe Size</label>
                <input
                  type="text"
                  value={measurements.shoeSize}
                  onChange={e => setMeasurements({ ...measurements, shoeSize: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <button
              onClick={() => {
                alert('Measurements saved!');
                setActiveSubPanel('none');
              }}
              className="w-full py-2.5 bg-black text-white font-bold text-xs rounded-xl"
            >
              Save Measurements
            </button>
          </div>
        </div>
      )}

      {/* Policy Reader Modal */}
      {activeSubPanel === 'policy' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl relative animate-in fade-in max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setActiveSubPanel('none')}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              {policyModalTitle}
            </h3>

            <div className="text-xs text-gray-600 space-y-2.5 leading-relaxed pt-2 border-t border-gray-100">
              <p>
                Welcome to the official <strong>{policyModalTitle}</strong> documentation for Baniyas Store.
              </p>
              <p>
                All orders placed on Baniyas Store benefit from buyer protection and express delivery guarantees across Addis Ababa subcities (Bole, Kazanchis, Piazza, CMC, Ayat, etc.).
              </p>
              <ul className="list-disc pl-4 space-y-1 text-gray-700">
                <li>Same-day or 24-hour dispatch for verified local sellers.</li>
                <li>Free inspection upon delivery with Cash on Delivery options.</li>
                <li>Hassle-free 7-day returns for defective or misdescribed items.</li>
              </ul>
              <p className="text-[11px] text-gray-400 pt-2">
                Last updated: July 2026. For questions, contact Customer Service.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {activeSubPanel === 'preferences' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative animate-in fade-in">
            <button
              onClick={() => setActiveSubPanel('none')}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Contact & Notification Preferences
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <span>SMS Order Status Alerts</span>
                <input type="checkbox" defaultChecked className="rounded text-amber-500" />
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <span>Email Voucher & Discount Alerts</span>
                <input type="checkbox" defaultChecked className="rounded text-amber-500" />
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <span>In-App Seller Chat Notifications</span>
                <input type="checkbox" defaultChecked className="rounded text-amber-500" />
              </label>
            </div>

            <button
              onClick={() => setActiveSubPanel('none')}
              className="w-full py-2.5 bg-black text-white font-bold text-xs rounded-xl"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
