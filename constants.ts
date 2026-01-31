import { Product, NailService } from './types';

/**
 * 💡 图片显示排查清单（当前状态：已放进 public 文件夹）：
 * 1. 既然已经放在 public/images 下，访问路径应该是 /images/...
 * 2. 文件名后缀：您提到现在是 .jpg.webp，路径已同步更新。
 * 3. 区分大小写：请确保文件名在文件系统中确实是全小写。
 */

export const JEWELRY_PRODUCTS: Product[] = [
  {
    id: 'j0',
    name: { 
      zh: '花漾璀璨排戒', 
      fr: 'Bague Fleurie Scintillante', 
      en: 'Floral Sparkle Band' 
    },
    price: 48,
    category: 'rings',
    // 更新为您的实际文件名
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
      fr: 'Placage à l\'or élégant with des reflets de pierre de lune pour un style vintage.',
      en: 'Elegant gold plating with moonstone flashes for a timeless vintage style.'
    },
    stock: 2
  },
  {
    id: 'j3',
    name: { 
      zh: '星河璀璨锁骨链', 
      fr: 'Collier Galaxie Scintillante', 
      en: 'Shimmering Galaxy Necklace' 
    },
    price: 52,
    category: 'necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    description: {
      zh: '极简主义设计，细巧链身点缀闪耀锆石。',
      fr: 'Design minimaliste, chaîne délicate ornée de zircons brillants.',
      en: 'Minimalist design, delicate chain adorned with sparkling zircons.'
    },
    stock: 8
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
