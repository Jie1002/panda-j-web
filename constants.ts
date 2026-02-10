import { Product, NailService } from './types';

/**
 * 💡 图片路径说明：
 * 如果您的图片放在 public/images/ 目录下，
 * 且服务器将 public 视为根目录，则路径为 /images/...
 * 如果图片不显示，请尝试修改为 /public/images/...
 */

export const JEWELRY_PRODUCTS: Product[] = [
  {
    id: 'j4',
    name: { 
      zh: '璀璨繁星花簇耳钉', 
      fr: 'Boucles d\'oreilles Fleur Étincelante', 
      en: 'Sparkling Flower Cluster Studs' 
    },
    price: 39,
    category: 'earrings',
    image: '/images/earrings_1.jpg.webp', 
    description: {
      zh: '精致的太阳花瓣造型，密镶高品质闪耀锆石，如繁星般点亮耳畔，散发极致法式浪漫。',
      fr: 'Un design floral raffiné avec des zircons pavés, illuminant votre visage comme des étoiles scintillantes.',
      en: 'A refined floral design with pavé zircons, lighting up your face like shimmering stars with French romanticism.'
    },
    stock: 10
  },
  {
    id: 'j5',
    name: { 
      zh: '银河星光环绕耳钉', 
      fr: 'Clous d\'oreilles Halo Galaxie', 
      en: 'Galaxy Halo Studs' 
    },
    price: 42,
    category: 'earrings',
    image: '/images/earrings_2.jpg.webp', 
    description: {
      zh: '经典光环设计，中央主石熠熠生辉，全方位展现立体切割的火彩，尽显高贵典雅风范。',
      fr: 'Un design halo classique avec un zircon central éclatant, capturant la lumière sous tous les angles.',
      en: 'A classic halo design with a brilliant center stone, capturing light from every angle for timeless elegance.'
    },
    stock: 8
  },
  {
    id: 'j0',
    name: { 
      zh: '花漾璀璨排戒', 
      fr: 'Bague Fleurie Scintillante', 
      en: 'Floral Sparkle Band' 
    },
    price: 48,
    category: 'rings',
    image: '/images/floral_ring.jpg.webp', 
    description: {
      zh: '精致的花卉造型排戒，点缀闪耀马眼形锆石，尽显法式浪漫气质。',
      fr: 'Une bague tressée de fleurs délicates, ornée de zircons marquise pour une élégance romantique.',
      en: 'An exquisite floral-shaped band adorned with sparkling marquise zircons, showcasing French romantic elegance.'
    },
    stock: 5
  },
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
      zh: '精选淡水珍珠质感，完美修饰脸型，散发温润光泽。',
      fr: 'Perles d\'eau douce sélectionnées, parfaites pour illuminer votre visage.',
      en: 'Selected freshwater pearls, perfect for enhancing your natural glow.'
    },
    stock: 5
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
