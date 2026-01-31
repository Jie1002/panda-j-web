
export type Locale = 'zh' | 'fr' | 'en';

export interface MultilingualString {
  zh: string;
  fr: string;
  en: string;
}

export interface Product {
  id: string;
  name: MultilingualString;
  price: number;
  category: 'earrings' | 'rings' | 'necklaces' | 'bracelets';
  image: string;
  description: MultilingualString;
  stock: number;
}

export interface NailService {
  id: string;
  name: MultilingualString;
  price: number;
  duration: MultilingualString;
  description: MultilingualString;
  image: string;
}

export interface BookingState {
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerContact: string;
  notes?: string;
}

export type View = 'home' | 'shop' | 'services' | 'booking' | 'about' | 'ai-advisor';
