"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";
import { products, categories } from "@/lib/data";
import type { Product, Category } from "@/lib/data";
import { Search, SlidersHorizontal, X, Star, ChevronDown, ChevronRight, Check, ArrowUpDown, ShoppingCart, Heart, Eye, Zap, Shield, Package } from 'lucide-react';
import { useTranslations } from "next-intl";

// ─── Inline extended product data ────────────────────────────────────────────

const BRANDS = ["TechGear", "Anker", "Belkin", "Nomad", "Spigen", "ESR", "UGREEN", "Baseus"];

const extendedProducts: Product[] = [
  ...products,
  {
    id: "7",
    name: "Magnetic Wireless Charger Stand",
    slug: "magnetic-wireless-charger-stand",
    category: "chargers",
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviewCount: 198,
    image: "/images/magnetic-wireless-charger-stand.jpg",
    badge: "Sale",
    inStock: true,
    description: "15W MagSafe-compatible wireless charging stand with adjustable viewing angle.",
    specs: { Power: "15W", Compatibility: "iPhone 12+", Material: "Aluminum" },
    featured: false,
  },
  {
    id: "8",
    name: "Slim Leather iPhone 15 Case",
    slug: "slim-leather-iphone-15-case",
    category: "cases",
    price: 34.99,
    rating: 4.5,
    reviewCount: 87,
    image: "/images/slim-leather-iphone-case.jpg",
    badge: "New",
    inStock: true,
    description: "Full-grain leather case with MagSafe compatibility and card slot.",
    specs: { Material: "Full-grain leather", Compatibility: "iPhone 15 Pro" },
    featured: false,
  },
  {
    id: "9",
    name: "USB-C Hub 7-in-1",
    slug: "usb-c-hub-7-in-1",
    category: "peripherals",
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviewCount: 341,
    image: "/images/usb-c-hub-7-in-1.jpg",
    badge: "Best Seller",
    inStock: true,
    description: "Expand your laptop with HDMI 4K, 3x USB-A, SD card, and 100W PD pass-through.",
    specs: { Ports: "7", HDMI: "4K@60Hz", "PD Power": "100W" },
    featured: true,
  },
  {
    id: "10",
    name: "Portable SSD 1TB",
    slug: "portable-ssd-1tb",
    category: "storage",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviewCount: 512,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HRQ22?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=VTZkM09mWUd4OEczWWtRTWtqTDh2Z2tuVHYzMERCZURia3c5SzJFOTlPaGlOZm1vUXN2cjVNeTNKZXZEclZjS1pDUWFVdVE5K2FoaFRBeE1Xazhyc2c",
    badge: "Top Rated",
    inStock: true,
    description: "NVMe-speed portable SSD with 1050MB/s read speeds in a pocket-sized form.",
    specs: { Capacity: "1TB", "Read Speed": "1050 MB/s", Interface: "USB-C 3.2" },
    featured: true,
  },
  {
    id: "11",
    name: "Braided Lightning Cable 1m",
    slug: "braided-lightning-cable-1m",
    category: "cables",
    price: 18.99,
    rating: 4.4,
    reviewCount: 229,
    image: "/images/braided-lightning-cable-white.jpg",
    inStock: true,
    description: "MFi-certified braided lightning cable with 20W fast charging support.",
    specs: { Length: "1 meter", Certification: "MFi", "Max Power": "20W" },
    featured: false,
  },
  {
    id: "12",
    name: "Mechanical Keyboard TKL",
    slug: "mechanical-keyboard-tkl",
    category: "peripherals",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewCount: 403,
    image: "https://www.keychronsg.com/cdn/shop/files/Keychron-K8-tenkeyless-wireless-mechanical-keyboard-for-Mac-Windows-iOS-RGB-white-backlight-with-gateron-Optical-brown-switch..jpg?v=1723448906&width=1214",
    badge: "Sale",
    inStock: true,
    description: "Tenkeyless mechanical keyboard with hot-swappable switches and RGB backlighting.",
    specs: { Layout: "TKL 87-key", Switches: "Hot-swappable", Backlight: "RGB" },
    featured: true,
  },
  {
    id: "13",
    name: "256GB microSD Card",
    slug: "256gb-microsd-card",
    category: "storage",
    price: 32.99,
    rating: 4.6,
    reviewCount: 178,
    image: "/images/256gb-microsd-card.jpg",
    inStock: true,
    description: "A2-rated microSD card with 160MB/s read speed, ideal for smartphones and cameras.",
    specs: { Capacity: "256GB", "Read Speed": "160 MB/s", Rating: "A2 V30" },
    featured: false,
  },
  {
    id: "14",
    name: "True Wireless Earbuds Pro",
    slug: "true-wireless-earbuds-pro",
    category: "audio",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 267,
    image: "https://s7d1.scene7.com/is/image/tracfone/Pro4%20Ear%20Buds?scl=1&fmt=webp-alpha&qlt=80,0&resMode=sharp2&op_usm=1.75,0.3,2,0",
    badge: "Sale",
    inStock: true,
    description: "Active noise cancellation, 30-hour total battery, and IPX5 water resistance.",
    specs: { ANC: "Yes", Battery: "30 hours total", "Water Resistance": "IPX5" },
    featured: false,
  },
  {
    id: "15",
    name: "Laptop Stand Adjustable",
    slug: "laptop-stand-adjustable",
    category: "peripherals",
    price: 39.99,
    rating: 4.5,
    reviewCount: 134,
    image: "/images/laptop-stand-adjustable-aluminum.jpg",
    inStock: false,
    description: "Aluminum laptop stand with 6 height levels and foldable design for portability.",
    specs: { Material: "Aluminum", Heights: "6 levels", "Max Load": "20kg" },
    featured: false,
  },
  {
    id: "16",
    name: "65W GaN Travel Charger",
    slug: "65w-gan-travel-charger",
    category: "chargers",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewCount: 321,
    image: "/images/65w-gan-travel-charger.jpg",
    badge: "New",
    inStock: true,
    description: "Foldable plug GaN charger with dual USB-C ports and universal voltage support.",
    specs: { Output: "65W", Ports: "2x USB-C", Voltage: "100-240V" },
    featured: false,
  },
];

