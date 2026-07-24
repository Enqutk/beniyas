import { Category, Listing, UserProfile, ChatThread } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'phones',
    name: 'Phones & Tablets',
    amharicName: 'Phones & Tablets',
    iconName: 'Smartphone',
    count: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80',
    subcategories: ['iPhone', 'Samsung', 'iPad & Tablets', 'Phone Accessories']
  },
  {
    id: 'vehicles',
    name: 'Vehicles & Auto',
    amharicName: 'Vehicles & Auto',
    iconName: 'Car',
    count: 890,
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80',
    subcategories: ['Toyota', 'Hyundai', 'Suzuki', 'Spare Parts']
  },
  {
    id: 'fashion',
    name: 'Fashion & Clothing',
    amharicName: 'Fashion & Clothing',
    iconName: 'Shirt',
    count: 2350,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=80',
    subcategories: ['Women Fashion', 'Men Fashion', 'Shoes & Sneakers', 'Bags & Watches', 'Jewelry']
  },
  {
    id: 'electronics',
    name: 'Electronics & Tech',
    amharicName: 'Electronics & Tech',
    iconName: 'Tv',
    count: 1120,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&auto=format&fit=crop&q=80',
    subcategories: ['Laptops & Computers', 'TVs & Audio', 'Gaming & Consoles', 'Kitchen Appliances']
  },
  {
    id: 'home',
    name: 'Home & Furniture',
    amharicName: 'Home & Furniture',
    iconName: 'Armchair',
    count: 980,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&auto=format&fit=crop&q=80',
    subcategories: ['Sofas & Living Room', 'Beds & Mattresses', 'Dining Sets', 'Home Decor']
  }
];

