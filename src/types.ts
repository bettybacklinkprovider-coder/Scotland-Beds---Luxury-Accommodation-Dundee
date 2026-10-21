export interface Room {
  id: string;
  name: string;
  tagline: string;
  category: 'king' | 'double' | 'twin' | 'suite';
  pricePerNight: number;
  capacity: number;
  bedType: string;
  sizeSqM: number;
  description: string;
  featuredAmenities: string[];
  image: string;
  galleryImages: string[];
  availabilityStatus: 'Available' | 'High Demand' | 'Only 1 Left';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  stayDate: string;
  reviewText: string;
  roomStayed: string;
  verified: boolean;
  platform: 'google' | 'trustpilot' | 'direct';
  avatar?: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  iconName: 'wifi' | 'bed' | 'bath' | 'flame' | 'coffee' | 'key' | 'tv' | 'shield';
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'bedrooms' | 'bathrooms' | 'lounge' | 'dundee';
  image: string;
  caption: string;
}

export interface BookingEnquiry {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  packageId?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  category: 'weekend' | 'extended' | 'romantic' | 'family' | 'business' | 'seasonal';
  targetRoomId: string;
  targetRoomName: string;
  image: string;
  originalPricePerNight?: number;
  offerPricePerNight: number;
  discountBadge?: string;
  minNights?: number;
  validity: string;
  includedBenefits: string[];
  description: string;
  ctaText: string;
  featured?: boolean;
}

export type PageRoute = 'home' | 'rooms' | 'gallery' | 'contact';
