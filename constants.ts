import { Product, NailService } from './types';

/**
 * 💡 使用 GitHub 托管图片的技巧：
 * 
 * 1. 在你的 GitHub 仓库根目录创建一个文件夹，例如命名为 `images`。
 * 2. 将你的图片（如 ring1.jpg）上传到该文件夹。
 * 3. 在下方的 image 字段中，直接填写路径：'/images/ring1.jpg'
 * 4. Vercel 会自动识别并展示这些图片。
 */

export const JEWELRY_PRODUCTS: Product[] = [
  {
    id: 'j1',
    name: { 
      zh: '我的实拍首饰 A', 
      fr: 'Bijou Réel A', 
      en: 'Real Jewelry A' 
    },
    price: 45,
    category: 'earrings',
    // 假设你已经在 GitHub 仓库根目录上传了 images 文件夹和图片
    image: '/images/earring1.jpg', 
    description: {
      zh: '这是我亲自拍摄并上传到 GitHub 的首饰照片。',
      fr: 'Ceci est une photo prise par mes soins et hébergée sur GitHub.',
      en: 'This is a photo taken by myself and hosted on GitHub.'
    },
    stock: 5
  },
  {
    id: 'j2',
    name: { 
      zh: '我的实拍首饰 B', 
      fr: 'Bijou Réel B', 
      en: 'Real Jewelry B' 
    },
    price: 38,
    category: 'rings',
    image: '/images/ring1.jpg', 
    description: {
      zh: '支持 JPG, PNG, WEBP 等常见格式。',
      fr: 'Prend en charge les formats JPG, PNG, WEBP.',
      en: 'Supports JPG, PNG, WEBP formats.'
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
      zh: '也可以继续混合使用 Unsplash 等外部链接。',
      fr: 'Vous pouvez également continuer à utiliser des liens externes.',
      en: 'You can also continue to use external links.'
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