export const MOCK_USER: UserProfile = {
  id: 'user_me',
  name: 'Abebe Bikila',
  phone: '+251 91 188 4422',
  email: 'abebe.b@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  memberSince: 'March 2023',
  verified: true,
  activeAdsCount: 3,
  pendingAdsCount: 1,
  soldAdsCount: 8,
  savedListingIds: ['l1', 'l3', 'l7', 'l12', 'l18'],
  followedSellerIds: ['seller_1', 'seller_3'],
  language: 'EN'
};

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'iPhone 15 Pro Max 256GB Titanium Blue (Original Apple)',
    amharicTitle: 'Brand New iPhone 15 Pro Max 256GB - Original',
    price: 185000,
    originalPrice: 198000,
    discountPercentage: 7,
    categoryId: 'phones',
    subcategory: 'iPhone',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Bole',
    datePosted: '15 mins ago',
    viewsCount: 840,
    isNegotiable: true,
    isVerifiedSeller: true,
    isBoosted: true,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Storage': '256 GB',
      'Color': 'Natural Titanium',
      'Battery Health': '100%',
      'SIM Type': 'Physical + eSIM'
    },
    availableSizes: ['128GB', '256GB', '512GB'],
    availableColors: ['Natural Titanium', 'Black Titanium', 'Blue Titanium'],
    description: 'Factory sealed original iPhone 15 Pro Max 256GB in Natural Titanium. Comes with 1 year Apple Warranty, original cable, box, and invoice. Purchased directly from Dubai Apple Store. Meetup at Bole Medhanialem or Kazanchis.',
    sellerId: 'seller_1',
    sellerName: 'Addis iStore Tech',
    sellerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 122 3344',
    sellerRating: 4.9,
    sellerReviewsCount: 42,
    sellerResponseTime: '< 10 mins',
    sellerMemberSince: 'Jan 2022',
    sellerActiveAdsCount: 14,
    hashtags: ['#PhoneDealsAddis', '#BoleFinds', '#iPhoneAddis'],
    reviews: [
      {
        id: 'r1',
        userName: 'Dawit T.',
        userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        comment: 'Very polite seller! Verified original device, checked IMEI on spot at Bole Atlas. Highly recommended store!',
        date: '2 days ago',
        photos: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80'],
        helpfulCount: 12,
        attributesUsed: '256GB / Natural Titanium'
      },
      {
        id: 'r2',
        userName: 'Saba M.',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        comment: 'Fast response and honest price. Tested battery health 100%.',
        date: '1 week ago',
        helpfulCount: 5
      }
    ]
  },
  {
    id: 'l2',
    title: 'Toyota Vitz 2018 Compact Edition - Low Mileage',
    amharicTitle: 'Toyota Vitz 2018 Model - Excellent Low Mileage',
    price: 2450000,
    originalPrice: 2600000,
    discountPercentage: 6,
    categoryId: 'vehicles',
    subcategory: 'Toyota',
    condition: 'Like New',
    location: 'Addis Ababa',
    subcity: 'Kazanchis',
    datePosted: '1 hour ago',
    viewsCount: 1250,
    isNegotiable: true,
    isVerifiedSeller: true,
    isBoosted: true,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Year': '2018',
      'Engine': '1.0L Benzine',
      'Transmission': 'Automatic',
      'Mileage': '38,000 km',
      'Plate Code': 'Code 3'
    },
    description: 'Very neat Toyota Vitz 2018. Original pearl white factory paint, clean interior, non-smoker driver. Code 3 plate registered in Addis Ababa. All service logs maintained at MOENCO. Price slightly negotiable upon inspection in Kazanchis.',
    sellerId: 'seller_2',
    sellerName: 'Kaleb Auto Sales',
    sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 155 6677',
    sellerRating: 4.8,
    sellerReviewsCount: 28,
    sellerResponseTime: '< 15 mins',
    sellerMemberSince: 'Aug 2021',
    sellerActiveAdsCount: 8,
    hashtags: ['#CarShowroom', '#KazanchisMotors', '#ToyotaAddis'],
    reviews: []
  },
  {
    id: 'l3',
    title: 'Authentic Ethiopian Designer Habesha Kemis (Handmade Silk)',
    amharicTitle: 'Habesha Dress - Silk & Hand Embroidery',
    price: 18500,
    originalPrice: 22000,
    discountPercentage: 15,
    categoryId: 'fashion',
    subcategory: 'Women Fashion',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Piazza',
    datePosted: '3 hours ago',
    viewsCount: 610,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Material': '100% Handwoven Cotton & Silk',
      'Pattern': 'Tibeb Ethiopian Pattern',
      'Includes': 'Dress + Netela Wrap'
    },
    availableSizes: ['S', 'M', 'L', 'Custom Tailored'],
    availableColors: ['White & Gold Tibeb', 'White & Green', 'Royal Blue Tibeb'],
    description: 'Exquisite handwoven Habesha Kemis with gold tinsel Tibeb embroidery. Crafted by master weavers in Shiromeda & Piazza. Perfect for weddings, holidays, and cultural graduation ceremonies.',
    sellerId: 'seller_3',
    sellerName: 'Sheger Couture & Tibeb',
    sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 92 333 4455',
    sellerRating: 5.0,
    sellerReviewsCount: 64,
    sellerResponseTime: '< 5 mins',
    sellerMemberSince: 'Feb 2020',
    sellerActiveAdsCount: 25,
    hashtags: ['#ThriftFashion', '#EthiopianFashion', '#HabeshaKemis'],
    reviews: [
      {
        id: 'r3',
        userName: 'Hellen K.',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        comment: 'The Tibeb work is breathtaking! Exactly like SHEIN runway style but authentic Ethiopian craft.',
        date: '3 days ago',
        photos: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80'],
        helpfulCount: 18
      }
    ]
  },
  {
    id: 'l4',
    title: 'MacBook Pro 16" M2 Pro 16GB RAM 512GB SSD Space Gray',
    amharicTitle: 'MacBook Pro 16 Inch M2 - For Designers & Engineers',
    price: 165000,
    originalPrice: 178000,
    discountPercentage: 7,
    categoryId: 'electronics',
    subcategory: 'Laptops & Computers',
    condition: 'Like New',
    location: 'Addis Ababa',
    subcity: 'CMC',
    datePosted: '5 hours ago',
    viewsCount: 420,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Processor': 'Apple M2 Pro (12-core CPU)',
      'RAM': '16 GB Unified Memory',
      'Storage': '512 GB NVMe SSD',
      'Cycle Count': '42 cycles'
    },
    description: 'Super clean Apple MacBook Pro 16-inch M2 Pro. Perfect for video editors, software engineers, and graphic designers in Addis. Includes original MagSafe charger, 140W power adapter, and protective sleeve.',
    sellerId: 'seller_1',
    sellerName: 'Addis iStore Tech',
    sellerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 122 3344',
    sellerRating: 4.9,
    sellerReviewsCount: 42,
    sellerResponseTime: '< 10 mins',
    sellerMemberSince: 'Jan 2022',
    sellerActiveAdsCount: 14,
    hashtags: ['#BoleFinds', '#MacBookAddis'],
    reviews: []
  },
  {
    id: 'l5',
    title: 'Luxury 2 Bedroom Apartment for Rent in Bole Atlas (Furnished)',
    amharicTitle: '2 Bedroom Luxury Apartment Rental Bole Atlas',
    price: 65000, // Monthly in ETB
    categoryId: 'home',
    subcategory: 'Sofas & Living Room',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Bole',
    datePosted: 'Just now',
    viewsCount: 930,
    isNegotiable: true,
    isVerifiedSeller: true,
    isBoosted: true,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Bedrooms': '2 Bedrooms',
      'Bathrooms': '2 Bathrooms',
      'Square Meters': '125 m²',
      'Furnished': 'Fully Furnished',
      'Floor': '4th Floor with Elevator',
      'Backup Power': 'Automatic Generator'
    },
    description: 'Fully furnished high-end apartment located in the heart of Bole Atlas near international restaurants and bank headquarters. Features 24/7 security, underground parking, backup generator, high speed wifi, and balcony with mountain view.',
    sellerId: 'seller_4',
    sellerName: 'Metropolitan Real Estate & Rentals',
    sellerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 199 8877',
    sellerRating: 4.9,
    sellerReviewsCount: 19,
    sellerResponseTime: '< 30 mins',
    sellerMemberSince: 'Nov 2019',
    sellerActiveAdsCount: 12,
    hashtags: ['#BoleFinds', '#RealEstateEthiopia'],
    reviews: []
  },
  {
    id: 'l6',
    title: 'Modern L-Shape Italian Leather Sofa Set (6 Seater)',
    amharicTitle: 'Modern L-Shape Leather Sofa - Living Room',
    price: 78000,
    originalPrice: 89000,
    discountPercentage: 12,
    categoryId: 'home',
    subcategory: 'Sofas & Living Room',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Sarbet',
    datePosted: '4 hours ago',
    viewsCount: 380,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Seating Capacity': '6-7 Persons',
      'Color': 'Camel Tan Brown',
      'Material': 'Genuine Leather + Teak Wood Frame'
    },
    availableColors: ['Camel Brown', 'Dark Charcoal', 'Cream Beige'],
    description: 'Custom handcrafted modern L-shape sectional sofa. Durable water-resistant genuine leather cushions with high-density foam interior. Seller can arrange meetup or their own delivery within Addis Ababa.',
    sellerId: 'seller_5',
    sellerName: 'Ethio Living Wood & Decor',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 144 5566',
    sellerRating: 4.7,
    sellerReviewsCount: 31,
    sellerResponseTime: '< 20 mins',
    sellerMemberSince: 'May 2021',
    sellerActiveAdsCount: 18,
    reviews: []
  },
  {
    id: 'l7',
    title: 'Samsung Galaxy S24 Ultra 512GB Titanium Black (Dual SIM)',
    amharicTitle: 'Samsung S24 Ultra 512GB - Brand New Sealed',
    price: 155000,
    originalPrice: 168000,
    discountPercentage: 8,
    categoryId: 'phones',
    subcategory: 'Samsung',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Lideta',
    datePosted: '2 hours ago',
    viewsCount: 540,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Storage': '512 GB',
      'RAM': '12 GB',
      'Camera': '200 MP AI Zoom',
      'S-Pen': 'Included'
    },
    description: 'Brand new in box Samsung S24 Ultra with Galaxy AI features. Official Samsung warranty card inside. Meetup in Lideta or Kazanchis.',
    sellerId: 'seller_1',
    sellerName: 'Addis iStore Tech',
    sellerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 122 3344',
    sellerRating: 4.9,
    sellerReviewsCount: 42,
    sellerResponseTime: '< 10 mins',
    sellerMemberSince: 'Jan 2022',
    sellerActiveAdsCount: 14,
    hashtags: ['#PhoneDealsAddis', '#SamsungAddis'],
    reviews: []
  },
  {
    id: 'l8',
    title: 'Sony PlayStation 5 Slim Digital Console + 2 DualSense Controllers',
    amharicTitle: 'Sony PlayStation 5 Slim - 2 Controllers Included',
    price: 68000,
    originalPrice: 74000,
    discountPercentage: 8,
    categoryId: 'electronics',
    subcategory: 'Gaming & Consoles',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Old Airport',
    datePosted: '6 hours ago',
    viewsCount: 780,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Model': 'PS5 Slim Digital 1TB',
      'Controllers': '2 Original Wireless DualSense',
      'Pre-installed Games': 'FC 24, Spider-Man 2, GTA V'
    },
    description: 'Brand new PS5 Slim Digital Edition 1TB SSD. Comes pre-loaded with digital accounts for FC 24 and Spider-Man 2. 2 controllers included in white and midnight black.',
    sellerId: 'seller_6',
    sellerName: 'Gamers Haven Addis',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 188 9900',
    sellerRating: 4.9,
    sellerReviewsCount: 53,
    sellerResponseTime: '< 5 mins',
    sellerMemberSince: 'Dec 2020',
    sellerActiveAdsCount: 9,
    reviews: []
  },
  {
    id: 'l9',
    title: 'Purebred German Shepherd Puppy (3 Months, Vaccinated with Booklet)',
    amharicTitle: 'German Shepherd Puppy - Fully Vaccinated',
    price: 32000,
    categoryId: 'home',
    subcategory: 'Home Decor',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Summit',
    datePosted: '1 day ago',
    viewsCount: 620,
    isNegotiable: true,
    isVerifiedSeller: false,
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Breed': 'German Shepherd Working Line',
      'Age': '12 Weeks',
      'Gender': 'Male',
      'Vaccination': 'Fully Dewormed & Rabies Shot'
    },
    description: 'Healthy and active 3-month-old German Shepherd male puppy. Intelligent, protective instincts, eating solid puppy food. Includes health passport record booklet.',
    sellerId: 'seller_7',
    sellerName: 'Summit K9 Kennel',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 93 444 5566',
    sellerRating: 4.6,
    sellerReviewsCount: 11,
    sellerResponseTime: '< 1 hour',
    sellerMemberSince: 'Jan 2023',
    sellerActiveAdsCount: 4,
    reviews: []
  },
  {
    id: 'l10',
    title: 'SHEIN Style Floral Summer Maxi Dress (Chiffon Lightweight)',
    amharicTitle: 'Womens Trending Fashion Dress - Seasonal',
    price: 3500,
    originalPrice: 4800,
    discountPercentage: 27,
    categoryId: 'fashion',
    subcategory: 'Women Fashion',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Bole',
    datePosted: '2 hours ago',
    viewsCount: 1420,
    isNegotiable: false,
    isVerifiedSeller: true,
    isBoosted: true,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Style': 'A-Line Maxi Dress',
      'Fabric': 'Breathable Chiffon',
      'Sleeve': 'Short Puff Sleeve'
    },
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Rose Pink', 'Emerald Green', 'Floral Blue'],
    description: 'Imported high quality floral maxi dress with elastic waistband and soft lining. Comfortable for everyday wear or Sunday outings in Addis.',
    sellerId: 'seller_8',
    sellerName: 'Baniyas Trendy Store',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 177 8899',
    sellerRating: 4.9,
    sellerReviewsCount: 88,
    sellerResponseTime: '< 5 mins',
    sellerMemberSince: 'Jun 2022',
    sellerActiveAdsCount: 45,
    hashtags: ['#ThriftFashion', '#SHEINAddis'],
    reviews: [
      {
        id: 'r10',
        userName: 'Tigist B.',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        comment: 'Very soft fabric! Delivered to Bole Medhanialem within 2 hours. Love it!',
        date: 'Yesterday',
        photos: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&auto=format&fit=crop&q=80'],
        helpfulCount: 8,
        attributesUsed: 'M / Rose Pink'
      }
    ]
  },
  {
    id: 'l11',
    title: 'Hyundai Elantra 2020 Executive Sedan (Clean Condition)',
    amharicTitle: 'Hyundai Elantra 2020 Model Sedan',
    price: 3850000,
    originalPrice: 4100000,
    discountPercentage: 6,
    categoryId: 'vehicles',
    subcategory: 'Hyundai',
    condition: 'Used - Excellent',
    location: 'Addis Ababa',
    subcity: 'Bole',
    datePosted: '4 hours ago',
    viewsCount: 890,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Year': '2020',
      'Engine': '1.6L Petrol',
      'Transmission': 'Automatic Tiptronic',
      'Mileage': '45,000 km'
    },
    description: 'Beautiful metallic gray Hyundai Elantra 2020 with leather seats, sunroof, push start, and rear view camera. Registered Code 2.',
    sellerId: 'seller_2',
    sellerName: 'Kaleb Auto Sales',
    sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 155 6677',
    sellerRating: 4.8,
    sellerReviewsCount: 28,
    sellerResponseTime: '< 15 mins',
    sellerMemberSince: 'Aug 2021',
    sellerActiveAdsCount: 8,
    hashtags: ['#CarShowroom', '#HyundaiAddis'],
    reviews: []
  },
  {
    id: 'l12',
    title: 'Professional Graphic Design & Web Development Services',
    amharicTitle: 'Graphics Design & Website Development Service',
    price: 15000, // starting
    categoryId: 'electronics',
    subcategory: 'Laptops & Computers',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Kazanchis',
    datePosted: '1 day ago',
    viewsCount: 310,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Service Type': 'Logos, Websites, Social Media',
      'Turnaround': '3-5 Business Days',
      'Revisions': 'Unlimited'
    },
    description: 'We build modern websites, branding packages, Telegram bot automation, and marketing banners for Ethiopian businesses.',
    sellerId: 'seller_9',
    sellerName: 'Creative Sheger Studio',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 100 2233',
    sellerRating: 5.0,
    sellerReviewsCount: 15,
    sellerResponseTime: '< 10 mins',
    sellerMemberSince: 'Feb 2022',
    sellerActiveAdsCount: 5,
    reviews: []
  },
  {
    id: 'l13',
    title: 'LG 55" 4K UHD Smart TV (WebOS + Magic Remote)',
    amharicTitle: 'LG 55 Inch 4K Smart TV',
    price: 54000,
    originalPrice: 62000,
    discountPercentage: 12,
    categoryId: 'electronics',
    subcategory: 'TVs & Audio',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Piazza',
    datePosted: '7 hours ago',
    viewsCount: 670,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Screen Size': '55 Inches',
      'Resolution': '4K UHD 3840x2160',
      'Smart OS': 'LG WebOS 23',
      'Remote': 'Voice Magic Remote'
    },
    description: 'Brand new in box LG 55 inch TV with crystal clear display, Netflix, YouTube, Apple AirPlay, and Bluetooth audio.',
    sellerId: 'seller_10',
    sellerName: 'Piazza Electronics Hub',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 133 4411',
    sellerRating: 4.7,
    sellerReviewsCount: 37,
    sellerResponseTime: '< 15 mins',
    sellerMemberSince: 'Mar 2021',
    sellerActiveAdsCount: 22,
    reviews: []
  },
  {
    id: 'l14',
    title: 'Nike Air Jordan 1 Retro High OG (Unisex Sneakers)',
    amharicTitle: 'Nike Air Jordan 1 Shoes - Original Edition',
    price: 8500,
    originalPrice: 11000,
    discountPercentage: 22,
    categoryId: 'fashion',
    subcategory: 'Shoes & Sneakers',
    condition: 'Brand New',
    location: 'Addis Ababa',
    subcity: 'Bole',
    datePosted: '3 hours ago',
    viewsCount: 1100,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Brand': 'Nike Air Jordan',
      'Colorway': 'Chicago Red & White',
      'Gender': 'Unisex'
    },
    availableSizes: ['39', '40', '41', '42', '43', '44'],
    availableColors: ['Chicago Red', 'Royal Blue', 'Shadow Black'],
    description: 'Top grade Air Jordan 1 sneakers with premium leather finish and cushioned sole. Comes with original box and extra laces.',
    sellerId: 'seller_8',
    sellerName: 'Baniyas Trendy Store',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 177 8899',
    sellerRating: 4.9,
    sellerReviewsCount: 88,
    sellerResponseTime: '< 5 mins',
    sellerMemberSince: 'Jun 2022',
    sellerActiveAdsCount: 45,
    hashtags: ['#ThriftFashion', '#BoleFinds'],
    reviews: []
  },
  {
    id: 'l15',
    title: 'Suzuki Swift 2022 Automatic Hatchback (Economical Fuel)',
    amharicTitle: 'Suzuki Swift 2022 - Eco Friendly Modern Car',
    price: 2850000,
    categoryId: 'vehicles',
    subcategory: 'Suzuki',
    condition: 'Like New',
    location: 'Addis Ababa',
    subcity: 'CMC',
    datePosted: '8 hours ago',
    viewsCount: 940,
    isNegotiable: true,
    isVerifiedSeller: true,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      'Year': '2022',
      'Engine': '1.2L Dualjet Petrol',
      'Transmission': 'Auto Transmission',
      'Mileage': '18,000 km'
    },
    description: 'Extremely efficient 2022 Suzuki Swift in metallic red. Low mileage, touch screen display, push button start, very easy to park in Addis Ababa city traffic.',
    sellerId: 'seller_2',
    sellerName: 'Kaleb Auto Sales',
    sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 155 6677',
    sellerRating: 4.8,
    sellerReviewsCount: 28,
    sellerResponseTime: '< 15 mins',
    sellerMemberSince: 'Aug 2021',
    sellerActiveAdsCount: 8,
    hashtags: ['#CarShowroom'],
    reviews: []
  }
];

