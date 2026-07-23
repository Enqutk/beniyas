export type CategoryId =
  | 'vehicles'
  | 'phones'
  | 'electronics'
  | 'fashion'
  | 'home'
  | 'property'
  | 'services'
  | 'jobs'
  | 'pets';

export interface Category {
  id: CategoryId;
  name: string;
  amharicName?: string;
  iconName: string;
  count: number;
  imageUrl: string;
  subcategories: string[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
  helpfulCount: number;
  attributesUsed?: string;
}

export interface ListingAttribute {
  label: string;
  value: string;
}

export interface Listing {
  id: string;
  title: string;
  amharicTitle?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  categoryId: CategoryId;
  subcategory: string;
  condition: 'Brand New' | 'Like New' | 'Used - Excellent' | 'Used - Good' | 'Refurbished';
  location: string; // e.g. "Addis Ababa"
  subcity: string; // e.g. "Bole", "Kazanchis", "Piazza", "CMC"
  datePosted: string;
  viewsCount: number;
  isNegotiable: boolean;
  isVerifiedSeller: boolean;
  isBoosted?: boolean;
  images: string[];
  attributes: Record<string, string>; // e.g., { "Size": "M", "Color": "Red", "Storage": "256GB" }
  availableSizes?: string[];
  availableColors?: string[];
  description: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerPhone: string;
  sellerRating: number;
  sellerReviewsCount: number;
  sellerResponseTime: string;
  sellerMemberSince: string;
  sellerActiveAdsCount: number;
  reviews: Review[];
  hashtags?: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'user' | 'seller'
  text: string;
  timestamp: string;
  imageUrl?: string;
}

export interface ChatThread {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingImage: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerPhone: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface FilterState {
  categoryId?: CategoryId | 'all';
  subcategory?: string;
  subcity?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  isNegotiable?: boolean;
  isVerifiedSeller?: boolean;
  sortBy: 'recommended' | 'newest' | 'price_low' | 'price_high' | 'popular';
  searchQuery?: string;
}

export interface CartItem {
  id: string;
  listing: Listing;
  size: string;
  color: string;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  memberSince: string;
  verified: boolean;
  activeAdsCount: number;
  pendingAdsCount: number;
  soldAdsCount: number;
  savedListingIds: string[];
  followedSellerIds: string[];
  language: 'EN' | 'AM';
}
