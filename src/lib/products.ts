import { Product } from '../types';

export const products: Product[] = [
  {
    id: "sole-001",
    name: "AirEdge Pro",
    brand: "Nike",
    price: 12999,
    gender: "men",
    category: "running",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ["Black/White", "Triple Black"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800"
    ],
    description: "Maximum cushioning meets zero-gravity feel. Built for the Indian runner who demands performance and style.",
    tags: ["running", "cushioned", "lightweight", "breathable"],
    inStock: true,
    isNew: true
  },
  {
    id: "sole-002",
    name: "Ultraboost 23",
    brand: "Adidas",
    price: 15999,
    originalPrice: 18999,
    gender: "unisex",
    category: "running",
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: ["Core Black", "Cloud White", "Solar Yellow"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800"
    ],
    description: "BOOST midsole returns energy with every step. The most comfortable shoe ever made, now in India.",
    tags: ["running", "boost", "energy-return", "premium"],
    inStock: true,
    isSale: true
  },
  {
    id: "sole-003",
    name: "Jordan 1 Retro High",
    brand: "Jordan",
    price: 22999,
    gender: "men",
    category: "lifestyle",
    sizes: [7, 8, 9, 10, 11],
    colors: ["Chicago", "Royal Blue", "Shadow"],
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961d28c?w=800",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800"
    ],
    description: "The shoe that changed everything. Iconic silhouette, unmatched street credibility.",
    tags: ["lifestyle", "iconic", "streetwear", "collector"],
    inStock: true,
    isNew: false
  },
  {
    id: "sole-004",
    name: "Cloud X 3",
    brand: "On Running",
    price: 17499,
    gender: "women",
    category: "training",
    sizes: [4, 5, 6, 7, 8, 9],
    colors: ["Eclipse/Flame", "Ivory/Indigo"],
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800"
    ],
    description: "Swiss engineering meets gym floor. Zero-gravity feel for every workout.",
    tags: ["training", "gym", "versatile", "swiss"],
    inStock: true,
    isNew: true
  },
  {
    id: "sole-005",
    name: "Gel-Kayano 30",
    brand: "ASICS",
    price: 13499,
    gender: "women",
    category: "running",
    sizes: [4, 5, 6, 7, 8],
    colors: ["Midnight/Soft Sky", "Sheet White/Pale Mint"],
    images: [
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
    ],
    description: "30 years of stability running perfected. Maximum support for long-distance queens.",
    tags: ["running", "stability", "long-distance", "support"],
    inStock: true
  },
  {
    id: "sole-006",
    name: "Fresh Foam X 1080v13",
    brand: "New Balance",
    price: 14999,
    originalPrice: 16999,
    gender: "men",
    category: "running",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Black/Silver", "White/Blue"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800"
    ],
    description: "Plush cushioning engineered for the daily runner who refuses to compromise.",
    tags: ["running", "plush", "daily-trainer", "cushioned"],
    inStock: true,
    isSale: true
  },
  {
    id: "sole-007",
    name: "Suede Classic XXI",
    brand: "Puma",
    price: 6999,
    gender: "unisex",
    category: "lifestyle",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["Puma Black", "Peacoat-Puma White", "Urban Red"],
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
    ],
    description: "The suede that started it all. Timeless Indian street icon since '68.",
    tags: ["lifestyle", "classic", "suede", "affordable"],
    inStock: true
  },
  {
    id: "sole-008",
    name: "Metaspeed Sky+",
    brand: "ASICS",
    price: 24999,
    gender: "unisex",
    category: "running",
    sizes: [6, 7, 8, 9, 10],
    colors: ["White/Electric Blue", "Black/Pure Gold"],
    images: [
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800"
    ],
    description: "Carbon plate racing shoe. Sub-3 marathon territory. For the serious.",
    tags: ["racing", "carbon-plate", "marathon", "elite"],
    inStock: true,
    isNew: true
  },
  {
    id: "sole-009",
    name: "Air Max 270",
    brand: "Nike",
    price: 11999,
    gender: "women",
    category: "lifestyle",
    sizes: [4, 5, 6, 7, 8, 9],
    colors: ["Black/White", "Sunset Glow", "Triple White"],
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
    ],
    description: "Tallest Air unit ever. Maximum visibility, maximum comfort, maximum flex.",
    tags: ["lifestyle", "air", "chunky", "statement"],
    inStock: true
  },
  {
    id: "sole-010",
    name: "Speedgoat 5",
    brand: "HOKA",
    price: 16499,
    gender: "men",
    category: "running",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Black/Black", "Coastal Fjord/Vibrant Orange"],
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800"
    ],
    description: "The king of trail running. Maximal cushion, Vibram grip, zero compromise.",
    tags: ["trail", "hoka", "maximal", "outdoor"],
    inStock: true,
    isNew: true
  }
];

export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByGender = (gender: 'men' | 'women' | 'unisex') =>
  products.filter(p => p.gender === gender || p.gender === 'unisex');
export const getFeaturedProducts = () => products.filter(p => p.isNew || p.isSale).slice(0, 4);
export const getAllBrands = () => [...new Set(products.map(p => p.brand))];