/** Extra catalog so every category / subcategory has browseable PLP results */
const SUBCITY_POOL = ['Bole', 'Kazanchis', 'Piazza', 'CMC', 'Lideta', 'Summit', 'Sarbet', 'Old Airport'];
const CONDITION_POOL: Listing['condition'][] = [
  'Brand New',
  'Like New',
  'Used - Excellent',
  'Used - Good',
  'Refurbished'
];

const CATEGORY_IMAGES: Record<string, string[]> = {
  phones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80'
  ],
  vehicles: [
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80'
  ],
  fashion: [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1487222477894-6973a9c3fd54?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
  ],
  electronics: [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format&fit=crop&q=80'
  ],
  home: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop&q=80'
  ]
};

const PRICE_RANGES: Record<string, [number, number]> = {
  phones: [3500, 185000],
  vehicles: [180000, 3200000],
  fashion: [450, 28000],
  electronics: [2500, 145000],
  home: [1200, 95000]
};

function buildCatalogListings(): Listing[] {
  const generated: Listing[] = [];
  let n = 100;

  CATEGORIES.forEach(cat => {
    const imgs = CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES.fashion;
    const [minP, maxP] = PRICE_RANGES[cat.id] || [1000, 50000];

    cat.subcategories.forEach((sub, subIdx) => {
      for (let i = 0; i < 4; i++) {
        const price = Math.round(minP + ((maxP - minP) * ((subIdx * 4 + i) % 9)) / 9);
        const discount = i % 3 === 0 ? 5 + (i * 4) : undefined;
        const img = imgs[(subIdx + i) % imgs.length];
        generated.push({
          id: `gen_${n++}`,
          title: `${sub} — Premium Pick #${i + 1} (${cat.name})`,
          amharicTitle: `${sub} listing in Addis Ababa`,
          price,
          originalPrice: discount ? Math.round(price / (1 - discount / 100)) : undefined,
          discountPercentage: discount,
          categoryId: cat.id,
          subcategory: sub,
          condition: CONDITION_POOL[(subIdx + i) % CONDITION_POOL.length],
          location: 'Addis Ababa',
          subcity: SUBCITY_POOL[(subIdx + i) % SUBCITY_POOL.length],
          datePosted: i === 0 ? 'Just now' : `${i + 1} hours ago`,
          viewsCount: 120 + subIdx * 40 + i * 25,
          isNegotiable: i % 2 === 0,
          isVerifiedSeller: i % 3 !== 2,
          isBoosted: i === 0,
          images: [img],
          attributes: {
            Category: cat.name,
            Type: sub,
            Color: ['Black', 'White', 'Multi', 'Pink', 'Blue', 'Green', 'Brown'][(subIdx + i) % 7]
          },
          availableSizes: cat.id === 'fashion' ? ['S', 'M', 'L', 'XL'] : undefined,
          availableColors: ['Black', 'White', 'Pink', 'Blue', 'Brown'],
          description: `Quality ${sub.toLowerCase()} available for meetup in Addis Ababa. Verified seller, photos match item. Ask the vendor if they offer their own delivery.`,
          sellerId: `seller_gen_${(n % 12) + 1}`,
          sellerName: `${cat.name.split(' ')[0]} Hub Store`,
          sellerAvatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
          sellerPhone: '+251 91 100 2000',
          sellerRating: 4.5 + (i % 5) * 0.1,
          sellerReviewsCount: 8 + i * 3,
          sellerResponseTime: '< 20 mins',
          sellerMemberSince: '2023',
          sellerActiveAdsCount: 6 + i,
          hashtags: [`#${cat.id}`, '#BoleFinds'],
          reviews: []
        });
      }
    });
  });

  return generated;
}

