export const APP_NAME = "TechGear Store";
export const APP_TAGLINE = "Premium Tech Accessories for Every Setup";
export const APP_EMAIL = "hello@techgearstore.com";
export const APP_PHONE = "+1 (800) 832-4477";

export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Shop", href: "/shop", type: "route" },
  { label: "About", href: "/about-us", type: "route" },
  { label: "Contact", href: "/contact", type: "route" },
];

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  badge?: string;
  inStock: boolean;
  description: string;
  specs?: Record<string, string>;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "cables", name: "Cables", slug: "cables", icon: "Cable", count: 24 },
  { id: "chargers", name: "Chargers", slug: "chargers", icon: "Zap", count: 18 },
  { id: "cases", name: "Cases", slug: "cases", icon: "Shield", count: 32 },
  { id: "audio", name: "Audio", slug: "audio", icon: "Headphones", count: 15 },
  { id: "peripherals", name: "Peripherals", slug: "peripherals", icon: "Mouse", count: 21 },
  { id: "storage", name: "Storage", slug: "storage", icon: "HardDrive", count: 12 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "MagSafe Braided USB-C Cable 2m",
    slug: "magsafe-braided-usb-c-cable-2m",
    category: "cables",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviewCount: 312,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MPL43?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1698168621764",
    images: [
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MPL43?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1698168621764",
      "/images/braided-usb-c-cable-detail.jpg",
    ],
    badge: "Best Seller",
    inStock: true,
    description:
      "Premium braided USB-C cable with 240W fast charging support and 10Gbps data transfer. Tangle-free design with reinforced connectors rated for 30,000 bends.",
    specs: {
      Length: "2 meters",
      "Max Power": "240W",
      "Data Speed": "10 Gbps",
      Compatibility: "USB-C devices",
      Material: "Braided nylon",
    },
    featured: true,
  },
  {
    id: "2",
    name: "GaN 100W USB-C Charger",
    slug: "gan-100w-usb-c-charger",
    category: "chargers",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviewCount: 487,
    image: "https://m.media-amazon.com/images/I/516szWmX2ZL._AC_UF894,1000_QL80_.jpg",
    badge: "Top Rated",
    inStock: true,
    description:
      "Ultra-compact GaN charger with 100W output. Charge your laptop, tablet, and phone simultaneously with three ports. 60% smaller than traditional chargers.",
    specs: {
      "Total Output": "100W",
      Ports: "2x USB-C, 1x USB-A",
      Technology: "GaN III",
      Compatibility: "Universal",
      Size: "55 x 55 x 30mm",
    },
    featured: true,
  },
  {
    id: "3",
    name: "AirPods Pro Silicone Case",
    slug: "airpods-pro-silicone-case",
    category: "cases",
    price: 19.99,
    rating: 4.6,
    reviewCount: 203,
    image: "http://www.elago.com/cdn/shop/products/APP2SC-HANG-LV.jpg?v=1665596426",
    badge: "New",
    inStock: true,
    description:
      "Military-grade drop protection meets sleek design. Liquid silicone exterior with microfiber lining protects your AirPods Pro from drops up to 6 feet.",
    specs: {
      Material: "Liquid silicone",
      Protection: "6ft drop tested",
      Compatibility: "AirPods Pro 1st & 2nd gen",
      Weight: "18g",
    },
    featured: false,
  },
  {
    id: "4",
    name: "Studio-Grade Wireless Headphones",
    slug: "studio-grade-wireless-headphones",
    category: "audio",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 156,
    image: "https://m.media-amazon.com/images/I/51N2OJQ8ggL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    inStock: true,
    description:
      "40mm custom drivers deliver rich, balanced sound. Active noise cancellation with 30-hour battery life and foldable design for travel.",
    specs: {
      "Driver Size": "40mm",
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.3",
      ANC: "Hybrid active noise cancellation",
      Weight: "250g",
    },
    featured: true,
  },
  {
    id: "5",
    name: "Ergonomic Wireless Mouse",
    slug: "ergonomic-wireless-mouse",
    category: "peripherals",
    price: 49.99,
    rating: 4.5,
    reviewCount: 289,
    image: "http://manhattanproducts.us/cdn/shop/products/wireless-ergonomic-mouse-with-2-in-1-usb-receiver-190237-1.jpg?v=1695233143",
    inStock: true,
    description:
      "Sculpted ergonomic design reduces wrist strain during long sessions. 4000 DPI precision sensor with silent clicks and 60-day battery life.",
    specs: {
      DPI: "400-4000 (adjustable)",
      Connectivity: "2.4GHz wireless + Bluetooth",
      "Battery Life": "60 days",
      Buttons: "6 programmable",
      Weight: "95g",
    },
    featured: false,
  },
  {
    id: "6",
    name: "Portable SSD 1TB",
    slug: "portable-ssd-1tb",
    category: "storage",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 421,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HRQ22?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=VTZkM09mWUd4OEczWWtRTWtqTDh2Z2tuVHYzMERCZURia3c5SzJFOTlPaGlOZm1vUXN2cjVNeTNKZXZEclZjS1pDUWFVdVE5K2FoaFRBeE1Xazhyc2c",
    badge: "Deal",
    inStock: true,
    description:
      "Blazing-fast 1050MB/s read speeds in a pocket-sized form factor. Shock-resistant, IP55 water and dust resistant. Works with PC, Mac, and mobile.",
    specs: {
      Capacity: "1TB",
      "Read Speed": "1050 MB/s",
      "Write Speed": "1000 MB/s",
      Interface: "USB 3.2 Gen 2",
      Protection: "IP55, shock resistant",
    },
    featured: true,
  },
  {
    id: "7",
    name: "Mechanical Keyboard TKL",
    slug: "mechanical-keyboard-tkl",
    category: "peripherals",
    price: 119.99,
    rating: 4.7,
    reviewCount: 178,
    image: "https://www.keychronsg.com/cdn/shop/files/Keychron-K8-tenkeyless-wireless-mechanical-keyboard-for-Mac-Windows-iOS-RGB-white-backlight-with-gateron-Optical-brown-switch..jpg?v=1723448906&width=1214",
    badge: "Popular",
    inStock: true,
    description:
      "Tenkeyless layout with hot-swappable switches and per-key RGB lighting. Aluminum top plate with PBT double-shot keycaps for lasting durability.",
    specs: {
      Layout: "TKL (87 keys)",
      Switches: "Hot-swappable",
      Backlight: "Per-key RGB",
      Connection: "USB-C detachable",
      Material: "Aluminum + PBT",
    },
    featured: false,
  },
  {
    id: "8",
    name: "15W Wireless Charging Pad",
    slug: "15w-wireless-charging-pad",
    category: "chargers",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.4,
    reviewCount: 267,
    image: "https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dwf60e9e05/images/hi-res/d/93e13306ec1adb0d_belkin-wia009ttbk-wireless-magnetic-charging-pad-qi2-web-gallery-01-us.jpg?sfrm=png",
    inStock: true,
    description:
      "Qi2 certified 15W fast wireless charging pad with LED indicator and foreign object detection. Compatible with all Qi-enabled devices.",
    specs: {
      "Max Output": "15W",
      Standard: "Qi2 certified",
      Compatibility: "All Qi devices",
      Indicator: "LED status ring",
      Cable: "USB-C included",
    },
    featured: false,
  },
  {
    id: "9",
    name: "USB-C Hub 10-in-1",
    slug: "usb-c-hub-10-in-1",
    category: "peripherals",
    price: 69.99,
    rating: 4.6,
    reviewCount: 334,
    image: "https://m.media-amazon.com/images/I/71ZjtyOPulL.jpg",
    badge: "Best Seller",
    inStock: true,
    description:
      "Transform your USB-C port into a full workstation hub. 4K HDMI, 100W PD passthrough, SD card reader, Ethernet, and 4 USB ports in one sleek unit.",
    specs: {
      Ports: "10 total",
      HDMI: "4K@60Hz",
      "PD Passthrough": "100W",
      Ethernet: "Gigabit",
      "Card Reader": "SD + microSD",
    },
    featured: true,
  },
  {
    id: "10",
    name: "iPhone 15 MagSafe Case",
    slug: "iphone-15-magsafe-case",
    category: "cases",
    price: 24.99,
    rating: 4.5,
    reviewCount: 512,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT203?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=RmN3U1FXSEo2QklTRnEvVjNnK2tGQWtuVHYzMERCZURia3c5SzJFOTlPalpQUlZGaitSQjJVekdLRWQ5QlBiN3dwbDRpYXpVTUMvR0dqUk92ZysvWGc",
    inStock: false,
    description:
      "Crystal-clear MagSafe compatible case with reinforced corners and raised bezels. Shows off your iPhone while providing reliable everyday protection.",
    specs: {
      Compatibility: "iPhone 15 / 15 Plus",
      Material: "TPU + polycarbonate",
      MagSafe: "Compatible",
      Protection: "4ft drop tested",
      Weight: "22g",
    },
    featured: false,
  },
  {
    id: "11",
    name: "True Wireless Earbuds Pro",
    slug: "true-wireless-earbuds-pro",
    category: "audio",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 398,
    image: "https://s7d1.scene7.com/is/image/tracfone/Pro4%20Ear%20Buds?scl=1&fmt=webp-alpha&qlt=80,0&resMode=sharp2&op_usm=1.75,0.3,2,0",
    badge: "Sale",
    inStock: true,
    description:
      "6mm dynamic drivers with hybrid ANC and transparency mode. IPX5 water resistance, 8-hour playtime with 32 hours total via charging case.",
    specs: {
      "Driver Size": "6mm",
      ANC: "Hybrid",
      "Battery (Buds)": "8 hours",
      "Battery (Total)": "32 hours",
      "Water Resistance": "IPX5",
    },
    featured: false,
  },
  {
    id: "12",
    name: "Braided Lightning Cable 3-Pack",
    slug: "braided-lightning-cable-3-pack",
    category: "cables",
    price: 22.99,
    rating: 4.3,
    reviewCount: 641,
    image: "https://i5.walmartimages.com/seo/Bkayp-iPhone-Charger-Apple-Mfi-Certified-3-Pack-10ft-Lightning-Cables-Fast-Charging-iPhone-Cord-Compatible-with-iPhone-14-13-12-11-Black_a1798f59-491b-4cfd-9572-6862653f8d20.4f2f88d3716e22dbd2465ee73228356e.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    inStock: true,
    description:
      "Three lengths (0.5m, 1m, 2m) in one pack. MFi certified braided lightning cables with 20W fast charging support and 25,000 bend lifespan.",
    specs: {
      Lengths: "0.5m, 1m, 2m",
      Certification: "MFi certified",
      "Max Power": "20W",
      Material: "Braided nylon",
      Lifespan: "25,000 bends",
    },
    featured: false,
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Software Engineer",
    avatar: "https://upload.wikimedia.org/wikipedia/en/4/4e/AlexChenLiS.png",
    rating: 5,
    text: "The GaN charger is a game changer. I replaced three separate chargers with this one compact unit. Build quality is exceptional.",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    role: "Content Creator",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/2/25/Minister_Mitchell_July_20_headshot_DSC6710a.jpg",
    rating: 5,
    text: "Ordered the wireless headphones and they arrived next day. Sound quality rivals headphones twice the price. TechGear is my go-to now.",
  },
  {
    id: "3",
    name: "Marcus Rivera",
    role: "UX Designer",
    avatar: "http://tinabangel.com/wp-content/uploads/2015/04/MARCUS-RIVERA.png",
    rating: 4,
    text: "The USB-C hub transformed my desk setup. Solid build, no driver issues, and the 4K output is crisp. Highly recommend for remote workers.",
  },
];