// Assign brands deterministically
const productsWithBrands = extendedProducts.map((p, i) => ({
  ...p,
  brand: BRANDS[i % BRANDS.length],
}));

// ─── Types ────────────────────────────────────────────────────────────────────

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest" | "popular";

interface Filters {
  categories: string[];
  brands: string[];
  priceMin: string;
  priceMax: string;
  rating: number;
  inStockOnly: boolean;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= Math.round(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-slate-600"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-400">({count})</span>
    </div>
  );
}

function BadgePill({ badge }: { badge: string }) {
  const colorMap: Record<string, string> = {
    "Best Seller": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Top Rated": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    New: "bg-[#6366F1]/20 text-[#818CF8] border-[#6366F1]/30",
    Sale: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };
  const cls = colorMap[badge] ?? "bg-slate-700 text-slate-300 border-slate-600";
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cls}`}>
      {badge}
    </span>
  );
}

function FilterCheckbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onChange}
      className="flex items-center justify-between w-full group py-1"
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
            checked
              ? "bg-[#6366F1] border-[#6366F1]"
              : "border-slate-600 group-hover:border-slate-400"
          }`}
        >
          {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
        </div>
        <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-200">
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-slate-500">{count}</span>
      )}
    </button>
  );
}

function SidebarSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/8 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors duration-200">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: Product & { brand: string };
  index: number;
}) {
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative bg-[#0F172A] border border-white/8 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:border-[#6366F1]/40 hover:shadow-[0_4px_32px_-8px_rgba(99,102,241,0.25)] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#0A1020] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/images/tech-accessory-placeholder.jpg";
          }}
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#6366F1] transition-colors duration-200"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-rose-500 transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4" />
          </motion.button>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && <BadgePill badge={product.badge} />}
          {discount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
              -{discount}%
            </span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-xs font-semibold text-slate-300 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] font-medium text-[#22D3EE] uppercase tracking-widest mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-white leading-snug mb-2 line-clamp-2 group-hover:text-[#818CF8] transition-colors duration-200">
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!product.inStock}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const t = useTranslations();

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    brands: [],
    priceMin: "",
    priceMax: "",
    rating: 0,
    inStockOnly: false,
  });
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const toggleCategory = useCallback((slug: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((c) => c !== slug)
        : [...prev.categories, slug],
    }));
  }, []);

  const toggleBrand = useCallback((brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      brands: [],
      priceMin: "",
      priceMax: "",
      rating: 0,
      inStockOnly: false,
    });
    setSearchQuery("");
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...productsWithBrands];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Price filter
    const minPrice = parseFloat(filters.priceMin) || 0;
    const maxPrice = parseFloat(filters.priceMax) || Infinity;
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Rating filter
    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    // In stock filter
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [filters, sortBy, searchQuery]);

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    (filters.priceMin ? 1 : 0) +
    (filters.priceMax ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Featured";

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    productsWithBrands.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, []);

  // Brand counts
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    productsWithBrands.forEach((p) => {
      counts[p.brand] = (counts[p.brand] ?? 0) + 1;
    });
    return counts;
  }, []);

  // ─── Sidebar ───────────────────────────────────────────────────────────────

  const SidebarContent = () => (
    <div className="space-y-0">
      {/* Categories */}
      <SidebarSection title="Category">
        <div className="space-y-0.5">
          {categories.map((cat) => (
            <FilterCheckbox
              key={cat.id}
              checked={filters.categories.includes(cat.slug)}
              onChange={() => toggleCategory(cat.slug)}
              label={cat.name}
              count={categoryCounts[cat.slug] ?? 0}
            />
          ))}
        </div>
      </SidebarSection>

      {/* Price Range */}
      <SidebarSection title="Price Range">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="text-[10px] text-slate-500 mb-1 block">Min ($)</label>
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceMin: e.target.value }))
              }
              placeholder="0"
              min="0"
              className="w-full bg-[#0A1020] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#6366F1]/60 transition-colors duration-200"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-slate-500 mb-1 block">Max ($)</label>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceMax: e.target.value }))
              }
              placeholder="500"
              min="0"
              className="w-full bg-[#0A1020] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#6366F1]/60 transition-colors duration-200"
            />
          </div>
        </div>
      </SidebarSection>

      {/* Brand */}
      <SidebarSection title="Brand">
        <div className="space-y-0.5">
          {BRANDS.map((brand) => (
            <FilterCheckbox
              key={brand}
              checked={filters.brands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              label={brand}
              count={brandCounts[brand] ?? 0}
            />
          ))}
        </div>
      </SidebarSection>

      {/* Rating */}
      <SidebarSection title="Minimum Rating">
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  rating: prev.rating === r ? 0 : r,
                }))
              }
              className={`flex items-center gap-2 w-full py-1 group transition-colors duration-200 ${
                filters.rating === r ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= r
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs">& up</span>
              {filters.rating === r && (
                <Check className="w-3 h-3 text-[#6366F1] ml-auto" />
              )}
            </button>
          ))}
        </div>
      </SidebarSection>

      {/* In Stock */}
      <SidebarSection title="Availability" defaultOpen={true}>
        <FilterCheckbox
          checked={filters.inStockOnly}
          onChange={() =>
            setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }))
          }
          label="In Stock Only"
        />
      </SidebarSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080E1A] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#6366F1]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-[#22D3EE]/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Breadcrumb */}
        <motion.nav
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-300">Shop</span>
        </motion.nav>

        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            All Products
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            Premium tech accessories for every setup. Cables, chargers, cases, audio, and more.
          </p>
        </motion.div>

        {/* Search + Controls bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="w-full bg-[#0F172A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6366F1]/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowMobileSidebar(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#6366F1] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </motion.button>

          {/* Sort dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSortDropdown((v) => !v)}
              className="flex items-center gap-2 px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200 whitespace-nowrap"
            >
              <ArrowUpDown className="w-4 h-4" />
              {currentSortLabel}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showSortDropdown ? "rotate-180" : ""
                }`}
              />
            </motion.button>
            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-52 bg-[#0F172A] border border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-30"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setShowSortDropdown(false);
                      }}
                      className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors duration-150 ${
                        sortBy === opt.value
                          ? "text-[#818CF8] bg-[#6366F1]/10"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {opt.label}
                      {sortBy === opt.value && (
                        <Check className="w-3.5 h-3.5 text-[#6366F1]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Active filter chips */}
        <AnimatePresence>
          {(activeFilterCount > 0 || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap items-center gap-2 mb-6 overflow-hidden"
            >
              <span className="text-xs text-slate-500 font-medium">Active filters:</span>
              {filters.categories.map((slug) => {
                const cat = categories.find((c) => c.slug === slug);
                return (
                  <motion.button
                    key={slug}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => toggleCategory(slug)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/30 text-[#818CF8] text-xs font-medium hover:bg-[#6366F1]/25 transition-colors duration-200"
                  >
                    {cat?.name ?? slug}
                    <X className="w-3 h-3" />
                  </motion.button>
                );
              })}
              {filters.brands.map((brand) => (
                <motion.button
                  key={brand}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => toggleBrand(brand)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/25 text-[#22D3EE] text-xs font-medium hover:bg-[#22D3EE]/20 transition-colors duration-200"
                >
                  {brand}
                  <X className="w-3 h-3" />
                </motion.button>
              ))}
              {filters.rating > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setFilters((prev) => ({ ...prev, rating: 0 }))}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors duration-200"
                >
                  {filters.rating}+ Stars
                  <X className="w-3 h-3" />
                </motion.button>
              )}
              {filters.inStockOnly && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setFilters((prev) => ({ ...prev, inStockOnly: false }))}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors duration-200"
                >
                  In Stock
                  <X className="w-3 h-3" />
                </motion.button>
              )}
              {(filters.priceMin || filters.priceMax) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, priceMin: "", priceMax: "" }))
                  }
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors duration-200"
                >
                  ${filters.priceMin || "0"} – ${filters.priceMax || "∞"}
                  <X className="w-3 h-3" />
                </motion.button>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-slate-500 hover:text-rose-400 transition-colors duration-200 underline underline-offset-2 ml-1"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layout: Sidebar + Grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop Sidebar */}
          <motion.aside
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="hidden lg:block w-64 flex-shrink-0 sticky top-24 bg-[#0F172A] border border-white/8 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#6366F1]" />
                <span className="text-sm font-semibold text-white">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#6366F1] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-slate-500 hover:text-rose-400 transition-colors duration-200"
                >
                  Clear
                </button>
              )}
            </div>
            <SidebarContent />
          </motion.aside>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {showMobileSidebar && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowMobileSidebar(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 300 }}
                  className="fixed left-0 top-0 bottom-0 w-80 bg-[#0F172A] border-r border-white/10 z-50 lg:hidden overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-[#6366F1]" />
                        <span className="text-sm font-semibold text-white">Filters</span>
                      </div>
                      <button
                        onClick={() => setShowMobileSidebar(false)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <SidebarContent />
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileSidebar(false)}
                        className="w-full py-3 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold transition-colors duration-200"
                      >
                        Show {filteredAndSorted.length} Results
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between mb-6"
            >
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="text-white font-semibold">{filteredAndSorted.length}</span>{" "}
                {filteredAndSorted.length === 1 ? "product" : "products"}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Package className="w-3.5 h-3.5" />
                Free shipping on orders over $50
              </div>
            </motion.div>

            {filteredAndSorted.length === 0 ? (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No products found</h3>
                <p className="text-slate-400 text-sm max-w-xs mb-6">
                  Try adjusting your filters or search query to find what you are looking for.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={clearFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold transition-colors duration-200"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key={`${sortBy}-${JSON.stringify(filters)}-${searchQuery}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filteredAndSorted.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product as Product & { brand: string }}
                    index={index}
                  />
                ))}
              </motion.div>
            )}

            {/* Trust badges */}
            {filteredAndSorted.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {[
                  {
                    icon: Zap,
                    title: "Fast Shipping",
                    desc: "Orders ship within 24 hours on business days.",
                  },
                  {
                    icon: Shield,
                    title: "2-Year Warranty",
                    desc: "Every product backed by our quality guarantee.",
                  },
                  {
                    icon: Package,
                    title: "Easy Returns",
                    desc: "30-day hassle-free returns, no questions asked.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#0F172A] border border-white/8"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#6366F1]/15 border border-[#6366F1]/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-[#818CF8]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-0.5">{item.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Needed for slideInLeft import
import { slideInLeft } from "@/lib/motion";