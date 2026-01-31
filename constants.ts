
import { Product, NailService } from './types';

export const JEWELRY_PRODUCTS: Product[] = [
  {
    id: 'j1',
    name: { 
      zh: '晨露珍珠垂坠耳环', 
      fr: 'Boucles d\'oreilles Perles de Rosée', 
      en: 'Morning Dew Pearl Drops' 
    },
    price: 45,
    category: 'earrings',
    image: 'https://images.unsplash.com/photo-1535633302704-b02f4fbc8537?auto=format&fit=crop&q=80&w=600',
    description: {
      zh: '精致的时尚设计，精选淡水珍珠质感，完美修饰脸型。',
      fr: 'Design sophistiqué avec texture de perles d\'eau douce, parfait pour sublimer votre visage.',
      en: 'Sophisticated fashion design with freshwater pearl texture, perfect for enhancing your face shape.'
    },
    stock: 5
  },
  {
    id: 'j2',
    name: { 
      zh: '鎏金月光石戒指', 
      fr: 'Bague Pierre de Lune Dorée', 
      en: 'Gilded Moonstone Ring' 
    },
    price: 38,
    category: 'rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    description: {
      zh: '优雅的镀金工艺，镶嵌闪耀月光石色泽，展现复古气质。',
      fr: 'Placage à l\'or élégant serti d\'éclats de pierre de lune pour un style vintage affirmé.',
      en: 'Elegant gold plating set with moonstone flashes for a bold vintage style.'
    },
    stock: 2
  }
];

export const NAIL_SERVICES: NailService[] = [
  {
    id: 's1',
    name: { 
      zh: '经典凝胶美甲', 
      fr: 'Manucure Gel Signature', 
      en: 'Signature Gel Manicure' 
    },
    price: 45,
    duration: { zh: '60 分钟', fr: '60 min', en: '60 min' },
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=600',
    description: {
      zh: '包含基础护理与持久亮泽凝胶上色。',
      fr: 'Soin complet avec vernis gel longue durée.',
      en: 'Full nail care with long-lasting gel polish.'
    }
  },
  {
    id: 's2',
    name: { 
      zh: '艺术手绘设计', 
      fr: 'Nail Art Peint à la Main', 
      en: 'Hand-Painted Nail Art' 
    },
    price: 65,
    duration: { zh: '90 分钟', fr: '90 min', en: '90 min' },
    image: 'https://images.unsplash.com/photo-1604654894610-df490982579d?auto=format&fit=crop&q=80&w=600',
    description: {
      zh: '根据您的喜好定制艺术手绘图案。',
      fr: 'Designs personnalisés complexes faits main.',
      en: 'Custom intricate designs painted by hand.'
    }
  }
];