// Merge handcrafted + generated catalog
MOCK_LISTINGS.push(...buildCatalogListings());

/** Map mega-menu / home labels → real catalog subcategories for PLP filtering */
export const SUBCATEGORY_ALIASES: Record<string, string[]> = {
  Tops: ['Women Fashion', 'Men Fashion'],
  Dresses: ['Women Fashion'],
  'Women Fashion': ['Women Fashion'],
  'Men Fashion': ['Men Fashion'],
  Beachwear: ['Women Fashion'],
  Kids: ['Women Fashion', 'Men Fashion'],
  Curve: ['Women Fashion'],
  Underwear: ['Women Fashion'],
  Beauty: ['Jewelry', 'Women Fashion'],
  Jewelry: ['Jewelry'],
  Bags: ['Bags & Watches'],
  'Bags & Watches': ['Bags & Watches'],
  Shoes: ['Shoes & Sneakers'],
  'Shoes & Sneakers': ['Shoes & Sneakers'],
  Sports: ['Men Fashion', 'Women Fashion'],
  Baby: ['Women Fashion'],
  Pants: ['Men Fashion', 'Women Fashion'],
  Furniture: ['Sofas & Living Room', 'Dining Sets', 'Office Furniture'],
  Bedding: ['Beds & Mattresses'],
  Home: ['Home Decor', 'Sofas & Living Room'],
  Laptops: ['Laptops & Computers'],
  Watches: ['Bags & Watches', 'Smartwatches'],
  'Super Deals': [],
  Sale: []
};

export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    id: 'chat_1',
    listingId: 'l1',
    listingTitle: 'iPhone 15 Pro Max 256GB Titanium Blue',
    listingPrice: 185000,
    listingImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&auto=format&fit=crop&q=80',
    sellerId: 'seller_1',
    sellerName: 'Addis iStore Tech',
    sellerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 91 122 3344',
    lastMessage: 'Is 180,000 ETB okay for cash pickup at Bole Medhanialem today?',
    lastMessageTime: '10:42 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'user',
        text: 'Selam! Is this iPhone 15 Pro Max still available?',
        timestamp: '10:30 AM'
      },
      {
        id: 'm2',
        senderId: 'seller',
        text: 'Selam Abebe! Yes, it is brand new sealed in box. Direct import with original invoice.',
        timestamp: '10:35 AM'
      },
      {
        id: 'm3',
        senderId: 'user',
        text: 'Is 180,000 ETB okay for cash pickup at Bole Medhanialem today?',
        timestamp: '10:42 AM'
      }
    ]
  },
  {
    id: 'chat_2',
    listingId: 'l3',
    listingTitle: 'Authentic Ethiopian Designer Habesha Kemis',
    listingPrice: 18500,
    listingImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80',
    sellerId: 'seller_3',
    sellerName: 'Sheger Couture & Tibeb',
    sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    sellerPhone: '+251 92 333 4455',
    lastMessage: 'Yes we can custom tailor Medium size for delivery tomorrow!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm10',
        senderId: 'user',
        text: 'Hi! Do you have size M available in gold Tibeb?',
        timestamp: 'Yesterday 4:15 PM'
      },
      {
        id: 'm11',
        senderId: 'seller',
        text: 'Yes we can custom tailor Medium size for delivery tomorrow!',
        timestamp: 'Yesterday 4:20 PM'
      }
    ]
  }
];

export const TRENDING_SEARCHES = [
  'iPhone 15 Pro',
  'Toyota Vitz 2018',
  'Habesha Kemis',
  'Apartment Rent Bole',
  'PS5 Digital',
  'MacBook M2',
  'Suzuki Swift',
  'Nike Jordans'
];

export const HASHTAG_RAILS = [
  { id: 'tag1', tag: '#PhoneDealsAddis', title: 'Top Phone Deals in Addis', count: 184 },
  { id: 'tag2', tag: '#ThriftFashion', title: 'SHEIN & Local Fashion Finds', count: 420 },
  { id: 'tag3', tag: '#BoleFinds', title: 'Popular in Bole & Kazanchis', count: 310 },
  { id: 'tag4', tag: '#CarShowroom', title: 'Verified Motors & Vehicles', count: 95 }
];
